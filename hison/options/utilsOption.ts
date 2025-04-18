export const utilsOption = {
    /**
     * The default format for displaying dates.
     *
     * This format is used throughout the `hisondev` solution for parsing 
     * and formatting date values.
     *
     * - Default value: `'yyyy-MM-dd'`
     * - Example output: `'2025-02-04'` (for February 4, 2025)
     * - Can be modified using `setDateFormat(format: string)`.
     */
    dateFormat : 'yyyy-MM-dd',
    /**
     * The default format for displaying time.
     *
     * This format is used throughout the `hisondev` solution for parsing 
     * and formatting time values.
     *
     * - Default value: `'hh:mm:ss'`
     * - Example output: `'14:30:15'` (for 2:30:15 PM)
     * - Can be modified using `setTimeFormat(format: string)`.
     */
    timeFormat : 'hh:mm:ss',
    /**
     * The default format for displaying date and time.
     *
     * This format is used throughout the `hisondev` solution for parsing 
     * and formatting datetime values.
     *
     * - Default value: `'yyyy-MM-dd hh:mm:ss'`
     * - Example output: `'2025-02-04 14:30:15'` (for February 4, 2025, 2:30:15 PM)
     * - Can be modified using `setDatetimeFormat(format: string)`.
     */
    datetimeFormat : 'yyyy-MM-dd hh:mm:ss',
    /**
     * The default format for displaying the year.
     *
     * This format is used to represent year values in date-related operations.
     *
     * - Default value: `'yyyy'`
     * - Example output: `'2025'` (for the year 2025)
     * - Can be modified using `setYearFormat(format: string)`.
     */
    yearFormat : 'yyyy',
    /**
     * The default format for displaying the month.
     *
     * This format is used to represent month values in date-related operations.
     *
     * - Default value: `'M'`
     * - Example output: `'2'` (for February)
     * - Can be modified using `setMonthFormat(format: string)`.
     */
    monthFormat : 'M',
    /**
     * The default format for displaying the full month name.
     *
     * This format is used to represent the full name of a month in date-related operations.
     *
     * - Default value: `'MMMM'`
     * - Example output: `'February'` (for the month of February)
     * - Can be modified using `setMonthNameFormat(format: string)`.
     */
    monthNameFormat : 'MMMM',
    /**
     * The default format for displaying year and month.
     *
     * This format is used to represent a combination of year and month in date-related operations.
     *
     * - Default value: `'yyyy-MM'`
     * - Example output: `'2025-02'` (for February 2025)
     * - Can be modified using `setYearMonthFormat(format: string)`.
     */
    yearMonthFormat : 'yyyy-MM',
    /**
     * The default format for displaying the day of the month.
     *
     * This format is used to represent the day component in date-related operations.
     *
     * - Default value: `'d'`
     * - Example output: `'4'` (for the 4th day of the month)
     * - Can be modified using `setDayFormat(format: string)`.
     */
    dayFormat : 'd',
    /**
     * The default format for displaying the day of the week.
     *
     * This format is used to represent the day of the week in date-related operations.
     *
     * - Default value: `'d'`
     * - Example output: `'3'` (where 3 could represent Wednesday depending on locale settings)
     * - Can be modified using `setDayOfWeekFormat(format: string)`.
     */
    dayOfWeekFormat : 'd',
    /**
     * The default format for displaying the hour.
     *
     * This format is used to represent the hour component in time-related operations.
     *
     * - Default value: `'h'`
     * - Example output: `'2'
     * - Can be modified using `setHourFormat(format: string)`.
     */
    hourFormat : 'h',
    /**
     * The default format for displaying the hour and minute.
     *
     * This format is used to represent the time in hours and minutes.
     *
     * - Default value: `'hh:mm'`
     * - Example output: `'14:30'` (for 2:30 PM in 24-hour format)
     * - Can be modified using `setHourMinuteFormat(format: string)`.
     */
    hourMinuteFormat : 'hh:mm',
    /**
     * The default format for displaying the minute.
     *
     * This format is used to represent the minute component in time-related operations.
     *
     * - Default value: `'m'`
     * - Example output: `'5'` (for the 5th minute of the hour)
     * - Can be modified using `setMinuteFormat(format: string)`.
     */
    minuteFormat : 'm',
    /**
     * The default format for displaying the second.
     *
     * This format is used to represent the second component in time-related operations.
     *
     * - Default value: `'s'`
     * - Example output: `'45'` (for the 45th second of the minute)
     * - Can be modified using `setSecondFormat(format: string)`.
     */
    secondFormat : 's',
    /**
     * The default format for displaying numbers.
     *
     * This format is used to represent numeric values with grouping separators and decimal precision.
     *
     * - Default value: `"#,##0.##"`
     * - Example output: `"1,234.56"` (for the number `1234.56`)
     * - Can be modified using `setNumberFormat(format: string)`.
     */
    numberFormat : '#,##0.##',
    /**
     * The byte size used for characters with a char code less than or equal to `0x7FF`.
     *
     * This value defines the number of bytes required to encode characters in this range.
     *
     * - Default value: `2`
     * - Represents characters with `charCode <= 0x7FF`
     */
    LESSOREQ_0X7FF_BYTE : 2,
    /**
     * The byte size used for characters with a char code less than or equal to `0xFFFF`.
     *
     * This value defines the number of bytes required to encode characters in this range.
     *
     * - Default value: `3`
     * - Represents characters with `charCode <= 0xFFFF`
     */
    LESSOREQ_0XFFFF_BYTE : 3,
    /**
     * The byte size used for characters with a char code greater than `0xFFFF`.
     *
     * This value defines the number of bytes required to encode characters in this range.
     *
     * - Default value: `4`
     * - Represents characters with `charCode > 0xFFFF`
     */
    GREATER_0XFFFF_BYTE : 4,
};
