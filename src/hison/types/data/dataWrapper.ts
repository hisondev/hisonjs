import type { InterfaceDataModel } from "./dataModel";

/**
 * The `DataWrapper` class provides a flexible key-value storage container
 * within the `hisondev` solution. It allows storing various data types,
 * including string value and `DataModel` instances.
 *
 * ### Core Features:
 * - **Key-Value Storage:**
 *   - Supports dynamic insertion and retrieval of key-value pairs.
 *   - Ensures that keys are always strings.
 * - **Integration with `DataModel`:**
 *   - Allows storing `DataModel` instances under specific keys.
 *   - Provides methods to retrieve `DataModel` instances safely.
 * - **Serialization & Cloning:**
 *   - Supports deep cloning of stored data.
 *   - Provides JSON serialization for structured data handling.
 * - **Validation & Type Safety:**
 *   - Ensures type safety for values stored in `DataWrapper`.
 *   - Throws errors when attempting to insert invalid types.
 *
 * ### Data Integrity & Deep Copying:
 * - Uses `hison.utils.deepCopyObject()` to ensure stored objects are immutable.
 * - Prevents unintended modifications by returning cloned values.
 *
 * ### Example Usage:
 * ```typescript
 * // Creating a DataWrapper with key-value pairs
 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
 * console.log(dataWrapper.getString("name")); // Output: "Alice"
 *
 * // Storing a DataModel instance
 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
 * dataWrapper.putDataModel("users", dataModel);
 * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
 *
 * // Serializing the DataWrapper to JSON
 * console.log(dataWrapper.getSerialized());
 * ```
 */
export interface InterfaceDataWrapper {
    /**
     * Checks whether the current instance is a `DataWrapper`.
     * This method is primarily used for type verification.
     *
     * ### Returns
     * - **`boolean`**: Returns `true` if the instance is a `DataWrapper`, otherwise `false`.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ key: "value" });
     * console.log(dataWrapper.getIsDataWrapper()); // Output: true
     * ```
     *
     * @returns {boolean} `true` if the instance is a `DataWrapper`, otherwise `false`.
     */
    getIsDataWrapper(): boolean;
    /**
     * Creates and returns a deep copy of the current `DataWrapper` instance.
     * This method ensures that all stored key-value pairs are fully cloned, 
     * preventing unintended modifications between the original and copied instances.
     *
     * ### Implementation Details
     * - Uses `hison.utils.deepCopyObject()` to recursively copy nested objects and arrays.
     * - Supports cloning `DataModel` instances stored within the `DataWrapper`.
     * - Prevents circular references by tracking previously copied objects.
     * - Ensures that modifications in the cloned instance do not affect the original instance.
     *
     * ### Returns
     * - **`DataWrapper`**: A new `DataWrapper` instance containing a deep copy of the original data.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * const clonedWrapper = dataWrapper.clone();
     * 
     * console.log(clonedWrapper.getString("name")); // Output: "Alice"
     * console.log(clonedWrapper !== dataWrapper);   // Output: true (Cloned instance is independent)
     *
     * // Deep copy verification
     * const originalNested = new hison.data.DataModel([{ id: 1, value: "Test" }]);
     * const dataWrapperWithModel = new hison.data.DataWrapper({ nested: originalNested });
     * const clonedWrapperWithModel = dataWrapperWithModel.clone();
     * 
     * console.log(clonedWrapperWithModel.getDataModel("nested") !== originalNested); // Output: true
     * ```
     *
     * @returns {InterfaceDataWrapper} A new `DataWrapper` instance with a deep copy of the stored data.
     */
    clone(): InterfaceDataWrapper | null;
    /**
     * Removes all stored key-value pairs in the `DataWrapper`, resetting it to an empty state.
     * 
     * ### Behavior
     * - Clears the internal storage by setting `_data` to an empty object.
     * - Returns the same `DataWrapper` instance for method chaining.
     *
     * ### Returns
     * - **`DataWrapper`**: The current instance after clearing all stored data.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ key1: "value1", key2: "value2" });
     * console.log(dataWrapper.size()); // Output: 2
     * 
     * dataWrapper.clear();
     * console.log(dataWrapper.size()); // Output: 0
     * ```
     *
     * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after clearing all data.
     */
    clear(): InterfaceDataWrapper;
    /**
     * Serializes the `DataWrapper` into a JSON string representation.
     * Converts stored `DataModel` instances into their row data format for proper serialization.
     *
     * ### Behavior
     * - Iterates through all key-value pairs in the `DataWrapper`.
     * - If a value is a `DataModel`, it is converted to an array of rows using `getRows()`.
     * - Other values are stored as-is.
     * - The final object is serialized into a JSON string.
     *
     * ### Returns
     * - **`string`**: A JSON string representation of the `DataWrapper` contents.
     *
     * ### Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * const dataWrapper = new hison.data.DataWrapper({ users: dataModel, status: "active" });
     * 
     * console.log(dataWrapper.getSerialized());
     * // Output: '{"users":[{"id":1,"name":"Alice"}],"status":"active"}'
     * ```
     *
     * @returns {string} JSON string representation of the stored data.
     */
    getSerialized(): string;
    /**
     * Retrieves the value associated with the specified key from the `DataWrapper`.
     * If the value exists, a deep copy is returned to prevent unintended modifications.
     *
     * ### Generic Type `<T>`
     * - `T` represents the shape of the `DataModel` rows.
     * - If `T` is not specified, it defaults to `Record<string, any>`, allowing dynamic structures.
     *
     * ### Parameters
     * - `key` **(string)**: The key associated with the value to retrieve.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - If the key exists and contains a `DataModel<T>`, returns a deep copy of the stored `DataModel<T>`.
     * - If the key exists but is a string, returns the stored string value.
     * - If the key does not exist, returns `null`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T> | string | null`**: 
     *   - A deep copy of the `DataModel<T>` if stored under the key.
     *   - The string value if a string was stored under the key.
     *   - `null` if the key does not exist.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     * }
     *
     * const dataWrapper = new hison.data.DataWrapper();
     *
     * // Storing a string value
     * dataWrapper.put("message", "Hello");
     * console.log(dataWrapper.get("message")); // Output: "Hello"
     *
     * // Storing a DataModel with a defined type
     * const userModel = new hison.data.DataModel<User>([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * dataWrapper.put("users", userModel);
     *
     * // Retrieving with type inference
     * const users = dataWrapper.get<User>("users");
     * console.log(users?.getRowCount()); // Output: 2
     * console.log(users?.getValue(0, "name").toUpperCase()); // Output: "ALICE"
     *
     * // Attempting to retrieve a non-existent key
     * console.log(dataWrapper.get("nonExistentKey")); // Output: null
     * ```
     *
     * @param {string} key The key to retrieve the associated value.
     * @returns {InterfaceDataModel<T> | string | null} A deep copy of the stored value, or `null` if the key is not found.
     */
    get<T extends Record<string, any> = Record<string, any>>(key: string): InterfaceDataModel<T> | string | null;
    /**
     * Retrieves the string value associated with the specified key from the `DataWrapper`.
     * Ensures that the retrieved value is explicitly a string before returning it.
     *
     * ### Parameters
     * - `key` **(string)**: The key associated with the string value to retrieve.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if the value associated with `key` is not a string.
     * - Returns the string value if it exists; otherwise, returns `null`.
     *
     * ### Returns
     * - **`string | null`**: The associated string value, or `null` if the key is not found.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ status: "active", count: 5 });
     * 
     * console.log(dataWrapper.getString("status")); // Output: "active"
     * console.log(dataWrapper.getString("nonExistentKey")); // Output: null
     *
     * @param {string} key The key associated with the string value.
     * @returns {string | null} The associated string value, or `null` if not found.
     * @throws {Error} If the key is not a string or if the stored value is not a string.
     */
    getString(key: string): string | null;
    /**
     * Retrieves the `DataModel<T>` instance associated with the specified key from the `DataWrapper`.
     * Ensures that the retrieved value is a valid `DataModel<T>` before returning a cloned copy.
     *
     * ### Generic Type `<T>`
     * - `T` represents the shape of each row in the `DataModel<T>`.
     * - If `T` is not specified, it defaults to `Record<string, any>`, allowing dynamic structures.
     *
     * ### Parameters
     * - `key` **(string)**: The key associated with the `DataModel<T>` instance to retrieve.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if the value associated with `key` is not a valid `DataModel<T>` instance.
     * - Returns a deep-cloned copy of the `DataModel<T>` to maintain data integrity.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: A cloned `DataModel<T>` instance retrieved from the `DataWrapper`.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     * }
     * 
     * const userModel = new hison.data.DataModel<User>([{ id: 1, name: "Alice" }]);
     * const dataWrapper = new hison.data.DataWrapper();
     * dataWrapper.put("users", userModel);
     * 
     * // Retrieving with type inference
     * const clonedDataModel = dataWrapper.getDataModel<User>("users");
     * console.log(clonedDataModel.getRowCount()); // Output: 1
     * console.log(clonedDataModel.getValue(0, "name").toUpperCase()); // Output: "ALICE"
     *
     * // Throws an error: "The data does not contain the specified data-model value."
     * console.log(dataWrapper.getDataModel("nonExistentKey"));
     * ```
     *
     * @param {string} key The key associated with the `DataModel<T>` instance.
     * @returns {InterfaceDataModel<T>} A cloned `DataModel<T>` instance retrieved from the `DataWrapper`.
     * @throws {Error} If the key is not a string or if the stored value is not a valid `DataModel<T>`.
     */
    getDataModel<T extends Record<string, any> = Record<string, any>>(key: string): InterfaceDataModel<T>;
    /**
     * Inserts or updates a key-value pair in the `DataWrapper`.
     * Allows storing primitive values, strings, and `DataModel` instances.
     *
     * ### Parameters
     * - `key` **(string)**: The key under which the value will be stored.
     * - `value` **(any)**: The value to be stored. Can be a string, number, boolean, `DataModel`, or other valid types.
     *
     * ### Behavior
     * - Calls the internal `_put()` method to validate and store the value.
     * - If the key already exists, its value is updated.
     * - Returns the current `DataWrapper` instance for method chaining.
     *
     * ### Returns
     * - **`DataWrapper`**: The current instance after inserting/updating the value.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper();
     * 
     * // Storing a string value
     * dataWrapper.put("status", "active");
     * console.log(dataWrapper.getString("status")); // Output: "active"
     * 
     * // Storing a DataModel instance
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * dataWrapper.put("users", dataModel);
     * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
     * ```
     *
     * @param {string} key The key under which the value is stored.
     * @param {any} value The value to store.
     * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
     */
    put(key: string, value: any): InterfaceDataWrapper;
    /**
     * Inserts or updates a key-value pair in the `DataWrapper`, ensuring that the value is a string-convertible type.
     * Only accepts primitive types (`string`, `number`, `boolean`, `bigint`, `symbol`) or `null`.
     *
     * ### Parameters
     * - `key` **(string)**: The key under which the value will be stored.
     * - `value` **(string | number | boolean | bigint | symbol | null)**: The value to be stored, 
     *   restricted to types that can be converted to a string.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if `value` is not of a valid type.
     * - Calls the internal `_put()` method to store the value.
     * - Returns the current `DataWrapper` instance for method chaining.
     *
     * ### Returns
     * - **`DataWrapper`**: The current instance after inserting/updating the value.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper();
     * 
     * // Storing a string value
     * dataWrapper.putString("status", "active");
     * console.log(dataWrapper.getString("status")); // Output: "active"
     *
     * // Storing a number (converted to string internally)
     * dataWrapper.putString("count", 10);
     * console.log(dataWrapper.getString("count")); // Output: "10"
     *
     * // Throws an error: "Please insert only values convertible to string type."
     * dataWrapper.putString("invalid", { key: "value" });
     * ```
     *
     * @param {string} key The key under which the value is stored.
     * @param {string | number | boolean | bigint | symbol | null} value The value to store.
     * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
     * @throws {Error} If `key` is not a string or `value` is not a valid type.
     */
    putString(key: string, value: string | number | boolean | bigint | symbol | null): InterfaceDataWrapper;
    /**
     * Inserts or updates a `DataModel` instance in the `DataWrapper`.
     * Ensures that the stored value is a valid `DataModel`.
     *
     * ### Parameters
     * - `key` **(string)**: The key under which the `DataModel` will be stored.
     * - `value` **(`DataModel`)**: The `DataModel` instance to be stored.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if `value` is not a valid `DataModel` instance.
     * - Calls the internal `_put()` method to store the `DataModel`.
     * - Returns the current `DataWrapper` instance for method chaining.
     *
     * ### Returns
     * - **`DataWrapper`**: The current instance after inserting/updating the `DataModel`.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper();
     * 
     * // Creating and storing a DataModel
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * dataWrapper.putDataModel("users", dataModel);
     * 
     * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
     *
     * // Throws an error: "Please insert only values of data-model type."
     * dataWrapper.putDataModel("invalid", "not a DataModel");
     * ```
     *
     * @param {string} key The key under which the `DataModel` is stored.
     * @param {InterfaceDataModel<any>} value The `DataModel` instance to store.
     * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
     * @throws {Error} If `key` is not a string or `value` is not a valid `DataModel`.
     */
    putDataModel(key: string, value: InterfaceDataModel<any>): InterfaceDataWrapper;
    /**
     * Converts the `DataWrapper` instance into a standard JavaScript object.
     * If the stored values include `DataModel` instances, they are converted into object representations.
     *
     * ### Behavior
     * - Iterates through all key-value pairs in the `DataWrapper`.
     * - If a value is a `DataModel`, it is converted using `getObject()`.
     * - Other values are returned as-is.
     * - Returns a plain JavaScript object representation of the `DataWrapper`.
     *
     * ### Returns
     * - **`Record<string, any>`**: A plain object containing all stored key-value pairs.
     *
     * ### Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * const dataWrapper = new hison.data.DataWrapper({ users: dataModel, status: "active" });
     * 
     * console.log(dataWrapper.getObject());
     * // Output: { users: { cols: ["id", "name"], rows: [{ id: 1, name: "Alice" }] }, status: "active" }
     * ```
     *
     * @returns {Record<string, any>} A plain object representation of the `DataWrapper` instance.
     */
    getObject(): Record<string, any>;
    /**
     * Checks whether the `DataWrapper` contains a specified key.
     *
     * ### Parameters
     * - `key` **(string)**: The key to check for existence in the `DataWrapper`.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Uses `hasOwnProperty()` to determine if the key exists in the stored data.
     *
     * ### Returns
     * - **`boolean`**: `true` if the key exists, otherwise `false`.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * 
     * console.log(dataWrapper.containsKey("name")); // Output: true
     * console.log(dataWrapper.containsKey("nonExistentKey")); // Output: false
     * ```
     *
     * @param {string} key The key to check for existence.
     * @returns {boolean} `true` if the key exists, otherwise `false`.
     * @throws {Error} If `key` is not a string.
     */
    containsKey(key: string): boolean;
    /**
     * Checks whether the `DataWrapper` is empty (i.e., contains no key-value pairs).
     *
     * ### Behavior
     * - Determines emptiness by checking if the number of stored keys is `0`.
     *
     * ### Returns
     * - **`boolean`**: `true` if the `DataWrapper` contains no data, otherwise `false`.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper();
     * console.log(dataWrapper.isEmpty()); // Output: true
     * 
     * dataWrapper.put("status", "active");
     * console.log(dataWrapper.isEmpty()); // Output: false
     * ```
     *
     * @returns {boolean} `true` if the `DataWrapper` contains no data, otherwise `false`.
     */
    isEmpty(): boolean;
    /**
     * Removes a key-value pair from the `DataWrapper` if the key exists and returns the removed value.
     *
     * ### Parameters
     * - `key` **(string)**: The key to be removed from the `DataWrapper`.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Checks if the key exists using `hasOwnProperty()`.
     * - If the key exists, retrieves the associated value and deletes the key.
     * - Returns the removed value, which can be either a `DataModel` or a `string`.
     * - If the key does not exist, returns `null`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T> | string | null`**:
     *   - The removed value if the key existed.
     *   - `null` if the key was not found in the `DataWrapper`.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: "25" });
     * 
     * console.log(dataWrapper.containsKey("name")); // Output: true
     * 
     * const removedValue = dataWrapper.remove("name");
     * console.log(removedValue); // Output: "Alice"
     * console.log(dataWrapper.containsKey("name")); // Output: false
     *
     * const nonExistentValue = dataWrapper.remove("nonExistentKey");
     * console.log(nonExistentValue); // Output: null
     * ```
     *
     * @param {string} key The key to remove from the `DataWrapper`.
     * @returns {InterfaceDataModel<T> | string | null} The removed value if it existed, otherwise `null`.
     * @throws {Error} If `key` is not a string.
     */
    remove<T extends Record<string, any> = Record<string, any>>(key: string): InterfaceDataModel<T> | string | null;
    /**
     * Returns the number of key-value pairs stored in the `DataWrapper`.
     *
     * ### Behavior
     * - Counts the number of keys present in the internal data storage.
     *
     * ### Returns
     * - **`number`**: The total number of stored key-value pairs.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * console.log(dataWrapper.size()); // Output: 2
     * 
     * dataWrapper.put("status", "active");
     * console.log(dataWrapper.size()); // Output: 3
     * ```
     *
     * @returns {number} The number of stored key-value pairs in the `DataWrapper`.
     */
    size(): number;
    /**
     * Retrieves an array of all keys stored in the `DataWrapper`.
     *
     * ### Behavior
     * - Returns a list of all keys currently stored in the `DataWrapper`.
     * - If the `DataWrapper` is empty, returns an empty array.
     *
     * ### Returns
     * - **`string[]`**: An array containing all stored keys.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * console.log(dataWrapper.keys()); // Output: ["name", "age"]
     * 
     * dataWrapper.clear();
     * console.log(dataWrapper.keys()); // Output: []
     * ```
     *
     * @returns {string[]} An array of keys stored in the `DataWrapper`.
     */
    keys(): string[];
    /**
     * Retrieves an array of all values stored in the `DataWrapper`.
     * Ensures that stored values are returned as deep copies to prevent unintended modifications.
     *
     * ### Behavior
     * - Iterates through all key-value pairs in the `DataWrapper`.
     * - Uses `hison.utils.deepCopyObject()` to return deep copies of stored values.
     * - If the `DataWrapper` is empty, returns an empty array.
     *
     * ### Returns
     * - **`any[]`**: An array containing deep copies of all stored values.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * console.log(dataWrapper.values()); // Output: ["Alice", 25]
     * 
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * dataWrapper.put("users", dataModel);
     * console.log(dataWrapper.values()); // Output: ["Alice", 25, <cloned DataModel>]
     * ```
     *
     * @returns {InterfaceDataModel<any>[] | string[]} An array of deep-copied values stored in the `DataWrapper`.
     */
    values(): InterfaceDataModel<any>[] | string[];
};
