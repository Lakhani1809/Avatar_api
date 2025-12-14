import { NextRequest, NextResponse } from "next/server";
import { runAvatarGeneration } from "@/avatar-engine/services/geminiClient";
import {
  uploadAvatarToStorage,
  updateUserProfileAvatar,
  userExists,
} from "@/avatar-engine/services/supabaseStorage";

export const runtime = "nodejs";

// CORS headers for API access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Image validation constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get("user_id") as string | null;
    const file = formData.get("image");

    // Validate user_id
    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { success: false, message: "user_id is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate user_id format (UUID)
    if (!UUID_REGEX.test(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user_id format. Must be a valid UUID." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate image file
    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Image file is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if user exists in database
    const exists = await userExists(userId);
    if (!exists) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Generate avatar using Gemini
    const generatedBuffer = await runAvatarGeneration(inputBuffer);

    // Upload to Supabase Storage
    const avatarUrl = await uploadAvatarToStorage(userId, generatedBuffer);

    // Update user_profiles table
    await updateUserProfileAvatar(userId, avatarUrl);

    return NextResponse.json(
      {
        success: true,
        avatar_image_url: avatarUrl,
        user_id: userId,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Avatar generation failed", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message: process.env.NODE_ENV === "production"
          ? "Internal server error"
          : errorMessage,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

