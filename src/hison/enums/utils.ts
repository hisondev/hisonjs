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
