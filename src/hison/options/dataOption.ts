export const dataOption = {
    /**
     * A function that allows customization of how specific objects are inserted into a `DataModel`.
     *
     * In `hisondev`, all values inserted into a `DataModel` are **copied** to maintain data integrity.
     * However, certain JavaScript objects, such as `Date`, require a more flexible way of handling 
     * their copying process. Instead of manually defining conversion logic for every object type, 
     * `convertValue` provides a way for developers to customize how specific objects are transformed
     * before being inserted into a `DataModel`.
     *
     * - By default, this function **returns the input value as is**.
     * - Developers can override this function to implement custom conversion logic.
     * - Used in `DataModel._deepCopy(object)`, where it is applied to non-plain objects.
     *
     * ### Usage in `DataModel`
     * When copying an object, if it is not a plain `Object` or `Array`, `convertValue` is called:
     * ```typescript
     * if (object.constructor !== Object && object.constructor !== Array) {
     *     const convertValue = customOption.data.convertValue(object);
     *     return convertValue !== undefined ? convertValue : object;
     * }
     * ```
     *
     * ### Example: Customizing `convertValue` to Handle `Date` Objects
     * ```typescript
     * hison.setConvertValue((value: any) => {
     *     return value instanceof Date ? value.getTime() : value;
     * });
     * ```
     *
     * - The above example ensures that when a `Date` object is inserted into `DataModel`, 
     *   it is converted into a timestamp (`number`) instead of being copied as a reference.
     *
     * @param value The value to be processed before being inserted into `DataModel`.
     * @returns The customized or original value.
     */
    convertValue(value: any): any {return value;},
};
