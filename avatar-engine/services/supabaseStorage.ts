import { supabase } from "@/lib/supabase";

const AVATAR_BUCKET = "avatars";

/**
 * Upload avatar image to Supabase Storage
 * @param userId - User ID to use as filename
 * @param imageBuffer - Buffer containing the image data
 * @returns Public URL of the uploaded image
 */
export async function uploadAvatarToStorage(
  userId: string,
  imageBuffer: Buffer
): Promise<string> {
  const fileName = `${userId}.png`;
  const filePath = fileName;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(filePath, imageBuffer, {
      contentType: "image/png",
      upsert: true, // Replace if exists
    });

  if (error) {
    throw new Error(`Failed to upload avatar to storage: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);

  if (!publicUrl) {
    throw new Error("Failed to get public URL for uploaded avatar");
  }

  return publicUrl;
}

/**
 * Update user_profiles table with avatar_image_url
 * @param userId - User ID
 * @param avatarUrl - Public URL of the avatar image
 */
export async function updateUserProfileAvatar(
  userId: string,
  avatarUrl: string
): Promise<void> {
  const { error } = await supabase
    .from("user_profiles")
    .update({ avatar_image_url: avatarUrl })
    .eq("id", userId);

  if (error) {
    throw new Error(
      `Failed to update user profile: ${error.message}`
    );
  }
}

/**
 * Check if user exists in user_profiles table
 * @param userId - User ID to check
 * @returns true if user exists, false otherwise
 */
export async function userExists(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return false;
  }

  return true;
}

