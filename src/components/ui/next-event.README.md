# NextEvent Component - Multi-Calendar Support

The NextEvent component displays the next upcoming event from a Google Calendar. It now supports multiple calendars, allowing you to display different calendars in different parts of your site.

## Features

- 🗓️ Display events from multiple Google Calendars
- 🔒 Secure server-side calendar ID management
- 📱 Responsive design with loading states
- 🎨 Customizable widget titles
- ⚡ Type-safe with TypeScript
- 🔄 Automatic fallback to primary calendar

## Setup

### 1. Configure Google Calendar API

First, ensure you have a Google Calendar API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable the Google Calendar API
4. Create credentials (API Key)
5. Restrict the API key to the Google Calendar API

### 2. Configure Environment Variables

Add your API key and calendar IDs to `.env.local`:

```env
# Required: Google Calendar API Key
GCAL_API_KEY=your-api-key-here

# Calendar IDs (get these from Google Calendar settings)
# Primary calendar (default, backward compatible)
GCAL_ID=primary@calendar.google.com

# Additional calendars (optional)
GCAL_ID_EVENTS=events@group.calendar.google.com
GCAL_ID_WORKSHOPS=workshops@group.calendar.google.com
GCAL_ID_MEETINGS=meetings@group.calendar.google.com
GCAL_ID_COMMUNITY=community@group.calendar.google.com
GCAL_ID_PRIVATE=staff@group.calendar.google.com
```

### 3. Find Your Calendar IDs

To get a calendar ID:
1. Open Google Calendar
2. Click the settings gear → Settings
3. Select the calendar you want to use
4. Scroll to "Integrate calendar"
5. Copy the Calendar ID

## Usage

### Basic Usage (Default Calendar)

```tsx
import { NextEvent } from "@/components/ui/next-event";

// Uses the primary calendar (GCAL_ID)
<NextEvent />
```

### Specific Calendar

```tsx
// Display events from the workshops calendar
<NextEvent calendarType="workshops" />

// Display events from the events calendar with custom title
<NextEvent calendarType="events" title="Upcoming Performances" />
```

### Multiple Calendars on Same Page

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <NextEvent calendarType="events" title="Special Events" />
  <NextEvent calendarType="workshops" title="Next Workshop" />
</div>
```

## Available Calendar Types

The following calendar types are configured in `/src/lib/calendar-config.ts`:

| Type | Description | Environment Variable |
|------|-------------|---------------------|
| `primary` | Main public calendar (default) | `GCAL_ID` |
| `events` | Special events and performances | `GCAL_ID_EVENTS` |
| `workshops` | Educational workshops | `GCAL_ID_WORKSHOPS` |
| `meetings` | Community meetings | `GCAL_ID_MEETINGS` |
| `community` | Community-submitted events | `GCAL_ID_COMMUNITY` |
| `private` | Staff and internal events | `GCAL_ID_PRIVATE` |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `calendarType` | `CalendarType` | `"primary"` | Which calendar to display events from |
| `title` | `string` | `"Next Event"` | Custom title for the widget |

## API Endpoint

The component fetches data from `/api/next-event`, which accepts:

- `calendarType` (query parameter): Specifies which calendar to query

Example: `/api/next-event?calendarType=workshops`

## Error Handling

The component handles various error states:

- **Missing API Key**: Displays "Google Calendar API key not configured"
- **Missing Calendar ID**: Displays "Calendar '[type]' not configured"
- **Invalid Calendar Type**: Returns 400 error with message
- **Network Errors**: Displays "Failed to connect to calendar"
- **No Events**: Displays "No upcoming events"

## Adding New Calendars

To add a new calendar type:

1. Add the calendar ID to `.env.local`:
   ```env
   GCAL_ID_NEWTYPE=new-calendar@group.calendar.google.com
   ```

2. Update `/src/lib/calendar-config.ts`:
   ```ts
   export type CalendarType = "primary" | "events" | ... | "newtype";

   export const CALENDAR_CONFIGS: Record<CalendarType, CalendarConfig> = {
     // ... existing configs
     newtype: {
       name: "New Calendar",
       description: "Description of new calendar",
       envKey: "GCAL_ID_NEWTYPE",
     },
   };
   ```

3. Use the new calendar:
   ```tsx
   <NextEvent calendarType="newtype" />
   ```

## Troubleshooting

### Events Not Showing
1. Verify the calendar is public or the API key has access
2. Check the calendar ID is correct in `.env.local`
3. Ensure the calendar has upcoming events
4. Check browser console for error messages

### API Key Issues
1. Ensure the API key is enabled for Google Calendar API
2. Check API key restrictions match your domain
3. Verify quota limits haven't been exceeded

### Calendar Not Found
1. Double-check the calendar ID format
2. Ensure the environment variable name matches the config
3. Restart the development server after adding new env variables

## Security Notes

- Calendar IDs are stored server-side and never exposed to the client
- API key should be restricted to your domain and the Calendar API
- Consider rate limiting the API endpoint in production
- Use read-only access for public calendars

## Example Implementation

Here's a complete example of a page using multiple calendars:

```tsx
import { NextEvent } from "@/components/ui/next-event";

export default function EventsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg">
          <NextEvent calendarType="events" title="Featured Event" />
        </div>

        <div className="border rounded-lg">
          <NextEvent calendarType="workshops" title="Next Workshop" />
        </div>

        <div className="border rounded-lg">
          <NextEvent calendarType="community" title="Community Event" />
        </div>
      </div>
    </div>
  );
}
```