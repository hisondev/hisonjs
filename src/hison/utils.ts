import type { DateObject, DateTimeObject, TimeObject } from "./types";
import { AllDateTimeFormat, CountDateType, DayFormat, DayOfWeekFormat, DayOfWeekFullName, DayOfWeekFullNameKR, DayOfWeekShortName, DayOfWeekShortNameKR, HourFormat, HourMinuteFormat, MinuteFormat, MonthFormat, MonthFullName, MonthShortName, SecondFormat, TimeFormat, YearFormat, YearMonthFormat } from "./enums";
import { customOption, hisonCore } from "./core";

export const getUtils = () => {
    return {
        /**
         * Checks if the given string contains only alphabetic characters (A-Z, a-z).
         *
         * - Returns `true` if the string consists solely of alphabetic characters.
         * - Returns `false` if the string contains numbers, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only alphabetic characters, otherwise `false`.
         *
         * @example
         * isAlpha("Hello"); // true
         * isAlpha("Hello123"); // false
         * isAlpha("!@#"); // false
         */
        isAlpha(str: string): boolean {
            return /^[A-Za-z]+$/.test(str);
        },
        /**
         * Checks if the given string contains only alphabetic characters (A-Z, a-z) and numbers (0-9).
         *
         * - Returns `true` if the string consists solely of alphabetic characters and/or numbers.
         * - Returns `false` if the string contains symbols or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only alphabetic characters and numbers, otherwise `false`.
         *
         * @example
         * isAlphaNumber("Hello123"); // true
         * isAlphaNumber("Hello!"); // false
         * isAlphaNumber("123"); // true
         */
        isAlphaNumber(str: string): boolean {
            return /^[A-Za-z0-9]+$/.test(str);
        },
        /**
         * Checks if the given string contains only numeric characters (0-9).
         *
         * - Returns `true` if the string consists solely of numbers.
         * - Returns `false` if the string contains letters, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only numeric characters, otherwise `false`.
         *
         * @example
         * isNumber("123456"); // true
         * isNumber("123a"); // false
         * isNumber("!@#"); // false
         */
        isNumber(str: string): boolean {
            return /^[0-9]+$/.test(str);
        },
        /**
         * Checks if the given string contains only numeric characters (0-9) and symbols.
         *
         * - Returns `true` if the string consists solely of numbers and/or symbols.
         * - Returns `false` if the string contains alphabetic characters or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only numeric characters and symbols, otherwise `false`.
         *
         * @example
         * isNumberSymbols("123!@#"); // true
         * isNumberSymbols("123ABC"); // false
         * isNumberSymbols("!@#$%^"); // true
         */
        isNumberSymbols(str: string): boolean {
            return /^[0-9!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?~]+$/.test(str);
        },
        /**
         * Checks if the given string contains any symbols.
         *
         * - Returns `true` if the string contains at least one symbol.
         * - Returns `false` if the string has only alphanumeric characters or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains symbols, otherwise `false`.
         *
         * @example
         * isIncludeSymbols("Hello!"); // true
         * isIncludeSymbols("123"); // false
         * isIncludeSymbols("password@123"); // true
         */
        isIncludeSymbols(str: string): boolean {
            return /[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?~]/.test(str);
        },
        /**
         * Checks if the given string contains only lowercase alphabetic characters (a-z).
         *
         * - Returns `true` if the string consists solely of lowercase letters.
         * - Returns `false` if the string contains uppercase letters, numbers, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only lowercase alphabetic characters, otherwise `false`.
         *
         * @example
         * isLowerAlpha("hello"); // true
         * isLowerAlpha("Hello"); // false
         * isLowerAlpha("hello123"); // false
         */
        isLowerAlpha(str: string): boolean {
            return /^[a-z]+$/.test(str);
        },
        /**
         * Checks if the given string contains only lowercase alphabetic characters (a-z) and numbers (0-9).
         *
         * - Returns `true` if the string consists solely of lowercase letters and/or numbers.
         * - Returns `false` if the string contains uppercase letters, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only lowercase letters and numbers, otherwise `false`.
         *
         * @example
         * isLowerAlphaAndNumber("hello123"); // true
         * isLowerAlphaAndNumber("Hello123"); // false
         * isLowerAlphaAndNumber("hello!"); // false
         */
        isLowerAlphaAndNumber(str: string): boolean {
            return /^[a-z0-9]+$/.test(str);
        },
        /**
         * Checks if the given string contains only uppercase alphabetic characters (A-Z).
         *
         * - Returns `true` if the string consists solely of uppercase letters.
         * - Returns `false` if the string contains lowercase letters, numbers, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only uppercase alphabetic characters, otherwise `false`.
         *
         * @example
         * isUpperAlpha("HELLO"); // true
         * isUpperAlpha("Hello"); // false
         * isUpperAlpha("HELLO123"); // false
         */
        isUpperAlpha(str: string): boolean {
            return /^[A-Z]+$/.test(str);
        },
        /**
         * Checks if the given string contains only uppercase alphabetic characters (A-Z) and numbers (0-9).
         *
         * - Returns `true` if the string consists solely of uppercase letters and/or numbers.
         * - Returns `false` if the string contains lowercase letters, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only uppercase letters and numbers, otherwise `false`.
         *
         * @example
         * isUpperAlphaNumber("HELLO123"); // true
         * isUpperAlphaNumber("Hello123"); // false
         * isUpperAlphaNumber("HELLO!"); // false
         */
        isUpperAlphaNumber(str: string): boolean {
            return /^[A-Z0-9]+$/.test(str);
        },
        /**
         * Checks if the given value is a numeric value.
         *
         * - Returns `true` if the value is a finite number.
         * - Returns `false` if the value is `NaN`, `Infinity`, or not a number.
         *
         * @param num The value to be checked.
         * @returns `true` if the value is numeric, otherwise `false`.
         *
         * @example
         * isNumeric(123); // true
         * isNumeric("123"); // true
         * isNumeric("abc"); // false
         * isNumeric(Infinity); // false
         * isNumeric(NaN); // false
         */
        isNumeric(num: any): boolean {
            return !isNaN(num) && isFinite(num);
        },
        /**
         * Checks if the given value is an integer.
         *
         * - Returns `true` if the value is a finite integer.
         * - Returns `false` if the value is a decimal, `NaN`, `Infinity`, or not a number.
         *
         * @param num The value to be checked.
         * @returns `true` if the value is an integer, otherwise `false`.
         *
         * @example
         * isInteger(10); // true
         * isInteger("10"); // true
         * isInteger(10.5); // false
         * isInteger("abc"); // false
         * isInteger(Infinity); // false
         */
        isInteger(num: any): boolean {
            if (!hisonCore.utils.isNumeric(num)) return false;
            num = Number(num);
            return Number.isInteger(num);
        },
        /**
         * Checks if the given value is a positive integer.
         *
         * - Returns `true` if the value is a finite integer greater than zero.
         * - Returns `false` if the value is zero, a negative number, a decimal, `NaN`, `Infinity`, or not a number.
         *
         * @param num The value to be checked.
         * @returns `true` if the value is a positive integer, otherwise `false`.
         *
         * @example
         * isPositiveInteger(10); // true
         * isPositiveInteger("10"); // true
         * isPositiveInteger(0); // false
         * isPositiveInteger(-5); // false
         * isPositiveInteger(10.5); // false
         */
        isPositiveInteger(num: any): boolean {
            if (!hisonCore.utils.isNumeric(num)) return false;
            num = Number(num);
            return Number.isInteger(num) && num > 0;
        },
        /**
         * Checks if the given value is a negative integer.
         *
         * - Returns `true` if the value is a finite integer less than zero.
         * - Returns `false` if the value is zero, a positive number, a decimal, `NaN`, `Infinity`, or not a number.
         *
         * @param num The value to be checked.
         * @returns `true` if the value is a negative integer, otherwise `false`.
         *
         * @example
         * isNegativeInteger(-10); // true
         * isNegativeInteger("-10"); // true
         * isNegativeInteger(0); // false
         * isNegativeInteger(5); // false
         * isNegativeInteger(-10.5); // false
         */
        isNegativeInteger(num: any): boolean {
            if (!hisonCore.utils.isNumeric(num)) return false;
            num = Number(num);
            return Number.isInteger(num) && num < 0;
        },
        /**
         * Checks if the given value is an array.
         *
         * - Returns `true` if the value is an array.
         * - Returns `false` if the value is `null`, `undefined`, an object, or any other data type.
         *
         * @param arr The value to be checked.
         * @returns `true` if the value is an array, otherwise `false`.
         *
         * @example
         * isArray([1, 2, 3]); // true
         * isArray("Hello"); // false
         * isArray({ key: "value" }); // false
         * isArray(null); // false
         */
        isArray(arr: any): boolean {
            return Array.isArray(arr) && arr.constructor === Array;
        },
        /**
         * Checks if the given value is a plain object.
         *
         * - Returns `true` if the value is a non-null object and not an array.
         * - Returns `false` if the value is `null`, an array, or any other data type.
         *
         * @param obj The value to be checked.
         * @returns `true` if the value is a plain object, otherwise `false`.
         *
         * @example
         * isObject({ key: "value" }); // true
         * isObject([1, 2, 3]); // false
         * isObject(null); // false
         * isObject("Hello"); // false
         */
        isObject(obj: any): boolean {
            return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && obj.constructor === Object;
        },
        /**
         * Checks if the given value is a valid date.
         *
         * - Accepts a `DateObject` or a string representation of a date.
         * - Returns `true` if the date is valid based on its year, month, and day.
         * - Returns `false` if the date is improperly formatted or does not exist.
         *
         * @param date The value to be checked (as a `DateObject` or string).
         * @returns `true` if the value is a valid date, otherwise `false`.
         *
         * @example
         * isDate("2024-02-29"); // true (valid leap year date)
         * isDate("2023-02-29"); // false (February 29 does not exist in 2023)
         * isDate({ y: 2023, M: 12, d: 31 }); // true
         * isDate("invalid-date"); // false
         */
        isDate(date: DateObject | string | null): boolean {
            if(!date) return false;
            const dateObj: DateObject = hisonCore.utils.isObject(date) ? date as DateObject : hisonCore.utils.getDateObject(date as string);
    
            let yyyy: string = hisonCore.utils.getToString(dateObj.y);
            let MM: string = hisonCore.utils.getToString(dateObj.M);
            let dd: string = hisonCore.utils.getToString(dateObj.d);
    
            let result = true;
            try {
                if (!hisonCore.utils.isInteger(yyyy) || !hisonCore.utils.isInteger(MM) || !hisonCore.utils.isInteger(dd)) {
                    return false;
                }
    
                if (!yyyy) {
                    return false;
                }
                if (!MM) {
                    MM = '01';
                } else if (MM.length === 1) {
                    MM = '0' + MM;
                }
                if (!dd) {
                    dd = '01';
                } else if (dd.length === 1) {
                    dd = '0' + dd;
                }
    
                if (hisonCore.utils.getToNumber(yyyy+MM+dd) < 16000101) {
                    const date = new Date(hisonCore.utils.getToNumber(yyyy), hisonCore.utils.getToNumber(MM) - 1, hisonCore.utils.getToNumber(dd));
                    if (date.getFullYear() !== hisonCore.utils.getToNumber(yyyy) || date.getMonth() !== hisonCore.utils.getToNumber(MM) - 1 || date.getDate() !== hisonCore.utils.getToNumber(dd)) {
                        return false;
                    }
                    return true;
                }
                else {
                    const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
                    result = dateRegex.test(dd+'-'+MM+'-'+yyyy);
                }
                
            } catch (err) {
                result = false;
            }    
            return result;
        },
        /**
         * Checks if the given value is a valid time.
         *
         * - Accepts a `TimeObject` or a string representation of a time.
         * - Recognizes both standard times (00:00:00 ~ 23:59:59) and the special ISO 8601 time `24:00:00`.
         * - Returns `true` if the time components (hours, minutes, seconds) are within valid ranges.
         * - Returns `false` if any part is invalid, missing, or improperly formatted.
         *
         * @param time The value to be checked (as a `TimeObject` or a parsable string).
         * @returns `true` if the value is a valid time, otherwise `false`.
         *
         * @example
         * isTime("14:30:59"); // true
         * isTime({ h: 23, m: 59, s: 59 }); // true
         * isTime("24:00:00"); // true (ISO 8601 special case)
         * isTime({ h: 24, m: 0, s: 0 }); // true
         * isTime("24:00:01"); // false (invalid seconds with hour 24)
         * isTime("25:00:00"); // false (invalid hour)
         * isTime("12:60:00"); // false (invalid minute)
         * isTime("12:30:61"); // false (invalid second)
         */
        isTime(time: TimeObject | string | null): boolean {
            if (time == null) return false;

            const timeObj: TimeObject = hisonCore.utils.isObject(time)
                ? time as TimeObject
                : hisonCore.utils.getTimeObject(time as string);

            const { h, m, s } = timeObj;

            // null 체크와 정수 체크를 모두 수행
            if (
                h == null || m == null || s == null ||
                !Number.isInteger(h) || !Number.isInteger(m) || !Number.isInteger(s)
            ) return false;

            // 여기부터 h, m, s는 number 타입 확정
            const isNormalTime = h >= 0 && h <= 23 && m >= 0 && m <= 59 && s >= 0 && s <= 59;
            const isSpecialMidnight = h === 24 && m === 0 && s === 0;

            return isNormalTime || isSpecialMidnight;
        },
        /**
         * Checks if the given value is a valid datetime.
         *
         * - Accepts a `DateTimeObject` or a string representation of a datetime.
         * - Returns `true` if both the date and time components are valid.
         * - Returns `false` if either the date or time is invalid or improperly formatted.
         *
         * @param datetime The value to be checked (as a `DateTimeObject` or string).
         * @returns `true` if the value is a valid datetime, otherwise `false`.
         *
         * @example
         * isDatetime("2024-02-29 14:30:59"); // true
         * isDatetime({ y: 2023, M: 12, d: 31, h: 23, m: 59, s: 59 }); // true
         * isDatetime("2023-02-29 12:00:00"); // false (invalid date)
         * isDatetime("2024-02-28 25:00:00"); // false (invalid time)
         */
        isDatetime(datetime: DateTimeObject | string): boolean {
            const datetimeObj: DateTimeObject | null = hisonCore.utils.isObject(datetime) ? datetime as DateTimeObject : hisonCore.utils.getDatetimeObject(datetime as string);
            if (!hisonCore.utils.isDate(datetimeObj)) return false;
            if (!hisonCore.utils.isTime(datetimeObj)) return false;
            return true;
        },
        /**
         * Checks if the given string is a valid email address.
         *
         * - Returns `true` if the string follows the standard email format.
         * - Returns `false` if the string does not match the email pattern.
         *
         * @param str The string to be checked.
         * @returns `true` if the string is a valid email address, otherwise `false`.
         *
         * @example
         * isEmail("user@example.com"); // true
         * isEmail("user.name@domain.co"); // true
         * isEmail("user@domain"); // false (missing top-level domain)
         * isEmail("invalid-email"); // false
         */
        isEmail(str: string): boolean {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,}$/;
            return emailPattern.test(str);
        },
        /**
         * Checks if the given string is a valid URL.
         *
         * - Returns `true` if the string follows the standard URL format.
         * - Returns `false` if the string does not match the URL pattern.
         *
         * @param urlStr The string to be checked.
         * @returns `true` if the string is a valid URL, otherwise `false`.
         *
         * @example
         * isURL("https://example.com"); // true
         * isURL("ftp://files.server.com"); // true
         * isURL("www.example.com"); // false (missing protocol)
         * isURL("invalid-url"); // false
         */
        isURL(urlStr: string): boolean {
            const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            return urlPattern.test(urlStr);
        },
        /**
         * Checks if the given string matches the specified mask pattern.
         *
         * - A mask defines expected character types at each position:
         *   - `'A'` expects an uppercase letter (A-Z).
         *   - `'a'` expects a lowercase letter (a-z).
         *   - `'9'` expects a numeric digit (0-9).
         *   - Any other character in the mask must match exactly.
         * - Returns `true` if the string fully matches the mask pattern.
         * - Returns `false` if the string does not match the mask or has a different length.
         *
         * @param str The string to be validated.
         * @param mask The mask pattern defining expected character types.
         * @returns `true` if the string matches the mask pattern, otherwise `false`.
         *
         * @example
         * isValidMask("ABC123", "AAA999"); // true
         * isValidMask("abc123", "AAA999"); // false (lowercase letters don't match uppercase mask)
         * isValidMask("abc-123", "aaa-999"); // true
         * isValidMask("abcd123", "aaa-999"); // false (length mismatch)
         */
        isValidMask(str: string, mask: string): boolean {
            if (str.length !== mask.length) {
                return false;
            }
        
            for (let i = 0; i < str.length; i++) {
                const char = str.charAt(i);
                const maskChar = mask.charAt(i);
        
                switch (maskChar) {
                    case 'A':
                        if (char < 'A' || char > 'Z') return false;
                        break;
                    case 'a':
                        if (char < 'a' || char > 'z') return false;
                        break;
                    case '9':
                        if (isNaN(parseInt(char))) return false;
                        break;
                    default:
                        if (char !== maskChar) return false;
                }
            }
            return true;
        },
        /**
         * Converts a Date object to a string in 'YYYY-MM-DD' format.
         * 
         * Pads month and day values with leading zeros if necessary.
         * This function is locale-independent and does not rely on toLocaleDateString.
         * @param date A valid JavaScript Date object.
         * @returns A string representing the date in 'YYYY-MM-DD' format.
         * @example
         * getFormatDateDash(new Date(2025, 5, 3)); // "2025-06-03"
         * getFormatDateDash(new Date(2024, 0, 9)); // "2024-01-09"
         */
        getFormatDateDash(date: Date) {
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}`
        },
        /**
         * Converts a Date object to a compact string in 'YYYYMMDD' format.
         * 
         * Pads month and day values with leading zeros if necessary.
         * Useful for filenames, database keys, or numeric date sorting.
         * @param date A valid JavaScript Date object.
         * @returns A string representing the date in 'YYYYMMDD' format.
         * @example
         * getFormatDateCompact(new Date(2025, 5, 3)); // "20250603"
         * getFormatDateCompact(new Date(2024, 0, 9)); // "20240109"
         */
        getFormatDateCompact(date: Date) {
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        return `${y}${m}${d}`
        },
        /**
         * Extracts and returns the year, month, and day from a given date.
         *
         * - If the input is a `Date` object, it extracts the year, month, and day.
         * - If the input is a string, it attempts to parse it in formats:
         *   - `"YYYY-MM-DD"`
         *   - `"YYYY/MM/DD"`
         *   - `"YYYYMMDD"`
         * - If parsing fails, it returns an object with `null` values.
         *
         * @param date A `Date` object or a date string in a supported format.
         * @returns An object containing the year (`y`), month (`M`), and day (`d`).
         *
         * @example
         * getDateObject("2024-02-05"); // { y: 2024, M: 2, d: 5 }
         * getDateObject("20240205"); // { y: 2024, M: 2, d: 5 }
         * getDateObject(new Date(2024, 1, 5)); // { y: 2024, M: 2, d: 5 }
         * getDateObject("invalid"); // { y: null, M: null, d: null }
         */
        getDateObject(date: Date | string): DateObject {
            const result: {
               y: number | null;
               M: number | null;
               d: number | null; 
            } = {y: null, M: null, d: null};
            if (typeof date === 'string') {
                let year: number | null = null, month: number | null = null, day: number | null = null;
                date = hisonCore.utils.getToString(date);
                date = date.split(' ')[0];
                if (date.includes('-')) {
                    [year, month, day] = date.split('-').map(num => parseInt(num, 10));
                } else if (date.includes('/')) {
                    [year, month, day] = date.split('/').map(num => parseInt(num, 10));
                } else if (date.length === 8) {
                    year = parseInt(date.substring(0, 4), 10);
                    month = parseInt(date.substring(4, 6), 10);
                    day = parseInt(date.substring(6, 8), 10);
                } else {
                    return result;
                }
                result.y = year;
                result.M = month;
                result.d = day;
            } else if (date instanceof Date) {
                result.y = date.getFullYear();
                result.M = date.getMonth() + 1;
                result.d = date.getDate();
            }
            return result
        },
        /**
         * Extracts and returns the hours, minutes, and seconds from a given time.
         *
         * - If the input is a `Date` object, it extracts the hour, minute, and second.
         * - If the input is a string, it attempts to parse it in formats:
         *   - `"HH:MM:SS"`
         *   - `"HHMMSS"`
         * - If the input is a datetime string (`"YYYY-MM-DD HH:MM:SS"`), it extracts only the time part.
         * - If parsing fails, it returns an object with `null` values.
         *
         * @param time A `Date` object or a time string in a supported format.
         * @returns An object containing the hours (`h`), minutes (`m`), and seconds (`s`).
         *
         * @example
         * getTimeObject("14:30:45"); // { h: 14, m: 30, s: 45 }
         * getTimeObject("143045"); // { h: 14, m: 30, s: 45 }
         * getTimeObject("2024-02-05 14:30:45"); // { h: 14, m: 30, s: 45 }
         * getTimeObject(new Date(2024, 1, 5, 14, 30, 45)); // { h: 14, m: 30, s: 45 }
         * getTimeObject("invalid"); // { h: null, m: null, s: null }
         */
        getTimeObject(time: Date | string): TimeObject {
            const result: {
                h: number | null;
                m: number | null;
                s: number | null;
            } = {h: null, m: null, s: null};
            if (typeof time === 'string') {
                let hours: number | null = null, minutes: number | null = null, seconds: number | null = null;
                time = hisonCore.utils.getToString(time);
                const dateArr = time.split(' ');
                time = dateArr.length > 1 ? dateArr[1] : time;
        
                if (time.includes(':')) {
                    [hours, minutes, seconds] = time.split(':').map(num => parseInt(num, 10));
                } else if (time.length === 6) {
                    hours = parseInt(time.substring(0, 2), 10);
                    minutes = parseInt(time.substring(2, 4), 10);
                    seconds = parseInt(time.substring(4, 6), 10);
                } else {
                    return { h: null, m: null, s: null };
                }
                result.h = hours;
                result.m = minutes;
                result.s = seconds;
            } else if (time instanceof Date) {
                result.h = time.getHours();
                result.m = time.getMinutes();
                result.s = time.getSeconds();
            }
            return result;
        },
        /**
         * Extracts and returns the year, month, day, hours, minutes, and seconds from a given datetime.
         *
         * - If the input is a `Date` object, it extracts all date and time components.
         * - If the input is a string, it attempts to parse it in formats:
         *   - `"YYYY-MM-DD HH:MM:SS"`
         *   - `"YYYY/MM/DD HH:MM:SS"`
         *   - `"YYYYMMDDHHMMSS"`
         * - If the input is a date-only string (`"YYYY-MM-DD"`), the time defaults to `00:00:00`.
         * - If parsing fails, it returns `null`.
         *
         * @param datetime A `Date` object or a datetime string in a supported format.
         * @returns An object containing the year (`y`), month (`M`), day (`d`), hours (`h`), minutes (`m`), and seconds (`s`), or `null` if parsing fails.
         *
         * @example
         * getDatetimeObject("2024-02-05 14:30:45"); // { y: 2024, M: 2, d: 5, h: 14, m: 30, s: 45 }
         * getDatetimeObject("20240205143045"); // { y: 2024, M: 2, d: 5, h: 14, m: 30, s: 45 }
         * getDatetimeObject("2024-02-05"); // { y: 2024, M: 2, d: 5, h: 0, m: 0, s: 0 }
         * getDatetimeObject(new Date(2024, 1, 5, 14, 30, 45)); // { y: 2024, M: 2, d: 5, h: 14, m: 30, s: 45 }
         * getDatetimeObject("invalid"); // null
         */
        getDatetimeObject(datetime: Date | string): DateTimeObject | null {
            if (typeof datetime === 'string') {
                datetime = hisonCore.utils.getToString(datetime);
                const datetimeArr = datetime.split(' ');
                const dateStr = datetimeArr[0];
                if (dateStr.includes(':') || dateStr.length === 6) {
                    return Object.assign({}, hisonCore.utils.getDateObject(hisonCore.utils.getSysDate('yyyy-MM-dd')), hisonCore.utils.getTimeObject(dateStr));
                }
                const timeStr = datetimeArr.length > 1 ? datetimeArr[1] as string : '';
                return Object.assign({}, hisonCore.utils.getDateObject(dateStr), hisonCore.utils.getTimeObject(timeStr));
            }
            if (datetime instanceof Date) {
                return {
                    y : datetime.getFullYear(),
                    M : datetime.getMonth() + 1,
                    d : datetime.getDate(),
                    h : datetime.getHours(),
                    m : datetime.getMinutes(),
                    s : datetime.getSeconds(),
                }
            }
            return null;
        },
        /**
         * Parses a supported date or datetime string and returns a JavaScript `Date` object.
         *
         * - Supports formats:
         *   - `"YYYY-MM-DD"`
         *   - `"YYYY/MM/DD"`
         *   - `"YYYYMMDD"`
         *   - `"YYYY-MM-DD HH:MM:SS"`
         *   - `"YYYY/MM/DD HH:MM:SS"`
         *   - `"YYYYMMDDHHMMSS"`
         * - If the input is already a valid `Date` object, it returns it as-is.
         * - If parsing fails, it returns `null`.
         *
         * @param datetime A date string, datetime string, or `Date` object.
         * @returns A `Date` object representing the parsed datetime, or `null` if parsing fails.
         *
         * @example
         * getJSDateObject("2024-02-05"); // new Date(2024, 1, 5)
         * getJSDateObject("20240205"); // new Date(2024, 1, 5)
         * getJSDateObject("2024-02-05 14:30:45"); // new Date(2024, 1, 5, 14, 30, 45)
         * getJSDateObject("20240205143045"); // new Date(2024, 1, 5, 14, 30, 45)
         * getJSDateObject(new Date()); // returns the same Date object
         */
        getJSDateObject(datetime: string | Date): Date | null {
            if (datetime instanceof Date && !isNaN(datetime.getTime())) {
                return datetime
            }

            datetime = hisonCore.utils.getToString(datetime).trim()

            const { y, M, d } = hisonCore.utils.getDateObject(datetime)
            const { h, m, s } = hisonCore.utils.getTimeObject(datetime)

            // 날짜 파싱이 실패했을 경우
            if (y === null || M === null || d === null) return null

            // 시간 파싱 실패 시에는 0 처리
            const hours = h ?? 0
            const minutes = m ?? 0
            const seconds = s ?? 0

            return new Date(y, M - 1, d, hours, minutes, seconds)
        },
        /**
         * Adds a specified amount of time to a given date or datetime.
         *
         * - Accepts a `DateTimeObject`, `DateObject`, or a date string.
         * - Supports adding years (`'y'`), months (`'M'`), days (`'d'`), hours (`'h'`), minutes (`'m'`), and seconds (`'s'`).
         * - If `addType` is omitted or invalid, it defaults to adding days.
         * - If `format` is provided, returns a formatted string; otherwise, returns a `DateTimeObject`.
         *
         * @param datetime The original datetime as an object or string.
         * @param addValue The amount to add (positive or negative).
         * @param addType The unit of time to add (`'y'`, `'M'`, `'d'`, `'h'`, `'m'`, `'s'`).
         * @param format Optional format string for the output. default : 'yyyy-MM-dd' or 'yyyy-MM-dd hh:mm:ss'
         * @returns The updated datetime as an object or formatted string.
         *
         * @example
         * addDate("2024-02-05", 1, CountDateType.d); // { y: 2024, M: 2, d: 6 }
         * addDate("2024-02-05", -1, CountDateType.M); // { y: 2024, M: 1, d: 5 }
         * addDate("2024-02-05 14:30:00", 2, CountDateType.h); // { y: 2024, M: 2, d: 5, h: 16, m: 30, s: 0 }
         * addDate("2024-02-05", 1, "d", "yyyy-MM-dd"); // "2024-02-06"
         */
        addDate(datetime: DateTimeObject | DateObject | string, addValue: string | number = 0,
            addType?: keyof typeof CountDateType,
            format?: keyof typeof AllDateTimeFormat): DateTimeObject | string {
            const datetimeObj: DateTimeObject = hisonCore.utils.isObject(datetime) ? hisonCore.utils.deepCopyObject(datetime) : hisonCore.utils.getDatetimeObject(datetime as string);
            if (!format) {
                if (datetimeObj.h === undefined || datetimeObj.h === null) {
                    format = customOption.utils.dateFormat;
                    
                }
                else {
                    format = customOption.utils.datetimeFormat;
                }
            }
            
            if (!hisonCore.utils.isInteger(addValue)) throw new Error(`ER0001 Please enter a valid value.\n=>${JSON.stringify(addValue)}`);
            addValue = hisonCore.utils.getToNumber(addValue);
    
            datetimeObj.M = datetimeObj.M === null || datetimeObj.M === undefined ? 1 : datetimeObj.M;
            datetimeObj.d = datetimeObj.d === null || datetimeObj.d === undefined ? 1 : datetimeObj.d;
            datetimeObj.h = datetimeObj.h === null || datetimeObj.h === undefined ? 0 : datetimeObj.h;
            datetimeObj.m = datetimeObj.m === null || datetimeObj.m === undefined ? 0 : datetimeObj.m;
            datetimeObj.s = datetimeObj.s === null || datetimeObj.s === undefined ? 0 : datetimeObj.s;
    
            if (!hisonCore.utils.isDate(datetimeObj)) throw new Error(`ER0002 Please enter a valid date.\n=>${JSON.stringify(datetime)}`);
            if (!hisonCore.utils.isTime(datetimeObj)) throw new Error(`ER0003 Please enter a valid date.\n=>${JSON.stringify(datetime)}`);
            if (datetimeObj.y === null || datetimeObj.M === null || datetimeObj.d === null) {
                throw new Error(`ER0002 Please enter a valid date.\n=>${JSON.stringify(datetime)}`);
            }
    
            const d = new Date(datetimeObj.y, datetimeObj.M - 1, datetimeObj.d, datetimeObj.h, datetimeObj.m, datetimeObj.s);
        
            switch (addType) {
                case 'y':
                    d.setFullYear(d.getFullYear() + addValue);
                    break;
                case 'M':
                    d.setMonth(d.getMonth() + addValue);
                    break;
                case 'd':
                    d.setDate(d.getDate() + addValue);
                    break;
                case 'h':
                    d.setHours(d.getHours() + addValue);
                    break;
                case 'm':
                    d.setMinutes(d.getMinutes() + addValue);
                    break;
                case 's':
                    d.setSeconds(d.getSeconds() + addValue);
                    break;
                default:
                    d.setDate(d.getDate() + addValue);
            }
    
            const rtnObj = {
                y: d.getFullYear(),
                M: (d.getMonth() + 1),
                d: d.getDate(),
                h: d.getHours(),
                m: d.getMinutes(),
                s: d.getSeconds()
            }
    
            return hisonCore.utils.isObject(datetime) ? rtnObj : hisonCore.utils.getDateWithFormat(rtnObj, format);
        },
        /**
         * Calculates the difference between two dates or datetimes.
         *
         * - Accepts `DateTimeObject`, `DateObject`, or a string representation of a date or datetime.
         * - If `diffType` is specified, it returns the difference in the given unit:
         *   - `'y'`: Years
         *   - `'M'`: Months
         *   - `'d'`: Days
         *   - `'h'`: Hours
         *   - `'m'`: Minutes
         *   - `'s'`: Seconds
         * - If `diffType` is omitted or invalid, it defaults to calculating the difference in days.
         *
         * @param datetime1 The first date or datetime.
         * @param datetime2 The second date or datetime.
         * @param diffType The unit of difference (`'y'`, `'M'`, `'d'`, `'h'`, `'m'`, `'s'`).
         * @returns The difference between the two dates in the specified unit.
         *
         * @example
         * getDateDiff("2024-02-01", "2024-03-01", CountDateType.M); // 1
         * getDateDiff("2024-02-01", "2025-02-01", CountDateType.y); // 1
         * getDateDiff("2024-02-01", "2024-02-10", CountDateType.d); // 9
         * getDateDiff("2024-02-01 14:00:00", "2024-02-01 16:30:00", CountDateType.h); // 2
         * getDateDiff("2024-02-01 14:00:00", "2024-02-01 14:45:00", "m"); // 45
         * getDateDiff("2024-02-01 14:00:00", "2024-02-01 14:00:30", "s"); // 30
         */
        getDateDiff(datetime1: DateTimeObject | DateObject | string, datetime2: DateTimeObject | DateObject | string, 
            diffType?: keyof typeof CountDateType): number {
            const datetimeObj1: DateTimeObject = hisonCore.utils.isObject(datetime1) ? hisonCore.utils.deepCopyObject(datetime1) : hisonCore.utils.getDatetimeObject(datetime1 as string);
            const datetimeObj2: DateTimeObject = hisonCore.utils.isObject(datetime2) ? hisonCore.utils.deepCopyObject(datetime2) : hisonCore.utils.getDatetimeObject(datetime2 as string);
                        
            datetimeObj1.M = datetimeObj1.M || 1; datetimeObj2.M = datetimeObj2.M || 1;
            datetimeObj1.d = datetimeObj1.d || 1; datetimeObj2.d = datetimeObj2.d || 1;
            datetimeObj1.h = datetimeObj1.h || 0; datetimeObj2.h = datetimeObj2.h || 0;
            datetimeObj1.m = datetimeObj1.m || 0; datetimeObj2.m = datetimeObj2.m || 0;
            datetimeObj1.s = datetimeObj1.s || 0; datetimeObj2.s = datetimeObj2.s || 0;
    
            if (!hisonCore.utils.isDate(datetimeObj1)) throw new Error(`ER0004 Please enter a valid date.\n=>${JSON.stringify(datetimeObj1)}`);
            if (!hisonCore.utils.isTime(datetimeObj1)) throw new Error(`ER0005 Please enter a valid date.\n=>${JSON.stringify(datetimeObj1)}`);
            if (!hisonCore.utils.isDate(datetimeObj2)) throw new Error(`ER0006 Please enter a valid date.\n=>${JSON.stringify(datetimeObj2)}`);
            if (!hisonCore.utils.isTime(datetimeObj2)) throw new Error(`ER0007 Please enter a valid date.\n=>${JSON.stringify(datetimeObj2)}`);
            if (datetimeObj1.y === null) {
                throw new Error(`ER0004 Please enter a valid date.\n=>${JSON.stringify(datetimeObj1)}`);
            }
            if (datetimeObj2.y === null) {
                throw new Error(`ER0005 Please enter a valid date.\n=>${JSON.stringify(datetimeObj2)}`);
            }
        
            const d1 = new Date(datetimeObj1.y, datetimeObj1.M - 1, datetimeObj1.d, datetimeObj1.h, datetimeObj1.m, datetimeObj1.s);
            const d2 = new Date(datetimeObj2.y, datetimeObj2.M - 1, datetimeObj2.d, datetimeObj2.h, datetimeObj2.m, datetimeObj2.s);
        
            switch (diffType) {
                case 'y':
                    return d2.getFullYear() - d1.getFullYear();
                case 'M':
                    return (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
                case 'd':
                    return Math.floor((d2.getTime() - d1.getTime()) / (24 * 60 * 60 * 1000));
                case 'h':
                    return Math.floor((d2.getTime() - d1.getTime()) / (60 * 60 * 1000));
                case 'm':
                    return Math.floor((d2.getTime() - d1.getTime()) / (60 * 1000));
                case 's':
                    return Math.floor((d2.getTime() - d1.getTime()) / 1000);
                default:
                    return Math.floor((d2.getTime() - d1.getTime()) / (24 * 60 * 60 * 1000));
            }
        },
        /**
         * Returns the full or abbreviated name of a given month.
         *
         * - Accepts a month number (`1-12`) or a string representation of a number.
         * - If `isFullName` is `true`, it returns the full month name (e.g., `"January"`).
         * - If `isFullName` is `false`, it returns the abbreviated month name (e.g., `"Jan"`).
         * - Throws an error if the input month is outside the valid range (`1-12`).
         *
         * @param month The month as a number (`1-12`) or a string representing a number.
         * @param isFullName Determines whether to return the full name (`true`) or the abbreviated name (`false`) (default: `true`).
         * @returns The full or abbreviated month name.
         *
         * @throws Error if the month is not between `1` and `12`.
         *
         * @example
         * getMonthName(2); // "February"
         * getMonthName("3", false); // "Mar"
         * getMonthName(12, true); // "December"
         * getMonthName(0); // Throws error: "Month must be between 1 and 12"
         */
        getMonthName(month: number | string, isFullName: boolean = true): string {
            if (typeof month === 'string') month = parseInt(month, 10);
    
            if (month < 1 || month > 12) {
                throw new Error(`ER0008 Month must be between 1 and 12`);
            }
    
            if (isFullName) {
                return MonthFullName[month];
            } else {
                return MonthShortName[month];
            }
        },
        /**
         * Formats a given date or datetime according to the specified format.
         *
         * - Accepts a `DateTimeObject`, `DateObject`, or a string representation of a date/datetime.
         * - If no format is provided, it defaults to `CustomOption.dateFormat` for dates 
         *   and `CustomOption.datetimeFormat` for datetimes.
         * - Supports various formats such as:
         *   - `'yyyy-MM-dd'` → `"2025-02-05"`
         *   - `'yyyy/MM/dd hh:mm:ss'` → `"2025/02/05 14:30:45"`
         *   - `'MMMM dd, yyyy'` → `"February 5, 2025"`
         * - Throws an error if the input date is invalid.
         *
         * @param datetime The date or datetime to format.
         * @param format The desired output format (optional). Default: `'yyyy-MM-dd'` or `'yyyy-MM-dd hh:mm:ss'`
         * @returns The formatted date/time as a string.
         *
         * @throws Error if the provided date is invalid.
         *
         * @example
         * getDateWithFormat("2025-02-05", AllDateTimeFormat[yyyy/MM/dd]); // "2025/02/05"
         * getDateWithFormat("2025-02-05 14:30:45", AllDateTimeFormat[MMMM dd, yyyy]); // "February 5, 2025"
         * getDateWithFormat({ y: 2025, M: 2, d: 5 }, AllDateTimeFormat[MM-dd-yyyy]); // "02-05-2025"
         */
        getDateWithFormat(datetime: Date | DateTimeObject | DateObject | string,
            format?: keyof typeof AllDateTimeFormat): string {
            let datetimeObj;
            if (datetime instanceof Date && !isNaN(datetime.getTime())) {
                datetimeObj = hisonCore.utils.getDatetimeObject(datetime)
            }
            else {
                datetimeObj = hisonCore.utils.isObject(datetime) ? hisonCore.utils.deepCopyObject(datetime) : hisonCore.utils.getDatetimeObject(datetime as string);
            }

            if (!format) {
                if (datetimeObj.h === undefined || datetimeObj.h === null) {
                    format = customOption.utils.dateFormat;
                }
                else {
                    format = customOption.utils.datetimeFormat;
                }
            }
    
            let y = datetimeObj.y.toString();
            let M = (datetimeObj.M || 1).toString().padStart(2, '0');
            let d = (datetimeObj.d || 1).toString().padStart(2, '0');
            let H = (datetimeObj.h || 0).toString().padStart(2, '0');
            let h = ((datetimeObj.h !== 0) && ((datetimeObj.h % 12) === 0) ? 12 : (datetimeObj.h % 12)).toString().padStart(2, '0');
            let m = (datetimeObj.m || 0).toString().padStart(2, '0');
            let s = (datetimeObj.s || 0).toString().padStart(2, '0');
            let MMMM, MMM;
    
            if (!hisonCore.utils.isDate(y + M + d)) {
                y = hisonCore.utils.getSysYear('yyyy')
                M = hisonCore.utils.getSysMonth('MM')
                d = hisonCore.utils.getSysDay('dd')
                MMMM = hisonCore.utils.getMonthName(hisonCore.utils.getSysMonth('M'));
                MMM = hisonCore.utils.getMonthName(hisonCore.utils.getSysMonth('M'), false);
            }
            else {
                MMMM = hisonCore.utils.getMonthName(datetimeObj.M);
                MMM = hisonCore.utils.getMonthName(datetimeObj.M, false);
            }

            if (!hisonCore.utils.isTime(H + m + s)) {
                H = '00'
                h = '00'
                m = '00'
                s = '00'
            }
    
            switch (format) {
                case 'yyyy':
                    return y;
                    
                case 'yyyyMM':
                    return y + M;
                case 'yyyy-MM':
                    return y + '-' + M;
                case 'yyyy/MM':
                    return y + '/' + M;
                case 'yyyy. MM':
                    return y + '. ' + M;
                case 'yyyy MM':
                    return y + ' ' + M;
        
                case 'yyyyMMdd':
                    return y + M + d;
                case 'yyyy-MM-dd':
                    return y + '-' + M + '-' + d;
                case 'yyyy/MM/dd':
                    return y + '/' + M + '/' + d;
                case 'yyyy. MM. dd':
                    return y + '. ' + M + '. ' + d;
                case 'yyyy MM dd':
                    return y + ' ' + M + ' ' + d;
        
                case 'yyyyMMdd hh':
                    return y + M + d + ' ' + h;
                case 'yyyyMMdd hhmm':
                    return y + M + d + ' ' + h + m;
                case 'yyyyMMdd hhmmss':
                    return y + M + d + ' ' + h + m + s;
                case 'yyyyMMdd hh:mm':
                    return y + M + d + ' ' + h + ':' + m;
                case 'yyyyMMdd hh:mm:ss':
                    return y + M + d + ' ' + h + ':' + m + ':' + s;
                case 'yyyy-MM-dd hh':
                    return y + '-' + M + '-' + d + ' ' + h;
                case 'yyyy-MM-dd hhmm':
                    return y + '-' + M + '-' + d + ' ' + h + m;
                case 'yyyy-MM-dd hhmmss':
                    return y + '-' + M + '-' + d + ' ' + h + m + s;
                case 'yyyy-MM-dd hh:mm':
                    return y + '-' + M + '-' + d + ' ' + h + ':' + m;
                case 'yyyy-MM-dd hh:mm:ss':
                    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
                case 'yyyy/MM/dd hh':
                    return y + '/' + M + '/' + d + ' ' + h;
                case 'yyyy/MM/dd hhmm':
                    return y + '/' + M + '/' + d + ' ' + h + m;
                case 'yyyy/MM/dd hhmmss':
                    return y + '/' + M + '/' + d + ' ' + h + m + s;
                case 'yyyy/MM/dd hh:mm':
                    return y + '/' + M + '/' + d + ' ' + h + ':' + m;
                case 'yyyy/MM/dd hh:mm:ss':
                    return y + '/' + M + '/' + d + ' ' + h + ':' + m + ':' + s;
                case 'yyyy. MM. dd hh':
                    return y + '. ' + M + '. ' + d + ' ' + h;
                case 'yyyy. MM. dd hhmm':
                    return y + '. ' + M + '. ' + d + ' ' + h + m;
                case 'yyyy. MM. dd hhmmss':
                    return y + '. ' + M + '. ' + d + ' ' + h + m + s;
                case 'yyyy. MM. dd hh:mm':
                    return y + '. ' + M + '. ' + d + ' ' + h + ':' + m;
                case 'yyyy. MM. dd hh:mm:ss':
                    return y + '. ' + M + '. ' + d + ' ' + h + ':' + m + ':' + s;
                case 'yyyy MM dd hh':
                    return y + ' ' + M + ' ' + d + ' ' + h;
                case 'yyyy MM dd hhmm':
                    return y + ' ' + M + ' ' + d + ' ' + h + m;
                case 'yyyy MM dd hhmmss':
                    return y + ' ' + M + ' ' + d + ' ' + h + m + s;
                case 'yyyy MM dd hh:mm':
                    return y + ' ' + M + ' ' + d + ' ' + h + ':' + m;
                case 'yyyy MM dd hh:mm:ss':
                    return y + ' ' + M + ' ' + d + ' ' + h + ':' + m + ':' + s;
        
                case 'yyyyMMdd HH':
                    return y + M + d + ' ' + H;
                case 'yyyyMMdd HHmm':
                    return y + M + d + ' ' + H + m;
                case 'yyyyMMdd HHmmss':
                    return y + M + d + ' ' + H + m + s;
                case 'yyyyMMdd HH:mm':
                    return y + M + d + ' ' + H + ':' + m;
                case 'yyyyMMdd HH:mm:ss':
                    return y + M + d + ' ' + H + ':' + m + ':' + s;
                case 'yyyy-MM-dd HH':
                    return y + '-' + M + '-' + d + ' ' + H;
                case 'yyyy-MM-dd HHmm':
                    return y + '-' + M + '-' + d + ' ' + H + m;
                case 'yyyy-MM-dd HHmmss':
                    return y + '-' + M + '-' + d + ' ' + H + m + s;
                case 'yyyy-MM-dd HH:mm':
                    return y + '-' + M + '-' + d + ' ' + H + ':' + m;
                case 'yyyy-MM-dd HH:mm:ss':
                    return y + '-' + M + '-' + d + ' ' + H + ':' + m + ':' + s;
                case 'yyyy/MM/dd HH':
                    return y + '/' + M + '/' + d + ' ' + H;
                case 'yyyy/MM/dd HHmm':
                    return y + '/' + M + '/' + d + ' ' + H + m;
                case 'yyyy/MM/dd HHmmss':
                    return y + '/' + M + '/' + d + ' ' + H + m + s;
                case 'yyyy/MM/dd HH:mm':
                    return y + '/' + M + '/' + d + ' ' + H + ':' + m;
                case 'yyyy/MM/dd HH:mm:ss':
                    return y + '/' + M + '/' + d + ' ' + H + ':' + m + ':' + s;
                case 'yyyy. MM. dd HH':
                    return y + '. ' + M + '. ' + d + ' ' + H;
                case 'yyyy. MM. dd HHmm':
                    return y + '. ' + M + '. ' + d + ' ' + H + m;
                case 'yyyy. MM. dd HHmmss':
                    return y + '. ' + M + '. ' + d + ' ' + H + m + s;
                case 'yyyy. MM. dd HH:mm':
                    return y + '. ' + M + '. ' + d + ' ' + H + ':' + m;
                case 'yyyy. MM. dd HH:mm:ss':
                    return y + '. ' + M + '. ' + d + ' ' + H + ':' + m + ':' + s;
                case 'yyyy MM dd HH':
                    return y + ' ' + M + ' ' + d + ' ' + H;
                case 'yyyy MM dd HHmm':
                    return y + ' ' + M + ' ' + d + ' ' + H + m;
                case 'yyyy MM dd HHmmss':
                    return y + ' ' + M + ' ' + d + ' ' + H + m + s;
                case 'yyyy MM dd HH:mm':
                    return y + ' ' + M + ' ' + d + ' ' + H + ':' + m;
                case 'yyyy MM dd HH:mm:ss':
                    return y + ' ' + M + ' ' + d + ' ' + H + ':' + m + ':' + s;
        
                case 'MMyyyy':
                    return M + y;
                case 'MM-yyyy':
                    return M + '-' + y;
                case 'MM/yyyy':
                    return M + '/' + y;
                case 'MM. yyyy':
                    return M + '/' + y;
                case 'MM yyyy':
                    return M + '/' + y;
                case 'MMMM yyyy':
                    return MMMM + ' ' + y;
                case 'MMMM, yyyy':
                    return MMMM + ', ' + y;
                case 'MMM yyyy':
                    return MMM + ' ' + y;
                case 'MMM, yyyy':
                    return MMM + ', ' + y;
        
                case 'MMddyyyy':
                    return M + d + y;
                case 'MM-dd-yyyy':
                    return M + '-' + d + '-' + y;
                case 'MM/dd/yyyy':
                    return M + '/' + d + '/' + y;
                case 'MM. dd. yyyy':
                    return M + '. ' + d + '. ' + y;
                case 'MMMM dd yyyy':
                    return MMMM + ' ' + d + ' ' + y;
                case 'MMMM dd, yyyy':
                    return MMMM + ' ' + d + ', ' + y;
                case 'MMM dd yyyy':
                    return MMM + ' ' + d + ' ' + y;
                case 'MMM dd, yyyy':
                    return MMM + ' ' + d + ', ' + y;
        
                case 'MMddyyyy hh':
                    return M + d + y + ' ' + h;
                case 'MMddyyyy hhmm':
                    return M + d + y + ' ' + h + m;
                case 'MMddyyyy hhmmss':
                    return M + d + y + ' ' + h + m + s;
                case 'MMddyyyy hh:mm':
                    return M + d + y + ' ' + h + ':' + m;
                case 'MMddyyyy hh:mm:ss':
                    return M + d + y + ' ' + h + ':' + m + ':' + s;
                case 'MM-dd-yyyy hh':
                    return M + '-' + d + '-' + y + ' ' + h;
                case 'MM-dd-yyyy hhmm':
                    return M + '-' + d + '-' + y + ' ' + h + m;
                case 'MM-dd-yyyy hhmmss':
                    return M + '-' + d + '-' + y + ' ' + h + m + s;
                case 'MM-dd-yyyy hh:mm':
                    return M + '-' + d + '-' + y + ' ' + h + ':' + m;
                case 'MM-dd-yyyy hh:mm:ss':
                    return M + '-' + d + '-' + y + ' ' + h + ':' + m + ':' + s;
                case 'MM/dd/yyyy hh':
                    return M + '/' + d + '/' + y + ' ' + h;
                case 'MM/dd/yyyy hhmm':
                    return M + '/' + d + '/' + y + ' ' + h + m;
                case 'MM/dd/yyyy hhmmss':
                    return M + '/' + d + '/' + y + ' ' + h + m + s;
                case 'MM/dd/yyyy hh:mm':
                    return M + '/' + d + '/' + y + ' ' + h + ':' + m;
                case 'MM/dd/yyyy hh:mm:ss':
                    return M + '/' + d + '/' + y + ' ' + h + ':' + m + ':' + s;
                case 'MM. dd. yyyy hh':
                    return M + '. ' + d + '. ' + y + ' ' + h;
                case 'MM. dd. yyyy hhmm':
                    return M + '. ' + d + '. ' + y + ' ' + h + m;
                case 'MM. dd. yyyy hhmmss':
                    return M + '. ' + d + '. ' + y + ' ' + h + m + s;
                case 'MM. dd. yyyy hh:mm':
                    return M + '. ' + d + '. ' + y + ' ' + h + ':' + m;
                case 'MM. dd. yyyy hh:mm:ss':
                    return M + '. ' + d + '. ' + y + ' ' + h + ':' + m + ':' + s;
                case 'MMMM dd yyyy hh':
                    return MMMM + ' ' + d + ' ' + y + ' ' + h;
                case 'MMMM dd yyyy hhmm':
                    return MMMM + ' ' + d + ' ' + y + ' ' + h + m;
                case 'MMMM dd yyyy hhmmss':
                    return MMMM + ' ' + d + ' ' + y + ' ' + h + m + s;
                case 'MMMM dd yyyy hh:mm':
                    return MMMM + ' ' + d + ' ' + y + ' ' + h + ':' + m;
                case 'MMMM dd yyyy hh:mm:ss':
                    return MMMM + ' ' + d + ' ' + y + ' ' + h + ':' + m + ':' + s;
                case 'MMMM dd, yyyy hh':
                    return MMMM + ' ' + d + ', ' + y + ' ' + h;
                case 'MMMM dd, yyyy hhmm':
                    return MMMM + ' ' + d + ', ' + y + ' ' + h + m;
                case 'MMMM dd, yyyy hhmmss':
                    return MMMM + ' ' + d + ', ' + y + ' ' + h + m + s;
                case 'MMMM dd, yyyy hh:mm':
                    return MMMM + ' ' + d + ', ' + y + ' ' + h + ':' + m;
                case 'MMMM dd, yyyy hh:mm:ss':
                    return MMMM + ' ' + d + ', ' + y + ' ' + h + ':' + m + ':' + s;
                case 'MMM dd yyyy hh':
                    return MMM + ' ' + d + ' ' + y + ' ' + h;
                case 'MMM dd yyyy hhmm':
                    return MMM + ' ' + d + ' ' + y + ' ' + h + m;
                case 'MMM dd yyyy hhmmss':
                    return MMM + ' ' + d + ' ' + y + ' ' + h + m + s;
                case 'MMM dd yyyy hh:mm':
                    return MMM + ' ' + d + ' ' + y + ' ' + h + ':' + m;
                case 'MMM dd yyyy hh:mm:ss':
                    return MMM + ' ' + d + ' ' + y + ' ' + h + ':' + m + ':' + s;
                case 'MMM dd, yyyy hh':
                    return MMM + ' ' + d + ', ' + y + ' ' + h;
                case 'MMM dd, yyyy hhmm':
                    return MMM + ' ' + d + ', ' + y + ' ' + h + m;
                case 'MMM dd, yyyy hhmmss':
                    return MMM + ' ' + d + ', ' + y + ' ' + h + m + s;
                case 'MMM dd, yyyy hh:mm':
                    return MMM + ' ' + d + ', ' + y + ' ' + h + ':' + m;
                case 'MMM dd, yyyy hh:mm:ss':
                    return MMM + ' ' + d + ', ' + y + ' ' + h + ':' + m + ':' + s;

                case 'MMddyyyy HH':
                    return M + d + y + ' ' + H;
                case 'MMddyyyy HHmm':
                    return M + d + y + ' ' + H + m;
                case 'MMddyyyy HHmmss':
                    return M + d + y + ' ' + H + m + s;
                case 'MMddyyyy HH:mm':
                    return M + d + y + ' ' + H + ':' + m;
                case 'MMddyyyy HH:mm:ss':
                    return M + d + y + ' ' + H + ':' + m + ':' + s;
                case 'MM-dd-yyyy HH':
                    return M + '-' + d + '-' + y + ' ' + H;
                case 'MM-dd-yyyy HHmm':
                    return M + '-' + d + '-' + y + ' ' + H + m;
                case 'MM-dd-yyyy HHmmss':
                    return M + '-' + d + '-' + y + ' ' + H + m + s;
                case 'MM-dd-yyyy HH:mm':
                    return M + '-' + d + '-' + y + ' ' + H + ':' + m;
                case 'MM-dd-yyyy HH:mm:ss':
                    return M + '-' + d + '-' + y + ' ' + H + ':' + m + ':' + s;
                case 'MM/dd/yyyy HH':
                    return M + '/' + d + '/' + y + ' ' + H;
                case 'MM/dd/yyyy HHmm':
                    return M + '/' + d + '/' + y + ' ' + H + m;
                case 'MM/dd/yyyy HHmmss':
                    return M + '/' + d + '/' + y + ' ' + H + m + s;
                case 'MM/dd/yyyy HH:mm':
                    return M + '/' + d + '/' + y + ' ' + H + ':' + m;
                case 'MM/dd/yyyy HH:mm:ss':
                    return M + '/' + d + '/' + y + ' ' + H + ':' + m + ':' + s;
                case 'MM. dd. yyyy HH':
                    return M + '. ' + d + '. ' + y + ' ' + H;
                case 'MM. dd. yyyy HHmm':
                    return M + '. ' + d + '. ' + y + ' ' + H + m;
                case 'MM. dd. yyyy HHmmss':
                    return M + '. ' + d + '. ' + y + ' ' + H + m + s;
                case 'MM. dd. yyyy HH:mm':
                    return M + '. ' + d + '. ' + y + ' ' + H + ':' + m;
                case 'MM. dd. yyyy HH:mm:ss':
                    return M + '. ' + d + '. ' + y + ' ' + H + ':' + m + ':' + s;
                case 'MMMM dd yyyy HH':
                    return MMMM + ' ' + d + ' ' + y + ' ' + H;
                case 'MMMM dd yyyy HHmm':
                    return MMMM + ' ' + d + ' ' + y + ' ' + H + m;
                case 'MMMM dd yyyy HHmmss':
                    return MMMM + ' ' + d + ' ' + y + ' ' + H + m + s;
                case 'MMMM dd yyyy HH:mm':
                    return MMMM + ' ' + d + ' ' + y + ' ' + H + ':' + m;
                case 'MMMM dd yyyy HH:mm:ss':
                    return MMMM + ' ' + d + ' ' + y + ' ' + H + ':' + m + ':' + s;
                case 'MMMM dd, yyyy HH':
                    return MMMM + ' ' + d + ', ' + y + ' ' + H;
                case 'MMMM dd, yyyy HHmm':
                    return MMMM + ' ' + d + ', ' + y + ' ' + H + m;
                case 'MMMM dd, yyyy HHmmss':
                    return MMMM + ' ' + d + ', ' + y + ' ' + H + m + s;
                case 'MMMM dd, yyyy HH:mm':
                    return MMMM + ' ' + d + ', ' + y + ' ' + H + ':' + m;
                case 'MMMM dd, yyyy HH:mm:ss':
                    return MMMM + ' ' + d + ', ' + y + ' ' + H + ':' + m + ':' + s;
                case 'MMM dd yyyy HH':
                    return MMM + ' ' + d + ' ' + y + ' ' + H;
                case 'MMM dd yyyy HHmm':
                    return MMM + ' ' + d + ' ' + y + ' ' + H + m;
                case 'MMM dd yyyy HHmmss':
                    return MMM + ' ' + d + ' ' + y + ' ' + H + m + s;
                case 'MMM dd yyyy HH:mm':
                    return MMM + ' ' + d + ' ' + y + ' ' + H + ':' + m;
                case 'MMM dd yyyy HH:mm:ss':
                    return MMM + ' ' + d + ' ' + y + ' ' + H + ':' + m + ':' + s;
                case 'MMM dd, yyyy HH':
                    return MMM + ' ' + d + ', ' + y + ' ' + H;
                case 'MMM dd, yyyy HHmm':
                    return MMM + ' ' + d + ', ' + y + ' ' + H + m;
                case 'MMM dd, yyyy HHmmss':
                    return MMM + ' ' + d + ', ' + y + ' ' + H + m + s;
                case 'MMM dd, yyyy HH:mm':
                    return MMM + ' ' + d + ', ' + y + ' ' + H + ':' + m;
                case 'MMM dd, yyyy HH:mm:ss':
                    return MMM + ' ' + d + ', ' + y + ' ' + H + ':' + m + ':' + s;
        
                case 'ddMMyyyy':
                    return d + M + y;
                case 'dd-MM-yyyy':
                    return d + '-' + M + '-' + y;
                case 'dd/MM/yyyy':
                    return d + '/' + M + '/' + y;
                case 'dd. MM. yyyy':
                    return d + '. ' + M + '. ' + y;
                case 'dd MMMM yyyy':
                    return d + ' ' + MMMM + ' ' + y;
                case 'dd MMM yyyy':
                    return d + ' ' + MMM + ' ' + y;
        
                case 'ddMMyyyy hh':
                    return d + M + y + ' ' + h;
                case 'ddMMyyyy hhmm':
                    return d + M + y + ' ' + h + m;
                case 'ddMMyyyy hhmmss':
                    return d + M + y + ' ' + h + m + s;
                case 'ddMMyyyy hh:mm':
                    return d + M + y + ' ' + h + ':' + m;
                case 'ddMMyyyy hh:mm:ss':
                    return d + M + y + ' ' + h + ':' + m + ':' + s;
                case 'dd-MM-yyyy hh':
                    return d + '-' + M + '-' + y + ' ' + h;
                case 'dd-MM-yyyy hhmm':
                    return d + '-' + M + '-' + y + ' ' + h + m;
                case 'dd-MM-yyyy hhmmss':
                    return d + '-' + M + '-' + y + ' ' + h + m + s;
                case 'dd-MM-yyyy hh:mm':
                    return d + '-' + M + '-' + y + ' ' + h + ':' + m;
                case 'dd-MM-yyyy hh:mm:ss':
                    return d + '-' + M + '-' + y + ' ' + h + ':' + m + ':' + s;
                case 'dd/MM/yyyy hh':
                    return d + '/' + M + '/' + y + ' ' + h;
                case 'dd/MM/yyyy hhmm':
                    return d + '/' + M + '/' + y + ' ' + h + m;
                case 'dd/MM/yyyy hhmmss':
                    return d + '/' + M + '/' + y + ' ' + h + m + s;
                case 'dd/MM/yyyy hh:mm':
                    return d + '/' + M + '/' + y + ' ' + h + ':' + m;
                case 'dd/MM/yyyy hh:mm:ss':
                    return d + '/' + M + '/' + y + ' ' + h + ':' + m + ':' + s;
                case 'dd. MM. yyyy hh':
                    return d + '. ' + M + '. ' + y + ' ' + h;
                case 'dd. MM. yyyy hhmm':
                    return d + '. ' + M + '. ' + y + ' ' + h + m;
                case 'dd. MM. yyyy hhmmss':
                    return d + '. ' + M + '. ' + y + ' ' + h + m + s;
                case 'dd. MM. yyyy hh:mm':
                    return d + '. ' + M + '. ' + y + ' ' + h + ':' + m;
                case 'dd. MM. yyyy hh:mm:ss':
                    return d + '. ' + M + '. ' + y + ' ' + h + ':' + m + ':' + s;
                case 'dd MMMM yyyy hh':
                    return d + ' ' + MMMM + ' ' + y + ' ' + h;
                case 'dd MMMM yyyy hhmm':
                    return d + ' ' + MMMM + ' ' + y + ' ' + h + m;
                case 'dd MMMM yyyy hhmmss':
                    return d + ' ' + MMMM + ' ' + y + ' ' + h + m + s;
                case 'dd MMMM yyyy hh:mm':
                    return d + ' ' + MMMM + ' ' + y + ' ' + h + ':' + m;
                case 'dd MMMM yyyy hh:mm:ss':
                    return d + ' ' + MMMM + ' ' + y + ' ' + h + ':' + m + ':' + s;
                case 'dd MMM yyyy hh':
                    return d + ' ' + MMM + ' ' + y + ' ' + h;
                case 'dd MMM yyyy hhmm':
                    return d + ' ' + MMM + ' ' + y + ' ' + h + m;
                case 'dd MMM yyyy hhmmss':
                    return d + ' ' + MMM + ' ' + y + ' ' + h + m + s;
                case 'dd MMM yyyy hh:mm':
                    return d + ' ' + MMM + ' ' + y + ' ' + h + ':' + m;
                case 'dd MMM yyyy hh:mm:ss':
                    return d + ' ' + MMM + ' ' + y + ' ' + h + ':' + m + ':' + s;

                case 'ddMMyyyy HH':
                    return d + M + y + ' ' + H;
                case 'ddMMyyyy HHmm':
                    return d + M + y + ' ' + H + m;
                case 'ddMMyyyy HHmmss':
                    return d + M + y + ' ' + H + m + s;
                case 'ddMMyyyy HH:mm':
                    return d + M + y + ' ' + H + ':' + m;
                case 'ddMMyyyy HH:mm:ss':
                    return d + M + y + ' ' + H + ':' + m + ':' + s;
                case 'dd-MM-yyyy HH':
                    return d + '-' + M + '-' + y + ' ' + H;
                case 'dd-MM-yyyy HHmm':
                    return d + '-' + M + '-' + y + ' ' + H + m;
                case 'dd-MM-yyyy HHmmss':
                    return d + '-' + M + '-' + y + ' ' + H + m + s;
                case 'dd-MM-yyyy HH:mm':
                    return d + '-' + M + '-' + y + ' ' + H + ':' + m;
                case 'dd-MM-yyyy HH:mm:ss':
                    return d + '-' + M + '-' + y + ' ' + H + ':' + m + ':' + s;
                case 'dd/MM/yyyy HH':
                    return d + '/' + M + '/' + y + ' ' + H;
                case 'dd/MM/yyyy HHmm':
                    return d + '/' + M + '/' + y + ' ' + H + m;
                case 'dd/MM/yyyy HHmmss':
                    return d + '/' + M + '/' + y + ' ' + H + m + s;
                case 'dd/MM/yyyy HH:mm':
                    return d + '/' + M + '/' + y + ' ' + H + ':' + m;
                case 'dd/MM/yyyy HH:mm:ss':
                    return d + '/' + M + '/' + y + ' ' + H + ':' + m + ':' + s;
                case 'dd. MM. yyyy HH':
                    return d + '. ' + M + '. ' + y + ' ' + H;
                case 'dd. MM. yyyy HHmm':
                    return d + '. ' + M + '. ' + y + ' ' + H + m;
                case 'dd. MM. yyyy HHmmss':
                    return d + '. ' + M + '. ' + y + ' ' + H + m + s;
                case 'dd. MM. yyyy HH:mm':
                    return d + '. ' + M + '. ' + y + ' ' + H + ':' + m;
                case 'dd. MM. yyyy HH:mm:ss':
                    return d + '. ' + M + '. ' + y + ' ' + H + ':' + m + ':' + s;
                case 'dd MMMM yyyy HH':
                    return d + ' ' + MMMM + ' ' + y + ' ' + H;
                case 'dd MMMM yyyy HHmm':
                    return d + ' ' + MMMM + ' ' + y + ' ' + H + m;
                case 'dd MMMM yyyy HHmmss':
                    return d + ' ' + MMMM + ' ' + y + ' ' + H + m + s;
                case 'dd MMMM yyyy HH:mm':
                    return d + ' ' + MMMM + ' ' + y + ' ' + H + ':' + m;
                case 'dd MMMM yyyy HH:mm:ss':
                    return d + ' ' + MMMM + ' ' + y + ' ' + H + ':' + m + ':' + s;
                case 'dd MMM yyyy HH':
                    return d + ' ' + MMM + ' ' + y + ' ' + H;
                case 'dd MMM yyyy HHmm':
                    return d + ' ' + MMM + ' ' + y + ' ' + H + m;
                case 'dd MMM yyyy HHmmss':
                    return d + ' ' + MMM + ' ' + y + ' ' + H + m + s;
                case 'dd MMM yyyy HH:mm':
                    return d + ' ' + MMM + ' ' + y + ' ' + H + ':' + m;
                case 'dd MMM yyyy HH:mm:ss':
                    return d + ' ' + MMM + ' ' + y + ' ' + H + ':' + m + ':' + s;
                    
                case 'hhmm':
                    return h + m;
                case 'hh:mm':
                    return h + ':' + m;
                case 'HHmm':
                    return H + m;
                case 'HH:mm':
                    return H + ':' + m;
                case 'hhmmss':
                    return h + m + s;
                case 'hh:mm:ss':
                    return h + ':' + m + ':' + s;
                case 'HHmmss':
                    return H + m + s;
                case 'HH:mm:ss':
                    return H + ':' + m + ':' + s;
        
                default:
                    throw new Error(`ER0010 Invalid format.\n=>${JSON.stringify(format)}`);
            }
        },
        /**
         * Returns the day of the week for a given date.
         *
         * - Accepts a `DateObject` or a string representation of a date.
         * - Uses `CustomOption.dayOfWeekFormat` as the default format.
         * - Supports different formats for output:
         *   - `'d'` → Numeric day of the week (`0-6`, where `0 = Sunday`).
         *   - `'dy'` → Abbreviated English name (`"Sun", "Mon", ..., "Sat"`).
         *   - `'day'` → Full English name (`"Sunday", "Monday", ..., "Saturday"`).
         *   - `'kdy'` → Abbreviated Korean name (`"일", "월", ..., "토"`).
         *   - `'kday'` → Full Korean name (`"일요일", "월요일", ..., "토요일"`).
         * - Throws an error if the input date is invalid.
         *
         * @param date The date to evaluate.
         * @param dayType The format of the output (optional). Default: `'d'`
         * @returns The day of the week in the specified format.
         *
         * @throws Error if the provided date is invalid.
         *
         * @example
         * getDayOfWeek("2025-02-05", "d"); // "3" (Wednesday)
         * getDayOfWeek("2025-02-05", "dy"); // "Wed"
         * getDayOfWeek("2025-02-05", "day"); // "Wednesday"
         * getDayOfWeek("2025-02-05", "kdy"); // "수"
         * getDayOfWeek("2025-02-05", "kday"); // "수요일"
         */
        getDayOfWeek(date: DateObject | string, dayType: keyof typeof DayOfWeekFormat = customOption.utils.dayOfWeekFormat): string {
            const dateObj: DateObject = hisonCore.utils.isObject(date) ? date as DateObject : hisonCore.utils.getDateObject(date as string);
            if (!hisonCore.utils.isDate(dateObj)) throw new Error(`ER0011 Invalid format.\n=>${JSON.stringify(date)}`);
            if (dateObj.y === null || dateObj.M === null || dateObj.d === null) {
                throw new Error(`ER0011 Invalid format.\n=>${JSON.stringify(date)}`);
            }
            const d = new Date(dateObj.y, dateObj.M - 1, dateObj.d);
            const dayOfWeek = d.getDay();
            switch (dayType.toLowerCase()) {
                case 'd':
                    return dayOfWeek.toString();    //0 ~ 6
                case 'dy':
                    return DayOfWeekShortName[dayOfWeek];
                case 'day':
                    return DayOfWeekFullName[dayOfWeek];
                case 'kdy':
                    return DayOfWeekShortNameKR[dayOfWeek];
                case 'kday':
                    return DayOfWeekFullNameKR[dayOfWeek];
                default:
                    return dayOfWeek.toString();
            }
        },
        /**
         * Returns the last day of the month for a given date.
         *
         * - Accepts a `DateObject` or a string representation of a date.
         * - If the input is a `DateObject`, it uses the month and year from the object.
         * - If the input is a string, it assumes the first day of the given month unless a full date is provided.
         * - Determines the last day of the specified month by computing the last day of the next month minus one.
         * - Throws an error if the input date is invalid.
         *
         * @param date The date or month to evaluate.
         * @returns The last day of the month as a number.
         *
         * @throws Error if the provided date is invalid.
         *
         * @example
         * getLastDay("2025-02"); // 28 (for February 2025)
         * getLastDay("2024-02"); // 29 (leap year February)
         * getLastDay({ y: 2025, M: 5, d: 15 }); // 31 (May has 31 days)
         * getLastDay("2025-07-10"); // 31 (July has 31 days)
         */
        getLastDay(date: DateObject | string): number {
            let dateObj: DateObject;
            if (hisonCore.utils.isObject(date)) {
                dateObj = hisonCore.utils.deepCopyObject(date);
                dateObj.d = 1;
            }
            else {
                if ((date as string).includes('-')) {
                    date = date + '-01'
                }
                else if ((date as string).includes('/')) {
                    date = date + '/01'
                }
                else {
                    date = date + '01'
                }
                dateObj = hisonCore.utils.getDateObject(date);
            }
            if (!hisonCore.utils.isDate(dateObj)) throw new Error(`ER0012 Invalid format.\n=>${JSON.stringify(date)}`);
            if (dateObj.y === null || dateObj.M === null) {
                throw new Error(`ER0012 Invalid format.\n=>${JSON.stringify(date)}`);
            }
            const nextMonthFirstDay = new Date(dateObj.y, dateObj.M, 1);
            nextMonthFirstDay.setDate(0);
            return nextMonthFirstDay.getDate();
        },
        /**
         * Returns the current system year in the specified format.
         *
         * - Uses `CustomOption.yearFormat` as the default format.
         * - Supports the following formats:
         *   - `'yyyy'` → Full year (`"2025"`)
         *   - `'yy'` → Last two digits of the year (`"25"`)
         * - If an unsupported format is provided, it defaults to `'yyyy'`.
         *
         * @param format The desired output format (optional). Default: `'yyyy'`
         * @returns The current year as a string in the specified format.
         *
         * @example
         * getSysYear(); // "2025" (default format)
         * getSysYear("yyyy"); // "2025"
         * getSysYear("yy"); // "25"
         */
        getSysYear(format: keyof typeof YearFormat = customOption.utils.yearFormat): string {
            const currentDate = new Date();
            switch (format.toLowerCase()) {
                case 'yy':
                    return currentDate.getFullYear().toString().substring(2);
                default:
                    return currentDate.getFullYear().toString();
            }
        },
        /**
         * Returns the current system month in the specified format.
         *
         * - Uses `CustomOption.monthFormat` as the default format.
         * - Supports the following formats:
         *   - `'M'` → Numeric month without leading zero (`"2"` for February).
         *   - `'MM'` → Numeric month with leading zero (`"02"` for February).
         *   - `'MMMM'` → Full month name (`"February"`).
         *   - `'MMM'` → Abbreviated month name (`"Feb"`).
         * - If an unsupported format is provided, it defaults to `'M'`.
         *
         * @param format The desired output format (optional). Default: `'M'`
         * @returns The current month as a string in the specified format.
         *
         * @example
         * getSysMonth(); // "2" (default format for February)
         * getSysMonth("MM"); // "02"
         * getSysMonth("MMMM"); // "February"
         * getSysMonth("MMM"); // "Feb"
         */
        getSysMonth(format: keyof typeof MonthFormat = customOption.utils.monthFormat): string {
            const currentDate = new Date();
            const sysMonth = currentDate.getMonth() + 1;
            switch (format.toLowerCase()) {
                case 'mm':
                    return sysMonth.toString().padStart(2, '0');
                case 'mmmm':
                    return hisonCore.utils.getMonthName(sysMonth);
                case 'mmm':
                    return hisonCore.utils.getMonthName(sysMonth, false);
                default:
                    return sysMonth.toString();
            }
        },
        /**
         * Returns the current system year and month in the specified format.
         *
         * - Uses `CustomOption.yearMonthFormat` as the default format.
         * - Delegates formatting to `getDateWithFormat()` using the first day of the current month.
         * - Common formats include:
         *   - `'yyyy-MM'` → `"2025-02"`
         *   - `'yyyy/MM'` → `"2025/02"`
         *   - `'MMMM yyyy'` → `"February 2025"`
         *   - `'MMM yyyy'` → `"Feb 2025"`
         *
         * @param format The desired output format (optional). Default: `'yyyy-MM'`
         * @returns The current year and month as a formatted string.
         *
         * @example
         * getSysYearMonth(); // "2025-02" (default format for February 2025)
         * getSysYearMonth("yyyy/MM"); // "2025/02"
         * getSysYearMonth("MMMM yyyy"); // "February 2025"
         * getSysYearMonth("MMM yyyy"); // "Feb 2025"
         */
        getSysYearMonth(format: keyof typeof YearMonthFormat = customOption.utils.yearMonthFormat): string {
            const currentDate = new Date();
            return hisonCore.utils.getDateWithFormat( {y : currentDate.getFullYear(), M : currentDate.getMonth() + 1, d : 1 }, format);
        },
        /**
         * Returns the current system day of the month in the specified format.
         *
         * - Uses `CustomOption.dayFormat` as the default format.
         * - Supports the following formats:
         *   - `'d'` → Day without leading zero (`"5"` for the 5th day of the month).
         *   - `'dd'` → Day with leading zero (`"05"` for the 5th day of the month).
         * - If an unsupported format is provided, it defaults to `'d'`.
         *
         * @param format The desired output format (optional). Default: `'d'`
         * @returns The current day of the month as a string in the specified format.
         *
         * @example
         * getSysDay(); // "5" (default format for the 5th day)
         * getSysDay("dd"); // "05"
         */
        getSysDay(format: keyof typeof DayFormat = customOption.utils.dayFormat): string {
            const currentDate = new Date();
            switch (format.toLowerCase()) {
                case 'dd':
                    return currentDate.getDate().toString().padStart(2, '0');
                default:
                    return currentDate.getDate().toString();
            }
        },
        /**
         * Returns the current system day of the week in the specified format.
         *
         * - Uses `CustomOption.dayOfWeekFormat` as the default format.
         * - Delegates formatting to `getDayOfWeek()`, which supports:
         *   - `'d'` → Numeric day of the week (`0-6`, where `0 = Sunday`).
         *   - `'dy'` → Abbreviated English name (`"Sun", "Mon", ..., "Sat"`).
         *   - `'day'` → Full English name (`"Sunday", "Monday", ..., "Saturday"`).
         *   - `'kdy'` → Abbreviated Korean name (`"일", "월", ..., "토"`).
         *   - `'kday'` → Full Korean name (`"일요일", "월요일", ..., "토요일"`).
         *
         * @param format The desired output format (optional). Default: `'d'`
         * @returns The current day of the week in the specified format.
         *
         * @example
         * getSysDayOfWeek(); // "3" (default format, Wednesday)
         * getSysDayOfWeek("dy"); // "Wed"
         * getSysDayOfWeek("day"); // "Wednesday"
         * getSysDayOfWeek("kdy"); // "수"
         * getSysDayOfWeek("kday"); // "수요일"
         */
        getSysDayOfWeek(format: keyof typeof DayOfWeekFormat = customOption.utils.dayOfWeekFormat): string {
            const currentDate = new Date();
            return hisonCore.utils.getDayOfWeek({ y : currentDate.getFullYear(), M : currentDate.getMonth() + 1, d : currentDate.getDate()}, format);
        },
        /**
         * Returns the current system hour in 24-hour format, optionally formatted with leading zero.
         *
         * ### Behavior
         * - Retrieves the hour part of the system time using 24-hour convention (0–23).
         * - Formatting depends on the provided `format` parameter:
         *   - `'h'`  → Hour without leading zero (e.g., `"5"` for 5 AM, `"13"` for 1 PM).
         *   - `'hh'` → Hour with leading zero if necessary (e.g., `"05"` for 5 AM, `"13"` for 1 PM).
         * - If the provided `format` is not supported, it defaults to `'h'` behavior.
         *
         * ### Format Source
         * - If `format` is omitted, it uses the default value from `customOption.utils.hourFormat`.
         *
         * ### Important Notes
         * - This method **does not** convert the hour to 12-hour (AM/PM) format.
         * - Always based on **24-hour system** (`0–23`).
         *
         * @param format The desired hour format. Either `'h'` or `'hh'`. Defaults to `'h'`.
         * @returns The current hour as a string formatted according to the specified format.
         *
         * @example
         * getSysHour();         // "5"  (default 'h' format)
         * getSysHour("hh");      // "05" (leading zero)
         * getSysHour("h");       // "5"  (no leading zero)
         * getSysHour("hh");      // "13" (for 1 PM)
         */
        getSysHour(format: keyof typeof HourFormat = customOption.utils.hourFormat): string {
            const currentDate = new Date();
            switch (format.toLowerCase()) {
                case 'hh':
                    return currentDate.getHours().toString().padStart(2, '0');
                default:
                    return currentDate.getHours().toString();
            }
        },
        /**
         * Returns the current system hour and minute in the specified format.
         *
         * - Uses `CustomOption.hourMinuteFormat` as the default format.
         * - Supports the following formats:
         *   - `'hhmm'` → Compact format without separators (`"1430"` for 2:30 PM).
         *   - `'hh:mm'` → Standard format with a colon separator (`"14:30"` for 2:30 PM).
         * - If an unsupported format is provided, it defaults to `'hh:mm'`.
         *
         * @param format The desired output format (optional). Default: `'hh:mm'`
         * @returns The current hour and minute as a string in the specified format.
         *
         * @example
         * getSysHourMinute(); // "14:30" (default format)
         * getSysHourMinute("hhmm"); // "1430"
         */
        getSysHourMinute(format: keyof typeof HourMinuteFormat = customOption.utils.hourMinuteFormat): string {
            const currentDate = new Date();
            switch (format.toLowerCase()) {
                case 'hhmm':
                    return currentDate.getHours().toString().padStart(2, '0') + '' + currentDate.getMinutes().toString().padStart(2, '0');
                default:
                    return currentDate.getHours().toString().padStart(2, '0') + ':' + currentDate.getMinutes().toString().padStart(2, '0');
            }
        },
        /**
         * Returns the current system minute in the specified format.
         *
         * - Uses `CustomOption.minuteFormat` as the default format.
         * - Supports the following formats:
         *   - `'m'` → Minute without leading zero (`"5"` for the 5th minute).
         *   - `'mm'` → Minute with leading zero (`"05"` for the 5th minute).
         * - If an unsupported format is provided, it defaults to `'m'`.
         *
         * @param format The desired output format (optional). Default: `'m'`
         * @returns The current minute as a string in the specified format.
         *
         * @example
         * getSysMinute(); // "5" (default format)
         * getSysMinute("mm"); // "05"
         */
        getSysMinute(format: keyof typeof MinuteFormat = customOption.utils.minuteFormat): string {
            const currentDate = new Date();
            switch (format.toLowerCase()) {
                case 'mm':
                    return currentDate.getMinutes().toString().padStart(2, '0');
                default:
                    return currentDate.getMinutes().toString();
            }
        },
        /**
         * Returns the current system second in the specified format.
         *
         * - Uses `CustomOption.secondFormat` as the default format.
         * - Supports the following formats:
         *   - `'s'` → Second without leading zero (`"5"` for the 5th second).
         *   - `'ss'` → Second with leading zero (`"05"` for the 5th second).
         * - If an unsupported format is provided, it defaults to `'s'`.
         *
         * @param format The desired output format (optional). Default: `'s'`
         * @returns The current second as a string in the specified format.
         *
         * @example
         * getSysSecond(); // "5" (default format)
         * getSysSecond("ss"); // "05"
         */
        getSysSecond(format: keyof typeof SecondFormat = customOption.utils.secondFormat): string {
            const currentDate = new Date();
            switch (format.toLowerCase()) {
                case 'ss':
                    return currentDate.getSeconds().toString().padStart(2, '0');
                default:
                    return currentDate.getSeconds().toString();
            }
        },
        /**
         * Returns the current system time in the specified format.
         *
         * - Uses `CustomOption.timeFormat` as the default format.
         * - Supports the following formats:
         *   - `'hhmmss'` → Compact format without separators (`"143015"` for 2:30:15 PM).
         *   - `'hh:mm:ss'` → Standard format with colons (`"14:30:15"` for 2:30:15 PM).
         * - If an unsupported format is provided, it defaults to `'hh:mm:ss'`.
         *
         * @param format The desired output format (optional). Default: `'hh:mm:ss'`
         * @returns The current time as a string in the specified format.
         *
         * @example
         * getSysTime(); // "14:30:15" (default format)
         * getSysTime("hhmmss"); // "143015"
         */
        getSysTime(format: keyof typeof TimeFormat = customOption.utils.timeFormat): string {
            const currentDate = new Date();
            switch (format.toLowerCase()) {
                case 'hhmmss':
                    return currentDate.getHours().toString().padStart(2, '0') + currentDate.getMinutes().toString().padStart(2, '0') + currentDate.getSeconds().toString().padStart(2, '0');
                default:
                    return currentDate.getHours().toString().padStart(2, '0') + ':' + currentDate.getMinutes().toString().padStart(2, '0') + ':' + currentDate.getSeconds().toString().padStart(2, '0');
            }
        },
        /**
         * Returns the current system date and time in the specified format.
         *
         * - Uses `CustomOption.datetimeFormat` as the default format.
         * - Delegates formatting to `getDateWithFormat()`, which supports various formats, including:
         *   - `'yyyy-MM-dd hh:mm:ss'` → `"2025-02-05 14:30:15"`
         *   - `'yyyy/MM/dd'` → `"2025/02/05"`
         *   - `'MMMM dd, yyyy'` → `"February 5, 2025"`
         * - If no format is specified, it defaults to the full datetime format.
         *
         * @param format The desired output format (optional). Default: `'yyyy-MM-dd hh:mm:ss'`
         * @returns The current date and time as a formatted string.
         *
         * @example
         * getSysDate(); // "2025-02-05 14:30:15" (default format)
         * getSysDate("yyyy/MM/dd"); // "2025/02/05"
         * getSysDate("MMMM dd, yyyy"); // "February 5, 2025"
         */
        getSysDate(format: keyof typeof AllDateTimeFormat = customOption.utils.datetimeFormat): string {
            const currentDate = new Date();
            return hisonCore.utils.getDateWithFormat(
                {
                    y:currentDate.getFullYear(),
                    M:currentDate.getMonth() + 1,
                    d:currentDate.getDate(),
                    h:currentDate.getHours(),
                    m:currentDate.getMinutes(),
                    s:currentDate.getSeconds(),
                }
                , format);
        },
        /**
         * Rounds a number up to the nearest integer or specified decimal place.
         *
         * - If `precision` is `0`, it rounds up to the nearest whole number.
         * - If `precision` is greater than `0`, it rounds up to the specified number of decimal places.
         * - If `precision` is less than `0`, it rounds up to the nearest multiple of `10^precision`.
         *
         * @param num The number to be rounded up.
         * @param precision The number of decimal places to retain (default: `0`).
         * @returns The rounded-up number.
         *
         * @example
         * getCeil(12.34); // 13
         * getCeil(12.34, 1); // 12.4
         * getCeil(12.34, 2); // 12.34
         * getCeil(1250, -2); // 1300
         */
        getCeil(num: number, precision: number = 0): number {
            num = hisonCore.utils.getToNumber(num);
            precision = Math.trunc(hisonCore.utils.getToNumber(precision));
            const factor = Math.pow(10, precision);
            return Math.ceil(num * factor) / factor;
        },
        /**
         * Rounds a number down to the nearest integer or specified decimal place.
         *
         * - If `precision` is `0`, it rounds down to the nearest whole number.
         * - If `precision` is greater than `0`, it rounds down to the specified number of decimal places.
         * - If `precision` is less than `0`, it rounds down to the nearest multiple of `10^precision`.
         *
         * @param num The number to be rounded down.
         * @param precision The number of decimal places to retain (default: `0`).
         * @returns The rounded-down number.
         *
         * @example
         * getFloor(12.89); // 12
         * getFloor(12.89, 1); // 12.8
         * getFloor(12.89, 2); // 12.89
         * getFloor(1299, -2); // 1200
         */
        getFloor(num: number, precision: number = 0): number {
            num = hisonCore.utils.getToNumber(num);
            precision = Math.trunc(hisonCore.utils.getToNumber(precision));
            const factor = Math.pow(10, precision);
            return Math.floor(num * factor) / factor;
        },
        /**
         * Rounds a number to the nearest integer or specified decimal place.
         *
         * - If `precision` is `0`, it rounds to the nearest whole number.
         * - If `precision` is greater than `0`, it rounds to the specified number of decimal places.
         * - If `precision` is less than `0`, it rounds to the nearest multiple of `10^precision`.
         *
         * @param num The number to be rounded.
         * @param precision The number of decimal places to retain (default: `0`).
         * @returns The rounded number.
         *
         * @example
         * getRound(12.49); // 12
         * getRound(12.5); // 13
         * getRound(12.345, 2); // 12.35
         * getRound(1250, -2); // 1300
         */
        getRound(num: number, precision: number = 0): number {
            num = hisonCore.utils.getToNumber(num);
            precision = Math.trunc(hisonCore.utils.getToNumber(precision));
            const factor = Math.pow(10, precision);
            return Math.round(num * factor) / factor;
        },
        /**
         * Truncates a number to the specified decimal place without rounding.
         *
         * - If `precision` is `0`, it removes the decimal part, keeping only the integer.
         * - If `precision` is greater than `0`, it truncates the number at the specified decimal places.
         * - If `precision` is less than `0`, it truncates to the nearest multiple of `10^precision`.
         *
         * @param num The number to be truncated.
         * @param precision The number of decimal places to retain (default: `0`).
         * @returns The truncated number.
         *
         * @example
         * getTrunc(12.89); // 12
         * getTrunc(12.89, 1); // 12.8
         * getTrunc(12.89, 2); // 12.89
         * getTrunc(1299, -2); // 1200
         */
        getTrunc(num: number, precision: number = 0): number {
            num = hisonCore.utils.getToNumber(num);
            precision = Math.trunc(hisonCore.utils.getToNumber(precision));
            const factor = Math.pow(10, precision);
            return Math.trunc(num * factor) / factor;
        },
        /**
         * Calculates the byte length of a given string based on character encoding.
         *
         * - Uses UTF-8 encoding rules to determine the byte size of each character.
         * - Character byte sizes are determined as follows:
         *   - `charCode <= 0x7F` → 1 byte (ASCII characters).
         *   - `charCode <= 0x7FF` → `CustomOption.LESSOREQ_0X7FF_BYTE` bytes. Default: 2
         *   - `charCode <= 0xFFFF` → `CustomOption.LESSOREQ_0XFFFF_BYTE` bytes. Default: 3
         *   - `charCode > 0xFFFF` → `CustomOption.GREATER_0XFFFF_BYTE` bytes. Default: 4
         *
         * @param str The input string.
         * @returns The total byte length of the string.
         *
         * @example
         * getByteLength("Hello"); // 5 (each ASCII character is 1 byte)
         * getByteLength("안녕하세요"); // 15 (each Korean character is 3 bytes)
         * getByteLength("𐍈"); // 4 (UTF-16 surrogate pair)
         */
        getByteLength(str: string): number {
            str = hisonCore.utils.getToString(str);
            let byteLength = 0;
            for (let i = 0; i < str.length; i++) {
                const charCode = str.charCodeAt(i);
                if (charCode <= 0x7F) {
                    byteLength += 1;
                } else if (charCode <= 0x7FF) {
                    byteLength += customOption.utils.LESSOREQ_0X7FF_BYTE;
                } else if (charCode <= 0xFFFF) {
                    byteLength += customOption.utils.LESSOREQ_0XFFFF_BYTE;
                } else {
                    byteLength += customOption.utils.GREATER_0XFFFF_BYTE;
                }
            }
            return byteLength;
        },
        /**
         * Truncates a string to fit within a specified byte length.
         *
         * - Uses UTF-8 encoding rules to calculate byte size.
         * - Truncates the string at the point where the total byte length exceeds `cutByte`.
         * - Character byte sizes are determined as follows:
         *   - `charCode <= 0x7F` → 1 byte (ASCII characters).
         *   - `charCode <= 0x7FF` → `CustomOption.LESSOREQ_0X7FF_BYTE` bytes.
         *   - `charCode <= 0xFFFF` → `CustomOption.LESSOREQ_0XFFFF_BYTE` bytes.
         *   - `charCode > 0xFFFF` → `CustomOption.GREATER_0XFFFF_BYTE` bytes.
         *
         * @param str The input string to be truncated.
         * @param cutByte The maximum allowed byte length.
         * @returns The truncated string that fits within the given byte length.
         *
         * @example
         * getCutByteLength("Hello, World!", 5); // "Hello"
         * getCutByteLength("안녕하세요", 6); // "안녕" (each Korean character is 3 bytes)
         * getCutByteLength("𐍈𐍈𐍈", 4); // "𐍈" (each surrogate pair character is 4 bytes)
         */
        getCutByteLength(str: string, cutByte: number): string {
            str = hisonCore.utils.getToString(str);
            cutByte = hisonCore.utils.getToNumber(cutByte);
            let byteLength = 0;
            let cutIndex = str.length;
            for (let i = 0; i < str.length; i++) {
                const charCode = str.charCodeAt(i);
                if (charCode <= 0x7F) {
                    byteLength += 1;
                } else if (charCode <= 0x7FF) {
                    byteLength += customOption.utils.LESSOREQ_0X7FF_BYTE;
                } else if (charCode <= 0xFFFF) {
                    byteLength += customOption.utils.LESSOREQ_0XFFFF_BYTE;
                } else {
                    byteLength += customOption.utils.GREATER_0XFFFF_BYTE;
                }
                if (byteLength > cutByte) {
                    cutIndex = i;
                    break;
                }
            }
            return str.substring(0, cutIndex);
        },
        /**
         * Adjusts a string to fit a specified length by evenly distributing spaces between characters.
         *
         * - If the string's length is already greater than or equal to `length`, it is returned as is.
         * - Spaces are distributed as evenly as possible between characters to reach the desired length.
         * - If the spacing is not evenly divisible, extra spaces are added starting from the left.
         *
         * @param str The input string.
         * @param length The target total length of the formatted string.
         * @returns A string with evenly distributed spaces to match the specified length.
         *
         * @example
         * getStringLenForm("Hi", 5); // "H  i"
         * getStringLenForm("Hello", 10); // "H  e  l  l  o"
         * getStringLenForm("A", 3); // "A  "
         */
        getStringLenForm(str: string, length: number): string {
            str = hisonCore.utils.getToString(str);
            length = hisonCore.utils.getToNumber(length);
            const strLength = str.length;
            if (strLength >= length) {
                return str;
            }
            const totalSpaces = length - strLength;
            const gaps = strLength - 1;
            const spacePerGap = Math.floor(totalSpaces / gaps);
            const extraSpaces = totalSpaces % gaps;
            let result = '';
            for (let i = 0; i < gaps; i++) {
                result += str[i];
                result += ' '.repeat(spacePerGap + (i < extraSpaces ? 1 : 0));
            }
            result += str[strLength - 1];
            return result;
        },
        /**
         * Left-pads a string with a specified padding string until it reaches the desired length.
         *
         * - If the original string's length is already greater than or equal to `length`, it is returned as is.
         * - The `padStr` is repeated as needed to fill the remaining space.
         * - If `padStr` does not evenly divide into the required padding length, it may be truncated.
         *
         * @param str The original string.
         * @param padStr The string used for padding.
         * @param length The desired total length of the padded string.
         * @returns The left-padded string.
         *
         * @example
         * getLpad("123", "0", 5); // "00123"
         * getLpad("abc", "-", 6); // "---abc"
         * getLpad("test", "XY", 10); // "XYXYXYtest"
         */
        getLpad(str: string, padStr: string, length: number): string {
            str = hisonCore.utils.getToString(str);
            padStr = hisonCore.utils.getToString(padStr);
            length = hisonCore.utils.getToNumber(length);
            if (str.length >= length) return str.slice(-length);
            const pad = padStr.repeat((length - str.length) / padStr.length);
            return pad + str;
        },
        /**
         * Right-pads a string with a specified padding string until it reaches the desired length.
         *
         * - If the original string's length is already greater than or equal to `length`, it is truncated to fit.
         * - The `padStr` is repeated as needed to fill the remaining space.
         * - If `padStr` does not evenly divide into the required padding length, it may be truncated.
         *
         * @param str The original string.
         * @param padStr The string used for padding.
         * @param length The desired total length of the padded string.
         * @returns The right-padded string.
         *
         * @example
         * getRpad("123", "0", 5); // "12300"
         * getRpad("abc", "-", 6); // "abc---"
         * getRpad("test", "XY", 10); // "testXYXYXY"
         */
        getRpad(str: string, padStr: string, length: number): string {
            str = hisonCore.utils.getToString(str);
            padStr = hisonCore.utils.getToString(padStr);
            length = hisonCore.utils.getToNumber(length);
            if (str.length >= length) return str.substring(0, length);
            const pad = padStr.repeat((length - str.length) / padStr.length);
            return str + pad;
        },
        /**
         * Removes leading and trailing whitespace from a string.
         *
         * - Converts the input to a string if it is not already.
         * - Uses JavaScript's built-in `trim()` method to remove whitespace.
         *
         * @param str The input string.
         * @returns The trimmed string without leading or trailing spaces.
         *
         * @example
         * getTrim("  Hello World  "); // "Hello World"
         * getTrim("\tTest String\n"); // "Test String"
         * getTrim("   "); // "" (empty string)
         */
        getTrim(str: string): string {
            str = hisonCore.utils.getToString(str);
            return str.trim();
        },
        /**
         * Replaces all occurrences of a target substring within a string with a specified replacement.
         *
         * - Converts all inputs to strings before processing.
         * - Uses `split()` and `join()` to replace all instances of `targetStr` with `replaceStr`.
         * - If `replaceStr` is not provided, occurrences of `targetStr` are removed.
         *
         * @param str The original string.
         * @param targetStr The substring to be replaced.
         * @param replaceStr The string to replace occurrences of `targetStr` (default: `''`).
         * @returns A new string with all occurrences of `targetStr` replaced.
         *
         * @example
         * getReplaceAll("hello world", "o", "O"); // "hellO wOrld"
         * getReplaceAll("banana", "a", ""); // "bnn"
         * getReplaceAll("2025-02-05", "-", "/"); // "2025/02/05"
         */
        getReplaceAll(str: string, targetStr: string, replaceStr: string = ''): string {
            str = hisonCore.utils.getToString(str);
            targetStr = hisonCore.utils.getToString(targetStr);
            replaceStr = hisonCore.utils.getToString(replaceStr);
            return str.split(targetStr).join(replaceStr);
        },
        /**
         * Formats a number according to a specified format pattern.
         *
         * - Uses `CustomOption.numberFormat` as the default format if none is provided.
         * - Supports various number formatting patterns, including:
         *   - `"#,###"` → `"1,234"`, '' (comma-separated thousands).
         *   - `"#,##0"` → `"1,234"`, '0' (ensures at least one digit).
         *   - `"#"` → `"1234"`, ''
         *   - `"0"` → `"1234"`, '0'
         *   - `".##"` → `"0.1"` (no grouping).
         *   - `".00"` → `"0.10"` (ensures at least one digit).
         * - Supports decimal formatting and percentage notation (`"%"`).
         * - Throws an error if the input is not a valid number or if the format is invalid.
         *
         * @param value The number to format.
         * @param format The desired format pattern (optional). Default: `'#,##0.##'`
         * @returns The formatted number as a string.
         *
         * @throws Error if the input value is not numeric or the format is invalid.
         *
         * @example
         * getNumberFormat(1234); // "1,234" (default format)
         * getNumberFormat(1234.5678, "#,###.00"); // "1,234.56"
         * getNumberFormat(0.25, "#,##0%"); // "25%" (percentage conversion)
         * getNumberFormat(-1234, "#,###"); // "-1,234"
         */
        getNumberFormat(value: number, format?: string): string {
            value = hisonCore.utils.getToNumber(value);
            format = hisonCore.utils.getToString(format);
    
            const oriValue = value;
            if (!hisonCore.utils.isNumeric(value)) {
                throw new Error(`ER0021 Invalid number\n=>${JSON.stringify(oriValue)}`);
            }
            format = format ? format : customOption.utils.numberFormat;
            const regex = /^(.*?)([#0,.]+)(.*?)$/;
            const matches = format.match(regex);
    
            if (!matches) {
                throw new Error(`ER0022 Invalid format\n=>${JSON.stringify(format)}`);
            }
    
            const prefix = matches[1];
            const numberFormat = matches[2];
            const suffix = matches[3];
            const intergerFormat = numberFormat.split('.')[0];
            const decimalFormat = numberFormat.split('.').length > 1 ? numberFormat.split('.')[1] : '';
    
            if (suffix === '%' || suffix === ' %') value = value * 100;
    
            let numStr = hisonCore.utils.getToString(value);
            const isNegative = numStr[0] === '-';
            numStr = isNegative ? numStr.substring(1) : numStr;
            let interger = numStr.split('.')[0];
            let decimal = numStr.split('.').length > 1 ? numStr.split('.')[1] : '';
            
            let result: string;
    
            decimal = hisonCore.utils.getToFloat('0.' + decimal)
                    .toLocaleString('en',{
                        minimumFractionDigits: decimalFormat.lastIndexOf('0') + 1,
                        maximumFractionDigits: decimalFormat.length
                        });
            if (decimal === '0') decimal = '';
            else decimal = decimal.substring(1);
    
            switch (intergerFormat) {
                case '#,###':
                    if (hisonCore.utils.getToNumber(interger) === 0) {
                        result = decimal;
                    }
                    else {
                        interger = hisonCore.utils.getToFloat(interger).toLocaleString('en');
                        result = interger + decimal;
                    }
                    break;
                case '#,##0':
                    interger = hisonCore.utils.getToFloat(interger).toLocaleString('en');
                    result = interger + decimal;
                    break;
                case '#':
                    if (hisonCore.utils.getToNumber(interger) === 0) {
                        result = decimal;
                    }
                    else {
                        result = interger + decimal;
                    }
                    break;
                case '0':
                    result = interger + decimal;
                    break;
                default:
                    throw new Error(`ER0023 Invalid format\n=>${JSON.stringify(format)}`);
            }
            result = isNegative ? '-' + result : result;
            return prefix + result + suffix;
        },
        /**
         * Removes all non-numeric characters from a string, leaving only digits.
         *
         * - Converts the input to a string if it is not already.
         * - Uses a regular expression to remove any character that is not a digit (`0-9`).
         *
         * @param str The input string.
         * @returns A new string containing only numeric characters.
         *
         * @example
         * getRemoveExceptNumbers("abc123def456"); // "123456"
         * getRemoveExceptNumbers("Phone: (555) 123-4567"); // "5551234567"
         * getRemoveExceptNumbers("No numbers here!"); // ""
         */
        getRemoveExceptNumbers(str: string): string {
            str = hisonCore.utils.getToString(str);
            return str.replace(/[^0-9]/g, '');
        },
        /**
         * Removes all numeric characters from a string, leaving only non-numeric characters.
         *
         * - Converts the input to a string if it is not already.
         * - Uses a regular expression to remove any digit (`0-9`).
         *
         * @param str The input string.
         * @returns A new string containing only non-numeric characters.
         *
         * @example
         * getRemoveNumbers("abc123def456"); // "abcdef"
         * getRemoveNumbers("Phone: (555) 123-4567"); // "Phone: () -"
         * getRemoveNumbers("123456"); // "" (all numbers removed)
         */
        getRemoveNumbers(str: string): string {
            str = hisonCore.utils.getToString(str);
            return str.replace(/[0-9]/g, '');
        },
        /**
         * Reverses the characters in a given string.
         *
         * - Converts the input to a string if it is not already.
         * - Splits the string into an array of characters, reverses the order, and joins them back.
         *
         * @param str The input string.
         * @returns The reversed string.
         *
         * @example
         * getReverse("hello"); // "olleh"
         * getReverse("12345"); // "54321"
         * getReverse("A B C"); // "C B A"
         */
        getReverse(str: string): string {
            str = hisonCore.utils.getToString(str);
            return str.split('').reverse().join('');
        },
        /**
         * Converts the given value to a boolean.
         *
         * - Numeric values: `0` is `false`, any other number is `true`.
         * - Boolean values: Returned as is.
         * - String values: Returns `true` if the string matches predefined truthy values (`"true"`, `"yes"`, `"checked"`, etc.).
         * - Other types: Returns `false`.
         *
         * @param value The value to be converted.
         * @returns `true` if the value represents a truthy value, otherwise `false`.
         *
         * @example
         * getToBoolean(1); // true
         * getToBoolean(0); // false
         * getToBoolean("yes"); // true
         * getToBoolean("false"); // false
         * getToBoolean(true); // true
         * getToBoolean(null); // false
         */
        getToBoolean(value: any): boolean {
            if (hisonCore.utils.isNumeric(value)) {
                return Number(value) != 0;
            }
            else if (typeof value === 'boolean'){
                return value
            }
            else if (typeof value === 'string'){
                return ['t','true','y','yes','check','c','checked','selected','참'].indexOf(value.toLowerCase()) >= 0;
            }
            else {
                return false;
            }
        },
        /**
         * Converts the given value to a number.
         *
         * - If the value is numeric, it is returned as a number.
         * - If the value is not a valid number, `impossibleValue` is returned instead.
         *
         * @param value The value to be converted.
         * @param impossibleValue The fallback value if conversion fails (default: `0`).
         * @returns The numeric representation of the value, or `impossibleValue` if conversion fails.
         *
         * @example
         * getToNumber("123"); // 123
         * getToNumber("12.34"); // 12.34
         * getToNumber("abc", -1); // -1 (fallback value)
         * getToNumber(null, 100); // 100 (fallback value)
         */
        getToNumber(value: any, impossibleValue: number = 0): number {
            return hisonCore.utils.getToFloat(value, impossibleValue);
        },
        /**
         * Converts the given value to a floating-point number.
         *
         * - If the value is numeric, it is converted to a float and returned.
         * - If the value is not a valid number, `impossibleValue` is returned instead.
         *
         * @param value The value to be converted.
         * @param impossibleValue The fallback value if conversion fails (default: `0`).
         * @returns The floating-point representation of the value, or `impossibleValue` if conversion fails.
         *
         * @example
         * getToFloat("123.45"); // 123.45
         * getToFloat(42); // 42
         * getToFloat("abc", -1); // -1 (fallback value)
         * getToFloat(null, 100.5); // 100.5 (fallback value)
         */
        getToFloat(value: any, impossibleValue: number = 0): number {
            if (!hisonCore.utils.isNumeric(value)) {
                return impossibleValue;
            }
            return parseFloat(value);
        },
        /**
         * Converts the given value to an integer.
         *
         * - If the value is numeric, it is converted to an integer using `Math.trunc()`.
         * - If the value is not a valid number, `impossibleValue` is returned instead.
         *
         * @param value The value to be converted.
         * @param impossibleValue The fallback value if conversion fails (default: `0`).
         * @returns The integer representation of the value, or `impossibleValue` if conversion fails.
         *
         * @example
         * getToInteger("123.45"); // 123
         * getToInteger(42.9); // 42
         * getToInteger("abc", -1); // -1 (fallback value)
         * getToInteger(null, 100); // 100 (fallback value)
         */
        getToInteger(value: any, impossibleValue: number = 0): number {
            if (!hisonCore.utils.isNumeric(value)) {
                return Math.trunc(impossibleValue);
            }
            return Math.trunc(parseInt(value, 10));
        },
        /**
         * Converts the given value to a string.
         *
         * - If the value is already a string, it is returned as is.
         * - If the value is a number, boolean, or bigint, it is converted to a string.
         * - If the value is a symbol, its description is returned.
         * - If the value is `null`, `undefined`, or an unsupported type, `impossibleValue` is returned.
         *
         * @param str The value to be converted.
         * @param impossibleValue The fallback value if conversion fails (default: `""`).
         * @returns The string representation of the value, or `impossibleValue` if conversion fails.
         *
         * @example
         * getToString(123); // "123"
         * getToString(true); // "true"
         * getToString(Symbol("test")); // "test"
         * getToString(null, "N/A"); // "N/A" (fallback value)
         */
        getToString(str: any, impossibleValue: string = ''): string {
            if (typeof str === 'string') {
            } else if (typeof str === 'number' || typeof str === 'boolean' || typeof str === 'bigint') {
                str = String(str);
            } else if (typeof str === 'symbol') {
                str = (str as Symbol).description;
            } else {
                str = impossibleValue;
            }
            return str;
        },
        //etc
        /**
         * Returns a default value if the given value is `null` or `undefined`.
         *
         * - If `val` is `null` or `undefined`, `defaultValue` is returned.
         * - Otherwise, `val` is returned as is.
         *
         * @param val The value to check.
         * @param defaultValue The default value to return if `val` is `null` or `undefined`.
         * @returns The original value if not `null` or `undefined`, otherwise the `defaultValue`.
         *
         * @example
         * nvl(null, "default"); // "default"
         * nvl(undefined, 100); // 100
         * nvl("Hello", "default"); // "Hello"
         * nvl(0, "fallback"); // 0 (not null or undefined, so returned as is)
         */
        nvl(val: any, defaultValue: any): any {
            return (val === null || val === undefined) ? defaultValue : val;
        },
        /**
         * Extracts the file extension from a given filename or file path.
         *
         * - Converts the input to a string if it is not already.
         * - Splits the string by `.` and returns the last segment as the file extension.
         * - If no extension is found, an empty string is returned.
         *
         * @param str The filename or file path.
         * @returns The file extension as a string, or an empty string if no extension exists.
         *
         * @example
         * getFileExtension("document.txt"); // "txt"
         * getFileExtension("archive.tar.gz"); // "gz"
         * getFileExtension("/path/to/file"); // "" (no extension)
         */
        getFileExtension(str: string): string {
            str = hisonCore.utils.getToString(str);
        
            const extension = str.split('.').pop();
            if (extension === str) {
                return '';
            }
            return extension ? extension : '';
        },
        /**
         * Extracts the filename (without extension) from a given file path or filename.
         *
         * - Converts the input to a string if it is not already.
         * - Extracts the last part of the path after the last `/` (or full filename if no path exists).
         * - Removes the file extension by cutting the string at the last `.` if present.
         *
         * @param str The full file path or filename.
         * @returns The filename without the extension.
         *
         * @example
         * getFileName("/path/to/document.txt"); // "document"
         * getFileName("archive.tar.gz"); // "archive.tar"
         * getFileName("file_without_extension"); // "file_without_extension"
         */
        getFileName(str: string): string {
            str = hisonCore.utils.getToString(str);
        
            const fileName = str.split('/').pop();
            if(!fileName) return '';
            const lastDotIndex = fileName.lastIndexOf('.');
        
            if (lastDotIndex === -1) return fileName;
            return fileName.substring(0, lastDotIndex);
        },
        /**
         * Decodes a Base64-encoded string into a human-readable format.
         *
         * - Converts the input to a string if it is not already.
         * - Uses `atob()` to decode the Base64 string.
         * - Decodes percent-encoded UTF-8 characters to properly restore special characters.
         *
         * @param str The Base64-encoded string.
         * @returns The decoded string.
         *
         * @example
         * getDecodeBase64("SGVsbG8gd29ybGQh"); // "Hello world!"
         * getDecodeBase64("44GT44KT44Gr44Gh44Gv"); // "こんにちは" (Japanese "Hello")
         */
        getDecodeBase64(str: string): string {
            str = hisonCore.utils.getToString(str);
            return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        },
        /**
         * Encodes a string into Base64 format.
         *
         * - Converts the input to a string if it is not already.
         * - Uses `encodeURIComponent()` to properly handle special characters.
         * - Encodes the string to Base64 using `btoa()`.
         *
         * @param str The input string to be encoded.
         * @returns The Base64-encoded string.
         *
         * @example
         * getEncodeBase64("Hello world!"); // "SGVsbG8gd29ybGQh"
         * getEncodeBase64("こんにちは"); // "44GT44KT44Gr44Gh44Gv" (Japanese "Hello")
         */
        getEncodeBase64(str: string): string {
            str = hisonCore.utils.getToString(str);
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(_, p1:string) {
                return String.fromCharCode(parseInt(p1, 16));
            }));
        },
        /**
         * Creates a deep copy of an object or array, preserving nested structures.
         *
         * - Handles `Object` and `Array` types recursively.
         * - Supports cloning custom objects implementing `getIsDataWrapper()` or `getIsDataModel()`.
         * - Prevents infinite loops by tracking previously copied references.
         * - If the object is `null` or not an object, it is returned as is.
         *
         * @param object The object or array to be deep copied.
         * @param visited An optional array to track visited references and prevent circular references.
         * @returns A deep copy of the input object or array.
         *
         * @example
         * const obj = { a: 1, b: { c: 2 } };
         * const copy = deepCopyObject(obj);
         * copy.b.c = 3;
         * console.log(obj.b.c); // 2 (original object remains unchanged)
         *
         * const arr = [1, [2, 3]];
         * const arrCopy = deepCopyObject(arr);
         * arrCopy[1][0] = 99;
         * console.log(arr[1][0]); // 2 (original array remains unchanged)
         */
        deepCopyObject(object: any, visited?: { source: any, copy: any }[]): any {
            if (object === null || typeof object !== 'object') {
                return object;
            }
            if (object instanceof Response) {
                return object.clone();
            }
            if (object.constructor !== Object && object.constructor !== Array) {
                if ((object && object.getIsDataWrapper && object.getIsDataWrapper())
                    ||(object && object.getIsDataModel && object.getIsDataModel())
                ) {
                    return object.clone();
                } else {
                    return object;
                }
            }
            if (!visited) visited = [];
            for (let i = 0; i < visited.length; i++) {
                if (visited[i].source === object) {
                    return visited[i].copy;
                }
            }
            let copy: any;
            if (Array.isArray(object)) {
                copy = [];
                visited.push({ source: object, copy: copy });
        
                for (let j = 0; j < object.length; j++) {
                    copy[j] = hisonCore.utils.deepCopyObject(object[j], visited);
                }
            } else {
                copy = {};
                visited.push({ source: object, copy: copy });
        
                for (let key in object) {
                    if (object.hasOwnProperty(key)) {
                        copy[key] = hisonCore.utils.deepCopyObject(object[key], visited);
                    }
                }
            }
            return copy;
        },
    };
}
