# Moon River Podcast - Setup Guide

## Overview
The Moon River Podcast page has been successfully implemented with YouTube as the primary content source, plus optional Spotify and Instagram integrations.

## Features Implemented

### ✅ Core Features
- **YouTube Data API v3 Integration** - Primary content source
- **Embedded Video Player** - Watch episodes directly on the page
- **Search Functionality** - Search by title, guest, or topic
- **Filter Controls** - Filter by guest or topic tags
- **Responsive Design** - Mobile-first, cozy cafe aesthetic
- **Episode Cards** - Grid layout with thumbnails and metadata
- **Loading States** - Skeleton loaders during API fetches
- **Error Handling** - Graceful fallbacks and retry options
- **Caching** - 30-second cache to reduce API rate limits

### 🎨 Design
- Matches existing Moon River cafe aesthetic
- TanNimbus font for headings
- Handwritten fonts (Caveat, Kalam) for accent text
- Warm shadows and vintage paper textures
- Primary color: #926F34 (coffee brown)

## API Setup Instructions

### 1. YouTube Data API v3 (Required)

#### Step 1: Get API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

#### Step 2: Get Channel ID or Playlist ID
**Option A: Channel ID**
1. Go to your YouTube channel
2. Click on your profile icon → "Your channel"
3. Copy the ID from the URL: `youtube.com/channel/YOUR_CHANNEL_ID`

**Option B: Playlist ID (Recommended)**
1. Create a playlist with all podcast episodes
2. Go to the playlist page
3. Copy the ID from the URL: `youtube.com/playlist?list=YOUR_PLAYLIST_ID`

#### Step 3: Add to Environment Variables
Add to `.env.local`:
```env
YOUTUBE_API_KEY=your_api_key_here
# Use ONE of the following:
YOUTUBE_CHANNEL_ID=your_channel_id_here
# OR
YOUTUBE_PLAYLIST_ID=your_playlist_id_here
```

### 2. Spotify Web API (Optional)

#### Step 1: Create Spotify App
1. Go to [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in app name and description
5. Copy your **Client ID** and **Client Secret**

#### Step 2: Get Show ID
1. Go to your podcast on Spotify
2. Click "..." → "Share" → "Copy Show Link"
3. Extract ID from URL: `open.spotify.com/show/YOUR_SHOW_ID`

#### Step 3: Add to Environment Variables
Add to `.env.local`:
```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_SHOW_ID=your_show_id_here
```

### 3. Instagram Graph API (Optional)

#### Step 1: Create Facebook App
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new app (Business type)
3. Add Instagram Graph API product

#### Step 2: Get Access Token
1. Go to Instagram Basic Display
2. Generate a User Access Token
3. Exchange for a Long-Lived Token (60 days)

#### Step 3: Get User ID
1. Use Graph API Explorer
2. Query: `me?fields=id,username`
3. Copy your Instagram User ID

#### Step 4: Add to Environment Variables
Add to `.env.local`:
```env
INSTAGRAM_ACCESS_TOKEN=your_access_token_here
INSTAGRAM_USER_ID=your_user_id_here
```

## File Structure

```
src/
├── app/
│   ├── podcast/
│   │   └── page.tsx                    # Main podcast page
│   └── api/
│       └── podcast/
│           ├── youtube/route.ts        # YouTube API integration
│           ├── spotify/route.ts        # Spotify API integration
│           └── instagram/route.ts      # Instagram API integration
├── components/
│   └── podcast/
│       ├── episode-player.tsx          # YouTube embed component
│       ├── episode-card.tsx            # Episode card for grid
│       ├── search-filter.tsx           # Search and filter controls
│       └── episode-skeleton.tsx        # Loading skeleton
└── lib/
    ├── types/
    │   └── podcast.ts                  # TypeScript type definitions
    └── podcast-utils.ts                # Utility functions
```

## Usage

### Accessing the Page
Navigate to: `http://localhost:3000/podcast`

### Customizing Platform Links
Update the platform links in `/src/app/podcast/page.tsx` (lines 142-182):
```tsx
<Button variant="outline" size="sm" asChild>
  <a href="YOUR_YOUTUBE_CHANNEL_URL" target="_blank" rel="noopener noreferrer">
    <Youtube className="h-4 w-4" />
    <span>YouTube</span>
  </a>
</Button>
```

### Extracting Guest Names & Topics
The system automatically extracts guest names and topics from video titles and descriptions using these patterns:

**Guest Extraction:**
- "with [Guest Name]"
- "ft. [Guest Name]"
- "featuring [Guest Name]"

**Topic Extraction:**
- Hashtags: #art #creativity
- Topic section: "Topics: art, design, coffee"

### Manual Episode Metadata
If auto-extraction doesn't work, you can manually add metadata in your YouTube video descriptions:
```
Title: Creative Process with Sarah Johnson

Description:
Join us for a conversation with Sarah Johnson about her creative journey.

Guest: Sarah Johnson
Topics: art, creativity, local business

#podcast #art #creativity
```

## API Rate Limits

### YouTube Data API v3
- **Quota:** 10,000 units per day (free tier)
- **Search operation:** 100 units
- **Video details:** 1 unit per video
- **Caching:** 30-second cache to reduce requests

### Spotify Web API
- **Rate Limit:** Varies by endpoint
- **Token:** Auto-refreshes before expiry
- **Caching:** 30-second cache

### Instagram Graph API
- **Rate Limit:** 200 calls per hour (per user)
- **Token Expiry:** 60 days (long-lived tokens)
- **Caching:** 30-second cache

## Troubleshooting

### "YouTube API not configured" Error
- Check `.env.local` has `YOUTUBE_API_KEY`
- Restart development server: `npm run dev`

### "Rate limit exceeded" Error
- Wait a few minutes for rate limit to reset
- Cached data will be served automatically
- Consider using playlist instead of channel search (uses fewer quota)

### Videos Not Appearing
- Check channel/playlist ID is correct
- Ensure videos are public (not private/unlisted)
- Check API key has YouTube Data API v3 enabled

### Guest/Topic Not Extracting
- Add structured metadata to video descriptions
- Use patterns: "with [name]", "Topics: topic1, topic2"
- Add hashtags: #topic1 #topic2

## Future Enhancements

### Planned Features
- [ ] Pagination for episodes
- [ ] Episode detail pages
- [ ] Subscribe via RSS
- [ ] Email notifications for new episodes
- [ ] Episode transcripts
- [ ] Featured guests section
- [ ] Episode analytics

### Optional Integrations
- [ ] Apple Podcasts RSS feed
- [ ] SoundCloud integration
- [ ] Twitter/X clips integration
- [ ] TikTok integration

## Support

For issues or questions:
1. Check this setup guide
2. Review API documentation links above
3. Check browser console for errors
4. Verify environment variables are set correctly

## Credits

Built with:
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **YouTube Data API v3** - Video content
- **Spotify Web API** - Podcast episodes
- **Instagram Graph API** - Social media clips
