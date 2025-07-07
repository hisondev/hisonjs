/**
 * Enum representing the full names of the months (`January` to `December`).
 *
 * - Values range from `1` to `12`, corresponding to the month number.
 */
export enum MonthFullName {
    January = 1, February, March, April, May, June, July, August, September, October, November, December
}
/**
 * Enum representing the abbreviated names of the months (`Jan` to `Dec`).
 *
 * - Values range from `1` to `12`, corresponding to the month number.
 */
export enum MonthShortName {
    Jan = 1, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
}
/**
 * Enum representing the full English names of the days of the week (`Sunday` to `Saturday`).
 *
 * - Values range from `0` to `6`, where `0 = Sunday`, `1 = Monday`, ..., `6 = Saturday`.
 */
export enum DayOfWeekFullName {
    Sun = 0, Mon, Tue, Wed, Thu, Fri, Sat
}
/**
 * Enum representing the abbreviated English names of the days of the week (`Sun` to `Sat`).
 *
 * - Values range from `0` to `6`, where `0 = Sun`, `1 = Mon`, ..., `6 = Sat`.
 */
export enum DayOfWeekShortName {
    Sunday = 0, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
}
/**
 * Enum representing the full Korean names of the days of the week (`일요일` to `토요일`).
 *
 * - Values range from `0` to `6`, where `0 = 일요일`, `1 = 월요일`, ..., `6 = 토요일`.
 */
export enum DayOfWeekFullNameKR {
    일 = 0, 월, 화, 수, 목, 금, 토
}
/**
 * Enum representing the abbreviated Korean names of the days of the week (`일` to `토`).
 *
 * - Values range from `0` to `6`, where `0 = 일`, `1 = 월`, ..., `6 = 토`.
 */
export enum DayOfWeekShortNameKR {
    일요일 = 0, 월요일, 화요일, 수요일, 목요일, 금요일, 토요일
}
/**
 * Date format including year, month, and day
 */
export enum DateFormat {
    'yyyyMMdd' = 'yyyyMMdd',
    'yyyy-MM-dd' = 'yyyy-MM-dd',
    'yyyy/MM/dd' = 'yyyy/MM/dd',
    'yyyy. MM. dd' = 'yyyy. MM. dd',
    'yyyy MM dd' = 'yyyy MM dd',
    'MMddyyyy' = 'MMddyyyy',
    'MM-dd-yyyy' = 'MM-dd-yyyy',
    'MM/dd/yyyy' = 'MM/dd/yyyy',
    'MM. dd. yyyy' = 'MM. dd. yyyy',
    'MMMM dd yyyy' = 'MMMM dd yyyy',
    'MMMM dd, yyyy' = 'MMMM dd, yyyy',
    'MMM dd yyyy' = 'MMM dd yyyy',
    'MMM dd, yyyy' = 'MMM dd, yyyy',
    'ddMMyyyy' = 'ddMMyyyy',
    'dd-MM-yyyy' = 'dd-MM-yyyy',
    'dd/MM/yyyy' = 'dd/MM/yyyy',
    'dd. MM. yyyy' = 'dd. MM. yyyy',
    'dd MMMM yyyy' = 'dd MMMM yyyy',
    'dd MMM yyyy' = 'dd MMM yyyy',
}
/**
 * Time format including hours, minutes, and seconds
 */
export enum TimeFormat {
    'hh:mm:ss' = 'hh:mm:ss',
    'hhmmss' = 'hhmmss',
}
/**
 * Date and time format including year, month, day, hour, minute, and second
 */
export enum DateTimeFormat {
    'yyyyMMdd hhmmss' = 'yyyyMMdd hhmmss',
    'yyyyMMdd hh:mm:ss' = 'yyyyMMdd hh:mm:ss',
    'yyyy-MM-dd hhmmss' = 'yyyy-MM-dd hhmmss',
    'yyyy-MM-dd hh:mm:ss' = 'yyyy-MM-dd hh:mm:ss',
    'yyyy/MM/dd hhmmss' = 'yyyy/MM/dd hhmmss',
    'yyyy/MM/dd hh:mm:ss' = 'yyyy/MM/dd hh:mm:ss',
    'yyyy. MM. dd hhmmss' = 'yyyy. MM. dd hhmmss',
    'yyyy. MM. dd hh:mm:ss' = 'yyyy. MM. dd hh:mm:ss',
    'yyyy MM dd hhmmss' = 'yyyy MM dd hhmmss',
    'yyyy MM dd hh:mm:ss' = 'yyyy MM dd hh:mm:ss',
    'MMddyyyy hhmmss' = 'MMddyyyy hhmmss',
    'MMddyyyy hh:mm:ss' = 'MMddyyyy hh:mm:ss',
    'MM-dd-yyyy hhmmss' = 'MM-dd-yyyy hhmmss',
    'MM-dd-yyyy hh:mm:ss' = 'MM-dd-yyyy hh:mm:ss',
    'MM/dd/yyyy hhmmss' = 'MM/dd/yyyy hhmmss',
    'MM/dd/yyyy hh:mm:ss' = 'MM/dd/yyyy hh:mm:ss',
    'MM. dd. yyyy hhmmss' = 'MM. dd. yyyy hhmmss',
    'MM. dd. yyyy hh:mm:ss' = 'MM. dd. yyyy hh:mm:ss',
    'MMMM dd yyyy hhmmss' = 'MMMM dd yyyy hhmmss',
    'MMMM dd yyyy hh:mm:ss' = 'MMMM dd yyyy hh:mm:ss',
    'MMMM dd, yyyy hhmmss' = 'MMMM dd, yyyy hhmmss',
    'MMMM dd, yyyy hh:mm:ss' = 'MMMM dd, yyyy hh:mm:ss',
    'MMM dd yyyy hhmmss' = 'MMM dd yyyy hhmmss',
    'MMM dd yyyy hh:mm:ss' = 'MMM dd yyyy hh:mm:ss',
    'MMM dd, yyyy hhmmss' = 'MMM dd, yyyy hhmmss',
    'MMM dd, yyyy hh:mm:ss' = 'MMM dd, yyyy hh:mm:ss',
    'ddMMyyyy hhmmss' = 'ddMMyyyy hhmmss',
    'ddMMyyyy hh:mm:ss' = 'ddMMyyyy hh:mm:ss',
    'dd-MM-yyyy hhmmss' = 'dd-MM-yyyy hhmmss',
    'dd-MM-yyyy hh:mm:ss' = 'dd-MM-yyyy hh:mm:ss',
    'dd/MM/yyyy hhmmss' = 'dd/MM/yyyy hhmmss',
    'dd/MM/yyyy hh:mm:ss' = 'dd/MM/yyyy hh:mm:ss',
    'dd. MM. yyyy hhmmss' = 'dd. MM. yyyy hhmmss',
    'dd. MM. yyyy hh:mm:ss' = 'dd. MM. yyyy hh:mm:ss',
    'dd MMMM yyyy hhmmss' = 'dd MMMM yyyy hhmmss',
    'dd MMMM yyyy hh:mm:ss' = 'dd MMMM yyyy hh:mm:ss',
    'dd MMM yyyy hhmmss' = 'dd MMM yyyy hhmmss',
    'dd MMM yyyy hh:mm:ss' = 'dd MMM yyyy hh:mm:ss',
}
/**
 * Year format
 * If it's 2025
 * yyyy = '2025'
 * yy = '25'
 */
export enum YearFormat {
    yyyy = 'yyyy',
    yy = 'yy',
}
/**
 * Month format
 * If it's February
 * M = '2'
 * MM = '02'
 * MMM = 'Feb'
 * MMMM = 'February'
 */
export enum MonthFormat {
    M = 'M',
    MM = 'MM',
    MMM = 'MMM',
    MMMM = 'MMMM',
}
/**
 * Year and Month format
 */
export enum YearMonthFormat {
    'yyyyMM' = 'yyyyMM',
    'yyyy-MM' = 'yyyy-MM',
    'yyyy/MM' = 'yyyy/MM',
    'yyyy. MM' = 'yyyy. MM',
    'yyyy MM' = 'yyyy MM',
    'MMyyyy' = 'MMyyyy',
    'MM-yyyy' = 'MM-yyyy',
    'MM/yyyy' = 'MM/yyyy',
    'MM. yyyy' = 'MM. yyyy',
    'MM yyyy' = 'MM yyyy',
    'MMMM yyyy' = 'MMMM yyyy',
    'MMMM, yyyy' = 'MMMM, yyyy',
    'MMM yyyy' = 'MMM yyyy',
    'MMM, yyyy' = 'MMM, yyyy',
}
/**
 * Day Format
 * If it's 2th
 * dd = '02'
 * d = '2'
 */
export enum DayFormat {
    dd = 'dd',
    d = 'd',
}
/**
 * DayOfWeek Format
 * If it's Sunday
 * d = '0'
 * dy = 'Sun'
 * day = 'Sunday'
 * kdy = '일'
 * kday = '일요일'
 */
export enum DayOfWeekFormat {
    d = 'd',
    dy = 'dy',
    day = 'day',
    kdy = 'kdy',
    kday = 'kday',
}
/**
 * Hour Format
 * If it's 5am
 * h = '5'
 * hh = '05'
 * If it's 1pm
 * h = '13'
 * hh = '13'
 */
export enum HourFormat {
    hh = 'hh',
    h = 'h',
}
/**
 * Hour-Minute Format
 * Combines hour and minute components into a single formatted string.
 *
 * - `'hh:mm'` → Hour and minute separated by a colon (e.g., `"05:06"`, `"13:06"`)
 * - `'hhmm'`  → Hour and minute combined without separator (e.g., `"0506"`, `"1306"`)
 */
export enum HourMinuteFormat {
    'hh:mm' = 'hh:mm',
    'hhmm' = 'hhmm',
}
/**
 * Minute Format
 * If it's 6 minute
 * mm = '06'
 * m = '6'
 */
export enum MinuteFormat {
    mm = 'mm',
    m = 'm',
}
/**
 * Second Format
 * If it's 6 second
 * ss = '06'
 * s = '6'
 */
export enum SecondFormat {
    ss = 'ss',
    s = 's',
}
/**
 * Format all dates and times
 */
export enum AllDateTimeFormat {
    'hhmm' = 'hhmm',
    'hh:mm' = 'hh:mm',
    'HHmm' = 'HHmm',
    'HH:mm' = 'HH:mm',
    'hhmmss' = 'hhmmss',
    'hh:mm:ss' = 'hh:mm:ss',
    'HHmmss' = 'HHmmss',
    'HH:mm:ss' = 'HH:mm:ss',
    'yyyy' = 'yyyy',
    'yyyyMM' = 'yyyyMM',
    'yyyy-MM' = 'yyyy-MM',
    'yyyy/MM' = 'yyyy/MM',
    'yyyy. MM' = 'yyyy. MM',
    'yyyy MM' = 'yyyy MM',
    'yyyyMMdd' = 'yyyyMMdd',
    'yyyy-MM-dd' = 'yyyy-MM-dd',
    'yyyy/MM/dd' = 'yyyy/MM/dd',
    'yyyy. MM. dd' = 'yyyy. MM. dd',
    'yyyy MM dd' = 'yyyy MM dd',
    'yyyyMMdd hh' = 'yyyyMMdd hh',
    'yyyyMMdd hhmm' = 'yyyyMMdd hhmm',
    'yyyyMMdd hhmmss' = 'yyyyMMdd hhmmss',
    'yyyyMMdd hh:mm' = 'yyyyMMdd hh:mm',
    'yyyyMMdd hh:mm:ss' = 'yyyyMMdd hh:mm:ss',
    'yyyy-MM-dd hh' = 'yyyy-MM-dd hh',
    'yyyy-MM-dd hhmm' = 'yyyy-MM-dd hhmm',
    'yyyy-MM-dd hhmmss' = 'yyyy-MM-dd hhmmss',
    'yyyy-MM-dd hh:mm' = 'yyyy-MM-dd hh:mm',
    'yyyy-MM-dd hh:mm:ss' = 'yyyy-MM-dd hh:mm:ss',
    'yyyy/MM/dd hh' = 'yyyy/MM/dd hh',
    'yyyy/MM/dd hhmm' = 'yyyy/MM/dd hhmm',
    'yyyy/MM/dd hhmmss' = 'yyyy/MM/dd hhmmss',
    'yyyy/MM/dd hh:mm' = 'yyyy/MM/dd hh:mm',
    'yyyy/MM/dd hh:mm:ss' = 'yyyy/MM/dd hh:mm:ss',
    'yyyy. MM. dd hh' = 'yyyy. MM. dd hh',
    'yyyy. MM. dd hhmm' = 'yyyy. MM. dd hhmm',
    'yyyy. MM. dd hhmmss' = 'yyyy. MM. dd hhmmss',
    'yyyy. MM. dd hh:mm' = 'yyyy. MM. dd hh:mm',
    'yyyy. MM. dd hh:mm:ss' = 'yyyy. MM. dd hh:mm:ss',
    'yyyy MM dd hh' = 'yyyy MM dd hh',
    'yyyy MM dd hhmm' = 'yyyy MM dd hhmm',
    'yyyy MM dd hhmmss' = 'yyyy MM dd hhmmss',
    'yyyy MM dd hh:mm' = 'yyyy MM dd hh:mm',
    'yyyy MM dd hh:mm:ss' = 'yyyy MM dd hh:mm:ss',
    'yyyyMMdd HH' = 'yyyyMMdd HH',
    'yyyyMMdd HHmm' = 'yyyyMMdd HHmm',
    'yyyyMMdd HHmmss' = 'yyyyMMdd HHmmss',
    'yyyyMMdd HH:mm' = 'yyyyMMdd HH:mm',
    'yyyyMMdd HH:mm:ss' = 'yyyyMMdd HH:mm:ss',
    'yyyy-MM-dd HH' = 'yyyy-MM-dd HH',
    'yyyy-MM-dd HHmm' = 'yyyy-MM-dd HHmm',
    'yyyy-MM-dd HHmmss' = 'yyyy-MM-dd HHmmss',
    'yyyy-MM-dd HH:mm' = 'yyyy-MM-dd HH:mm',
    'yyyy-MM-dd HH:mm:ss' = 'yyyy-MM-dd HH:mm:ss',
    'yyyy/MM/dd HH' = 'yyyy/MM/dd HH',
    'yyyy/MM/dd HHmm' = 'yyyy/MM/dd HHmm',
    'yyyy/MM/dd HHmmss' = 'yyyy/MM/dd HHmmss',
    'yyyy/MM/dd HH:mm' = 'yyyy/MM/dd HH:mm',
    'yyyy/MM/dd HH:mm:ss' = 'yyyy/MM/dd HH:mm:ss',
    'yyyy. MM. dd HH' = 'yyyy. MM. dd HH',
    'yyyy. MM. dd HHmm' = 'yyyy. MM. dd HHmm',
    'yyyy. MM. dd HHmmss' = 'yyyy. MM. dd HHmmss',
    'yyyy. MM. dd HH:mm' = 'yyyy. MM. dd HH:mm',
    'yyyy. MM. dd HH:mm:ss' = 'yyyy. MM. dd HH:mm:ss',
    'yyyy MM dd HH' = 'yyyy MM dd HH',
    'yyyy MM dd HHmm' = 'yyyy MM dd HHmm',
    'yyyy MM dd HHmmss' = 'yyyy MM dd HHmmss',
    'yyyy MM dd HH:mm' = 'yyyy MM dd HH:mm',
    'yyyy MM dd HH:mm:ss' = 'yyyy MM dd HH:mm:ss',
    'MMyyyy' = 'MMyyyy',
    'MM-yyyy' = 'MM-yyyy',
    'MM/yyyy' = 'MM/yyyy',
    'MM. yyyy' = 'MM. yyyy',
    'MM yyyy' = 'MM yyyy',
    'MMMM yyyy' = 'MMMM yyyy',
    'MMMM, yyyy' = 'MMMM, yyyy',
    'MMM yyyy' = 'MMM yyyy',
    'MMM, yyyy' = 'MMM, yyyy',
    'MMddyyyy' = 'MMddyyyy',
    'MM-dd-yyyy' = 'MM-dd-yyyy',
    'MM/dd/yyyy' = 'MM/dd/yyyy',
    'MM. dd. yyyy' = 'MM. dd. yyyy',
    'MMMM dd yyyy' = 'MMMM dd yyyy',
    'MMMM dd, yyyy' = 'MMMM dd, yyyy',
    'MMM dd yyyy' = 'MMM dd yyyy',
    'MMM dd, yyyy' = 'MMM dd, yyyy',
    'MMddyyyy hh' = 'MMddyyyy hh',
    'MMddyyyy hhmm' = 'MMddyyyy hhmm',
    'MMddyyyy hhmmss' = 'MMddyyyy hhmmss',
    'MMddyyyy hh:mm' = 'MMddyyyy hh:mm',
    'MMddyyyy hh:mm:ss' = 'MMddyyyy hh:mm:ss',
    'MM-dd-yyyy hh' = 'MM-dd-yyyy hh',
    'MM-dd-yyyy hhmm' = 'MM-dd-yyyy hhmm',
    'MM-dd-yyyy hhmmss' = 'MM-dd-yyyy hhmmss',
    'MM-dd-yyyy hh:mm' = 'MM-dd-yyyy hh:mm',
    'MM-dd-yyyy hh:mm:ss' = 'MM-dd-yyyy hh:mm:ss',
    'MM/dd/yyyy hh' = 'MM/dd/yyyy hh',
    'MM/dd/yyyy hhmm' = 'MM/dd/yyyy hhmm',
    'MM/dd/yyyy hhmmss' = 'MM/dd/yyyy hhmmss',
    'MM/dd/yyyy hh:mm' = 'MM/dd/yyyy hh:mm',
    'MM/dd/yyyy hh:mm:ss' = 'MM/dd/yyyy hh:mm:ss',
    'MM. dd. yyyy hh' = 'MM. dd. yyyy hh',
    'MM. dd. yyyy hhmm' = 'MM. dd. yyyy hhmm',
    'MM. dd. yyyy hhmmss' = 'MM. dd. yyyy hhmmss',
    'MM. dd. yyyy hh:mm' = 'MM. dd. yyyy hh:mm',
    'MM. dd. yyyy hh:mm:ss' = 'MM. dd. yyyy hh:mm:ss',
    'MMMM dd yyyy hh' = 'MMMM dd yyyy hh',
    'MMMM dd yyyy hhmm' = 'MMMM dd yyyy hhmm',
    'MMMM dd yyyy hhmmss' = 'MMMM dd yyyy hhmmss',
    'MMMM dd yyyy hh:mm' = 'MMMM dd yyyy hh:mm',
    'MMMM dd yyyy hh:mm:ss' = 'MMMM dd yyyy hh:mm:ss',
    'MMMM dd, yyyy hh' = 'MMMM dd, yyyy hh',
    'MMMM dd, yyyy hhmm' = 'MMMM dd, yyyy hhmm',
    'MMMM dd, yyyy hhmmss' = 'MMMM dd, yyyy hhmmss',
    'MMMM dd, yyyy hh:mm' = 'MMMM dd, yyyy hh:mm',
    'MMMM dd, yyyy hh:mm:ss' = 'MMMM dd, yyyy hh:mm:ss',
    'MMM dd yyyy hh' = 'MMM dd yyyy hh',
    'MMM dd yyyy hhmm' = 'MMM dd yyyy hhmm',
    'MMM dd yyyy hhmmss' = 'MMM dd yyyy hhmmss',
    'MMM dd yyyy hh:mm' = 'MMM dd yyyy hh:mm',
    'MMM dd yyyy hh:mm:ss' = 'MMM dd yyyy hh:mm:ss',
    'MMM dd, yyyy hh' = 'MMM dd, yyyy hh',
    'MMM dd, yyyy hhmm' = 'MMM dd, yyyy hhmm',
    'MMM dd, yyyy hhmmss' = 'MMM dd, yyyy hhmmss',
    'MMM dd, yyyy hh:mm' = 'MMM dd, yyyy hh:mm',
    'MMM dd, yyyy hh:mm:ss' = 'MMM dd, yyyy hh:mm:ss',
    'MMddyyyy HH' = 'MMddyyyy HH',
    'MMddyyyy HHmm' = 'MMddyyyy HHmm',
    'MMddyyyy HHmmss' = 'MMddyyyy HHmmss',
    'MMddyyyy HH:mm' = 'MMddyyyy HH:mm',
    'MMddyyyy HH:mm:ss' = 'MMddyyyy HH:mm:ss',
    'MM-dd-yyyy HH' = 'MM-dd-yyyy HH',
    'MM-dd-yyyy HHmm' = 'MM-dd-yyyy HHmm',
    'MM-dd-yyyy HHmmss' = 'MM-dd-yyyy HHmmss',
    'MM-dd-yyyy HH:mm' = 'MM-dd-yyyy HH:mm',
    'MM-dd-yyyy HH:mm:ss' = 'MM-dd-yyyy HH:mm:ss',
    'MM/dd/yyyy HH' = 'MM/dd/yyyy HH',
    'MM/dd/yyyy HHmm' = 'MM/dd/yyyy HHmm',
    'MM/dd/yyyy HHmmss' = 'MM/dd/yyyy HHmmss',
    'MM/dd/yyyy HH:mm' = 'MM/dd/yyyy HH:mm',
    'MM/dd/yyyy HH:mm:ss' = 'MM/dd/yyyy HH:mm:ss',
    'MM. dd. yyyy HH' = 'MM. dd. yyyy HH',
    'MM. dd. yyyy HHmm' = 'MM. dd. yyyy HHmm',
    'MM. dd. yyyy HHmmss' = 'MM. dd. yyyy HHmmss',
    'MM. dd. yyyy HH:mm' = 'MM. dd. yyyy HH:mm',
    'MM. dd. yyyy HH:mm:ss' = 'MM. dd. yyyy HH:mm:ss',
    'MMMM dd yyyy HH' = 'MMMM dd yyyy HH',
    'MMMM dd yyyy HHmm' = 'MMMM dd yyyy HHmm',
    'MMMM dd yyyy HHmmss' = 'MMMM dd yyyy HHmmss',
    'MMMM dd yyyy HH:mm' = 'MMMM dd yyyy HH:mm',
    'MMMM dd yyyy HH:mm:ss' = 'MMMM dd yyyy HH:mm:ss',
    'MMMM dd, yyyy HH' = 'MMMM dd, yyyy HH',
    'MMMM dd, yyyy HHmm' = 'MMMM dd, yyyy HHmm',
    'MMMM dd, yyyy HHmmss' = 'MMMM dd, yyyy HHmmss',
    'MMMM dd, yyyy HH:mm' = 'MMMM dd, yyyy HH:mm',
    'MMMM dd, yyyy HH:mm:ss' = 'MMMM dd, yyyy HH:mm:ss',
    'MMM dd yyyy HH' = 'MMM dd yyyy HH',
    'MMM dd yyyy HHmm' = 'MMM dd yyyy HHmm',
    'MMM dd yyyy HHmmss' = 'MMM dd yyyy HHmmss',
    'MMM dd yyyy HH:mm' = 'MMM dd yyyy HH:mm',
    'MMM dd yyyy HH:mm:ss' = 'MMM dd yyyy HH:mm:ss',
    'MMM dd, yyyy HH' = 'MMM dd, yyyy HH',
    'MMM dd, yyyy HHmm' = 'MMM dd, yyyy HHmm',
    'MMM dd, yyyy HHmmss' = 'MMM dd, yyyy HHmmss',
    'MMM dd, yyyy HH:mm' = 'MMM dd, yyyy HH:mm',
    'MMM dd, yyyy HH:mm:ss' = 'MMM dd, yyyy HH:mm:ss',
    'ddMMyyyy' = 'ddMMyyyy',
    'dd-MM-yyyy' = 'dd-MM-yyyy',
    'dd/MM/yyyy' = 'dd/MM/yyyy',
    'dd. MM. yyyy' = 'dd. MM. yyyy',
    'dd MMMM yyyy' = 'dd MMMM yyyy',
    'dd MMM yyyy' = 'dd MMM yyyy',
    'ddMMyyyy hh' = 'ddMMyyyy hh',
    'ddMMyyyy hhmm' = 'ddMMyyyy hhmm',
    'ddMMyyyy hhmmss' = 'ddMMyyyy hhmmss',
    'ddMMyyyy hh:mm' = 'ddMMyyyy hh:mm',
    'ddMMyyyy hh:mm:ss' = 'ddMMyyyy hh:mm:ss',
    'dd-MM-yyyy hh' = 'dd-MM-yyyy hh',
    'dd-MM-yyyy hhmm' = 'dd-MM-yyyy hhmm',
    'dd-MM-yyyy hhmmss' = 'dd-MM-yyyy hhmmss',
    'dd-MM-yyyy hh:mm' = 'dd-MM-yyyy hh:mm',
    'dd-MM-yyyy hh:mm:ss' = 'dd-MM-yyyy hh:mm:ss',
    'dd/MM/yyyy hh' = 'dd/MM/yyyy hh',
    'dd/MM/yyyy hhmm' = 'dd/MM/yyyy hhmm',
    'dd/MM/yyyy hhmmss' = 'dd/MM/yyyy hhmmss',
    'dd/MM/yyyy hh:mm' = 'dd/MM/yyyy hh:mm',
    'dd/MM/yyyy hh:mm:ss' = 'dd/MM/yyyy hh:mm:ss',
    'dd. MM. yyyy hh' = 'dd. MM. yyyy hh',
    'dd. MM. yyyy hhmm' = 'dd. MM. yyyy hhmm',
    'dd. MM. yyyy hhmmss' = 'dd. MM. yyyy hhmmss',
    'dd. MM. yyyy hh:mm' = 'dd. MM. yyyy hh:mm',
    'dd. MM. yyyy hh:mm:ss' = 'dd. MM. yyyy hh:mm:ss',
    'dd MMMM yyyy hh' = 'dd MMMM yyyy hh',
    'dd MMMM yyyy hhmm' = 'dd MMMM yyyy hhmm',
    'dd MMMM yyyy hhmmss' = 'dd MMMM yyyy hhmmss',
    'dd MMMM yyyy hh:mm' = 'dd MMMM yyyy hh:mm',
    'dd MMMM yyyy hh:mm:ss' = 'dd MMMM yyyy hh:mm:ss',
    'dd MMM yyyy hh' = 'dd MMM yyyy hh',
    'dd MMM yyyy hhmm' = 'dd MMM yyyy hhmm',
    'dd MMM yyyy hhmmss' = 'dd MMM yyyy hhmmss',
    'dd MMM yyyy hh:mm' = 'dd MMM yyyy hh:mm',
    'dd MMM yyyy hh:mm:ss' = 'dd MMM yyyy hh:mm:ss',
    'ddMMyyyy HH' = 'ddMMyyyy HH',
    'ddMMyyyy HHmm' = 'ddMMyyyy HHmm',
    'ddMMyyyy HHmmss' = 'ddMMyyyy HHmmss',
    'ddMMyyyy HH:mm' = 'ddMMyyyy HH:mm',
    'ddMMyyyy HH:mm:ss' = 'ddMMyyyy HH:mm:ss',
    'dd-MM-yyyy HH' = 'dd-MM-yyyy HH',
    'dd-MM-yyyy HHmm' = 'dd-MM-yyyy HHmm',
    'dd-MM-yyyy HHmmss' = 'dd-MM-yyyy HHmmss',
    'dd-MM-yyyy HH:mm' = 'dd-MM-yyyy HH:mm',
    'dd-MM-yyyy HH:mm:ss' = 'dd-MM-yyyy HH:mm:ss',
    'dd/MM/yyyy HH' = 'dd/MM/yyyy HH',
    'dd/MM/yyyy HHmm' = 'dd/MM/yyyy HHmm',
    'dd/MM/yyyy HHmmss' = 'dd/MM/yyyy HHmmss',
    'dd/MM/yyyy HH:mm' = 'dd/MM/yyyy HH:mm',
    'dd/MM/yyyy HH:mm:ss' = 'dd/MM/yyyy HH:mm:ss',
    'dd. MM. yyyy HH' = 'dd. MM. yyyy HH',
    'dd. MM. yyyy HHmm' = 'dd. MM. yyyy HHmm',
    'dd. MM. yyyy HHmmss' = 'dd. MM. yyyy HHmmss',
    'dd. MM. yyyy HH:mm' = 'dd. MM. yyyy HH:mm',
    'dd. MM. yyyy HH:mm:ss' = 'dd. MM. yyyy HH:mm:ss',
    'dd MMMM yyyy HH' = 'dd MMMM yyyy HH',
    'dd MMMM yyyy HHmm' = 'dd MMMM yyyy HHmm',
    'dd MMMM yyyy HHmmss' = 'dd MMMM yyyy HHmmss',
    'dd MMMM yyyy HH:mm' = 'dd MMMM yyyy HH:mm',
    'dd MMMM yyyy HH:mm:ss' = 'dd MMMM yyyy HH:mm:ss',
    'dd MMM yyyy HH' = 'dd MMM yyyy HH',
    'dd MMM yyyy HHmm' = 'dd MMM yyyy HHmm',
    'dd MMM yyyy HHmmss' = 'dd MMM yyyy HHmmss',
    'dd MMM yyyy HH:mm' = 'dd MMM yyyy HH:mm',
    'dd MMM yyyy HH:mm:ss' = 'dd MMM yyyy HH:mm:ss',
}
/**
 * Unit to calculate
 * y => Calculate the year
 * M => Calculate the month
 * d => Calculate the day
 * h => Calculate the hour
 * m => Calculate the minute
 * s => Calculate the second
 */
export enum CountDateType {
    y = 'y',
    M = 'M',
    d = 'd',
    h = 'h',
    m = 'm',
    s = 's',
}
