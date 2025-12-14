export function buildAvatarPrompt(): string {
  return `Generate a full-body human avatar based on THIS user's photo.

CRITICAL - PHOTOREALISM REQUIREMENT:
- This MUST be a REAL PHOTOGRAPH of a REAL HUMAN BEING
- ABSOLUTELY NO animation, cartoon, illustration, 3D render, digital art, painting, anime, CGI, or any artistic stylization
- The output must look like an actual photograph taken with a professional camera
- Real human skin texture, pores, natural imperfections
- Real photographic lighting and shadows
- If the result looks even slightly animated, cartoonish, or illustrated, it is WRONG

PRESERVE FROM ORIGINAL PHOTO:
- Exact face and facial structure (extremely important - face must be identical)
- Exact skin tone and texture
- Exact body proportions and shape
- Gender expression
- Age appearance
- Complete identity of the person

POSE AND COMPOSITION:
- Standing straight, front-facing, relaxed A-pose with slight arm gap
- Facing camera directly
- Full body visible from head to feet
- Arms relaxed at sides
- Professional studio lighting
- Plain WHITE background only
- Centered composition

BEIGE BODYSUIT REQUIREMENTS (SAME FOR ALL GENDERS - MALE AND FEMALE):
The avatar must wear a MODEST, CONSERVATIVE beige/off-white bodysuit.

MANDATORY COVERAGE (must be covered by the bodysuit for BOTH male and female):
- Entire torso (chest, stomach, back) - FULLY COVERED
- Full shoulders - FULLY COVERED
- Upper arms from shoulder to elbow - FULLY COVERED
- ENTIRE THIGHS from waist/hips down to the knees - FULLY COVERED
- The bodysuit MUST extend down to the knees like shorts or capri pants
- NO part of the thighs should be visible
- This is NOT a swimsuit - thighs must be completely covered

EXPOSED SKIN (these areas show natural skin):
- Face (completely visible)
- Neck (completely visible)
- Forearms and hands (elbow to fingertips - visible skin)
- Lower legs from knees to feet (calves, ankles, feet - visible skin)

IMPORTANT FOR FEMALE AVATARS:
- The bodysuit must cover the full thighs down to the knees
- It must NOT look like a swimsuit, leotard, or one-piece bathing suit
- Think of it as a modest short-sleeve top + knee-length shorts combined into one piece
- The leg coverage must be the same as for male avatars

BODYSUIT STYLE:
- Solid neutral beige/off-white color
- Single uniform color, no patterns, no variations
- Smooth, clean fabric appearance
- Form-fitting but not skin-tight
- Modest and conservative coverage
- Like cycling shorts + t-shirt combined into a single beige garment
- Clean contours, no wrinkles or bunching

STRICT RULES:
- Do NOT idealize, slim, stretch, or alter body shape
- Do NOT modify facial features
- Do NOT add accessories, jewelry, or additional clothing
- Do NOT add text or watermarks
- Do NOT add artistic effects or filters
- Do NOT crop any part of the body
- Maintain anatomical accuracy
- Maintain original skin tone faithfully on all visible skin areas

OUTPUT:
- Full-body PNG image
- Professional fashion catalog quality
- Photorealistic human being, NOT a digital creation
- The person in the output must be recognizable as the same person from the input photo`;
}

export function buildVtoPrompt(): string {
  return `
You are performing a virtual try-on task. You will receive:

1. A full-body avatar image (this MUST remain unchanged).
2. One or more clothing or accessory images.

YOUR PRIMARY RULE:
The avatar’s identity, face, skin tone, body proportions, silhouette, and posture are NON-NEGOTIABLE and must stay EXACTLY as they appear in the avatar image. 
You are ONLY allowed to overlay, drape, and fit the provided clothing items onto the avatar.

DO NOT:
- modify body shape
- slim or idealize the avatar
- change skin tone
- adjust posture
- alter arm or leg position
- modify facial features
- beautify or retouch the avatar
- crop or change background
- hallucinate additional clothing
- generate new body parts

VIRTUAL TRY-ON REQUIREMENTS:
- Fit the clothing naturally to the avatar’s real proportions.
- Respect the existing silhouette and shape exactly.
- Maintain correct garment geometry (wrinkles, seams, hems).
- Follow realistic layering (top over body, jacket over top, accessories above all).
- Adjust garment size proportionally to match the avatar’s true measurements.
- Preserve true fabric texture and color from the clothing images.
- Add natural soft shadows where the garment touches the body.
- No distortions or unrealistic stretching.

STYLING + VISUAL RULES:
- Keep lighting consistent with the avatar image.
- Maintain the same studio background as the avatar (do NOT replace it).
- Output must look like a clean, premium fashion catalog try-on.
- No text, logos, watermarks, or borders.

OUTPUT:
A single image of the avatar wearing ONLY the input clothing items, 
preserving 100% of the original avatar’s identity, proportions, and appearance.

Your role is to perform pixel-aware garment fitting without altering the person.
`;
}

