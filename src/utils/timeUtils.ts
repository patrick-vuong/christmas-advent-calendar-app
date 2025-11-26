import { format } from 'date-fns';
import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export const PST_TIMEZONE = 'America/Los_Angeles';
const ADVENT_YEAR = 2025;
const ADVENT_MONTH_INDEX = 11; // December is month index 11
const TOTAL_DAYS = 24;

const padDay = (day: number) => day.toString().padStart(2, '0');

export const getUnlockDateUtc = (day: number) => {
  if (day < 1 || day > TOTAL_DAYS) {
    throw new Error(`Day must be between 1 and ${TOTAL_DAYS}`);
  }

  const isoDate = `${ADVENT_YEAR}-12-${padDay(day)}T12:00:00`;
  return zonedTimeToUtc(isoDate, PST_TIMEZONE);
};

export const getNowInPst = (now: Date = new Date()) => utcToZonedTime(now, PST_TIMEZONE);

export interface CalendarStatus {
  unlockedDay: number;
  nextUnlockDay: number | null;
  nextUnlockDate: Date | null;
  nowInPst: Date;
  nowUtc: Date;
}

export const getCalendarStatus = (now: Date = new Date()): CalendarStatus => {
  const nowUtc = now;
  const nowPst = getNowInPst(nowUtc);

  let unlockedDay = 0;
  for (let day = TOTAL_DAYS; day >= 1; day -= 1) {
    const unlockDateUtc = getUnlockDateUtc(day);
    if (nowUtc >= unlockDateUtc) {
      unlockedDay = day;
      break;
    }
  }

  const nextUnlockDay = unlockedDay < TOTAL_DAYS ? unlockedDay + 1 : null;
  const nextUnlockDate = nextUnlockDay ? getUnlockDateUtc(nextUnlockDay) : null;

  return {
    unlockedDay,
    nextUnlockDay,
    nextUnlockDate,
    nowInPst: nowPst,
    nowUtc,
  };
};

export const getMillisecondsUntil = (date: Date | null, now: Date = new Date()) => {
  if (!date) return null;
  const diff = date.getTime() - now.getTime();
  return diff > 0 ? diff : 0;
};

export const formatUnlockTimestamp = (date: Date | null, pattern = "MMM d, yyyy 'at' h:mm a zzz") => {
  if (!date) return null;
  return formatInTimeZone(date, PST_TIMEZONE, pattern);
};

export const formatPstDate = (date: Date, pattern = 'MMM d, yyyy h:mm a xxx') =>
  format(getNowInPst(date), pattern);

export const isAdventDay = (day: number) => day >= 1 && day <= TOTAL_DAYS;

export const TOTAL_ADVENT_DAYS = TOTAL_DAYS;
export const ADVENT_END_DATE_UTC = getUnlockDateUtc(TOTAL_DAYS);

export const minutesToUnlock = (date: Date | null, now: Date = new Date()) => {
  const milliseconds = getMillisecondsUntil(date, now);
  if (milliseconds == null) return null;
  return Math.ceil(milliseconds / (1000 * 60));
};
