# Avatar Generation API

Generate a clean fashion mannequin-style avatar from a full-body photo using Gemini Flash.

## API Endpoint

### POST `/api/avatar`

Generate an avatar from a full-body photo.

**Request:**
- Content-Type: `multipart/form-data`
- Field: `image` (image file)

**Response:**
```json
{
  "success": true,
  "image": "base64_encoded_image",
  "dataUrl": "data:image/png;base64,..."
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   # Set GEMINI_API_KEY in .env.local
   ```

3. **Run locally**
   ```bash
   npm run dev
   ```
   Then open http://localhost:3000

## Test UI

- Visit http://localhost:3000/avatar-test
- Upload a full-body photo
- Click "Generate Avatar" to trigger the `/api/avatar` endpoint
- The generated avatar is returned as base64 and displayed in the UI

## Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Set environment variable: `GEMINI_API_KEY`
3. Railway will auto-detect Next.js and deploy
4. Your API will be available at: `https://your-app.up.railway.app/api/avatar`

## Notes

- Uses Gemini Flash (`gemini-2.5-flash-image`) via `@google/generative-ai`
- Images are returned as base64 (no file storage required)
- CORS enabled for API access
