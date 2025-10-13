/**
 * Calendar configuration for multi-calendar support
 * Maps calendar types to their environment variable keys
 */

export type CalendarType = "primary" | "events" | "workshops" | "meetings" | "community" | "private";

export interface CalendarConfig {
  name: string;
  description: string;
  envKey: string;
  isDefault?: boolean;
}

/**
 * Calendar configurations mapping
 * Each calendar type maps to an environment variable containing the Google Calendar ID
 */
export const CALENDAR_CONFIGS: Record<CalendarType, CalendarConfig> = {
  primary: {
    name: "Primary Calendar",
    description: "Main public calendar for the coffee shop",
    envKey: "GCAL_ID", // Backward compatible with existing env var
    isDefault: true,
  },
  events: {
    name: "Events Calendar",
    description: "Special events, performances, and gatherings",
    envKey: "GCAL_ID_EVENTS",
  },
  workshops: {
    name: "Workshops Calendar",
    description: "Educational workshops and classes",
    envKey: "GCAL_ID_WORKSHOPS",
  },
  meetings: {
    name: "Meetings Calendar",
    description: "Community meetings and group sessions",
    envKey: "GCAL_ID_MEETINGS",
  },
  community: {
    name: "Community Calendar",
    description: "Community-submitted events and activities",
    envKey: "GCAL_ID_COMMUNITY",
  },
  private: {
    name: "Private Calendar",
    description: "Staff and internal events",
    envKey: "GCAL_ID_PRIVATE",
  },
};

/**
 * Get calendar ID from environment variables
 * @param calendarType - The type of calendar to retrieve
 * @returns The calendar ID or undefined if not configured
 */
export function getCalendarId(calendarType: CalendarType = "primary"): string | undefined {
  const config = CALENDAR_CONFIGS[calendarType];
  if (!config) {
    console.error(`Invalid calendar type: ${calendarType}`);
    return undefined;
  }

  const calendarId = process.env[config.envKey];

  // Fallback to default calendar if specific calendar not configured
  if (!calendarId && !config.isDefault) {
    console.warn(`Calendar ${calendarType} not configured, falling back to primary`);
    return process.env[CALENDAR_CONFIGS.primary.envKey];
  }

  return calendarId;
}

/**
 * Get all configured calendars
 * @returns Array of configured calendar types
 */
export function getConfiguredCalendars(): CalendarType[] {
  return Object.entries(CALENDAR_CONFIGS)
    .filter(([_, config]) => process.env[config.envKey])
    .map(([type]) => type as CalendarType);
}

/**
 * Validate if a calendar type is configured
 * @param calendarType - The calendar type to check
 * @returns True if the calendar is configured
 */
export function isCalendarConfigured(calendarType: CalendarType): boolean {
  const config = CALENDAR_CONFIGS[calendarType];
  return config ? !!process.env[config.envKey] : false;
}