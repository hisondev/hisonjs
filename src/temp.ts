
//====================================================================================
//createHison
//====================================================================================

import { ApiLink, EventEmitter, LRUCache } from "./hison/link";
import { dataOption, linkOption, shieldOption, utilsOption } from "./hison/options";
import { CustomOption } from "./hison/options/customOption";
import { getShield } from "./hison/shield";
import { getUtils } from "./hison/utils";

/**
 * Creates and returns an instance of `Hison`, the core object of the `hisondev` solution.
 * 
 * ### **Overview**
 * The `createHison()` function **encapsulates the creation of the `Hison` object** using a **closure pattern**.
 * This ensures that:
 * - **Internal states remain private** while exposing necessary functionalities.
 * - **Methods are encapsulated**, preventing direct manipulation of internal logic.
 * - **Security and integrity** of configuration settings are preserved.
 * 
 * The returned `Hison` object serves as the **central interface** for configuration, security, utilities, 
 * structured data handling, and API communication.
 * 
 * ---
 * ### **Encapsulation with Closure**
 * - Internally, `createHison()` initializes a **`HisonCore` object**, which holds the actual implementations.
 * - The **returned object only exposes a selected set of methods**, ensuring safe interaction.
 * - This design provides **data encapsulation** and **prevents unintended modifications**.
 * 
 * ---
 * ### **Core Functionalities of `Hison`**
 * 
 * The `Hison` object provides a **modular and extensible API** with the following key components:
 * 
 * ### **1. Configuration Management**
 * - **Dynamic Customization**: Modify settings via setter methods (`setDateFormat()`, `setTimeFormat()`, etc.).
 * - **Character Encoding Configuration**: Adjust byte sizes for different character encodings.
 * - **Security Settings**: Enable object freezing, access restrictions, and debugging prevention.
 *
 * Example:
 * ```typescript
 * hison.setDateFormat("MM/dd/yyyy");
 * hison.setTimeFormat("HH:mm:ss");
 * hison.setCharByteLess2047(3);
 * ```
 *
 * ---
 * ### **2. Security & Access Control (`hison.shield`)**
 * - **Enforce object immutability** (`setIsFreeze(true)`).
 * - **Restrict access to specific URLs/IPs** (`setShieldURL()`, `setExposeIpList()`).
 * - **Prevent developer tool access** (`setIsPossibleOpenDevTool(false)`).
 *
 * Example:
 * ```typescript
 * hison.setIsFreeze(true);
 * hison.setShieldURL("https://secure.example.com");
 * hison.setExposeIpList(["192.168.1.1", "10.0.0.2"]);
 * ```
 *
 * ---
 * ### **3. Utility Functions (`hison.utils`)**
 * - **String Processing** (`isAlpha()`, `getLpad()`).
 * - **Number Formatting** (`getRound()`, `getNumberFormat()`).
 * - **Date Handling** (`getDateWithFormat()`).
 *
 * Example:
 * ```typescript
 * hison.utils.isAlpha("HelloWorld"); // true
 * hison.utils.getNumberFormat(1234.5678, "#,###.00"); // "1,234.57"
 * ```
 *
 * ---
 * ### **4. Structured Data Handling (`hison.data`)**
 * The `data` module provides structured data storage and manipulation tools:
 *
 * - **`DataWrapper`**: Key-value storage for flexible data management.
 * - **`DataModel`**: Table-based structure for handling tabular data.
 *
 * Example:
 * ```typescript
 * const wrapper = new hison.data.DataWrapper({ username: "Alice", age: 25 });
 * console.log(wrapper.getString("username")); // "Alice"
 * 
 * const model = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
 * console.log(model.getValue(0, "name")); // "Alice"
 * ```
 *
 * ---
 * ### **5. API Communication (`hison.link`)**
 * - **Simplified HTTP Requests** using promise-based networking.
 * - **Built-in caching** to optimize API performance.
 * - **WebSocket support** for real-time data updates.
 *
 * Example:
 * ```typescript
 * const apiPost = new hison.link.ApiPost("UserService.createUser");
 * apiPost.call(new hison.data.DataWrapper({ username: "Alice" })).then(response => {
 *     console.log(response.data);
 * });
 * ```
 *
 * ---
 * ### **Encapsulation Benefits**
 * - **Prevents direct access to internal states**.
 * - **Ensures safe API exposure** while protecting core logic.
 * - **Maintains clean separation between implementation and interface**.
 *
 * ---
 * ### **Summary**
 * The `createHison()` function returns an instance of `Hison`, a **comprehensive framework** for managing:
 * - Configuration settings
 * - Security controls
 * - Utility functions
 * - Structured data storage
 * - API communication
 *
 * Through **closure-based encapsulation**, `Hison` maintains **high security, modularity, and efficiency**.
 *
 * ---
 * @returns {Hison} An encapsulated `Hison` object with restricted direct access to core logic.
 */
function createHison(): Hison {
    CustomOption
    LRUCache
    EventEmitter
    ApiLink
    const customOption = new CustomOption();
    const hison = new HisonCore();

    class HisonCore {
        utils = getUtils(hison, customOption);
        shield = getShield(customOption);
        data = {
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
            DataWrapper : class implements InterfaceDataWrapper {
                /**
                 * Creates an instance of `DataWrapper`, which serves as a key-value storage container.
                 * It allows storing primitive values and `DataModel` instances with flexible key-value mappings.
                 *
                 * ### Parameters
                 * - `keyOrObject` **(Record<string, InterfaceDataModel<any> | string> | string, optional)**: 
                 *   This parameter can be:
                 *   - An **object** where each key is mapped to either a `DataModel` instance or a string.
                 *   - A **single string key**, when paired with the `value` parameter.
                 * - `value` **(`InterfaceDataModel<any> | string`, optional)**: The value associated with 
                 *   the provided key, required only when `keyOrObject` is a string.
                 *
                 * ### Behavior
                 * - If an **object** is provided, all key-value pairs from the object are stored in the `DataWrapper`.
                 * - If a **string and value** are provided, a single key-value pair is stored.
                 * - If neither condition is met, an error is thrown.
                 *
                 * ### Returns
                 * - A new `DataWrapper` instance with the specified key-value pairs stored.
                 *
                 * ### Example Usage
                 * ```typescript
                 * // Creating a DataWrapper with an object
                 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: "25" });
                 * console.log(dataWrapper.getString("name")); // Output: "Alice"
                 *
                 * // Storing a DataModel inside DataWrapper
                 * const userModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * const modelWrapper = new hison.data.DataWrapper("users", userModel);
                 * console.log(modelWrapper.getDataModel("users").getRowCount()); // Output: 1
                 * ```
                 *
                 * @constructor
                 * @param {Record<string, InterfaceDataModel<any> | string> | string} [keyOrObject] The initial data 
                 *     for storage, either as an object or a single key.
                 * @param {InterfaceDataModel<any> | string} [value] The value to be associated with a single key.
                 * @throws {Error} If the provided arguments do not match the expected format.
                 */
                constructor(keyOrObject?: Record<string, InterfaceDataModel<any> | string> | string, value?: InterfaceDataModel<any> | string) {
                    this._data = {};
                    if (keyOrObject === undefined) return;
                    if (typeof keyOrObject === 'object' && keyOrObject !== null) {
                        for (let key in keyOrObject) {
                            this._put(key, keyOrObject[key]);
                        }
                    } else if (typeof keyOrObject === 'string' && value !== undefined) {
                        this._put(keyOrObject, value);
                    } else {
                        throw new Error('Invalid arguments. Provide an object or a key-value pair.');
                    }
                }
                private _data: Record<string, InterfaceDataModel<any> | string | null>;
                private _isDataWrapper = true;
                private _put = (key: string, value: any) => {
                    if (typeof key !== 'string') {
                        throw new Error('Keys must always be strings.');
                    } else if (typeof value === 'string') {
                        this._data[key] = value;
                    } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
                        this._data[key] = String(value);
                    } else if (typeof value === 'symbol') {
                        this._data[key] = value.description ? value.description : null;
                    } else if (value === null) {
                        this._data[key] = null;
                    } else if (value === undefined) {
                        throw new Error('You can not put a value of undefined type.');
                    } else if (typeof value === 'object') {
                        if (!value || !value.getIsDataModel || !value.getIsDataModel()) {
                            throw new Error('Please insert only values convertible to string or of data-model type.');
                        }
                        this._data[key] = value.clone();
                    } else {
                        throw new Error('Please insert only values convertible to string or of data-model type.');
                    }
                };
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
                getIsDataWrapper = (): boolean => {
                    return this._isDataWrapper;
                };
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
                clone = (): InterfaceDataWrapper | null => {
                    const newData: Record<string, any> = {};
                    for (let key in this._data) {
                        newData[key] = hison.utils.deepCopyObject(this._data[key]);
                    }
                    return new hison.data.DataWrapper(newData);
                };
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
                clear = (): InterfaceDataWrapper => {
                    this._data = {};
                    return this;
                };
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
                getSerialized = (): string => {
                    const data: Record<string, any> = {};
                    
                    for (let key in this._data) {
                        if (this._data.hasOwnProperty(key)) {
                            if (this._data[key] &&
                                (this._data[key] as InterfaceDataModel<any>).getIsDataModel &&
                                (this._data[key] as InterfaceDataModel<any>).getIsDataModel()
                            ) {
                                data[key] = (this._data[key] as InterfaceDataModel<any>).getRows();
                            } else {
                                data[key] = this._data[key];
                            }
                        }
                    }
                    return JSON.stringify(data);
                };
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
                 * @returns {InterfaceDataModel<T = Record<string, any>> | string | null} A deep copy of the stored value, or `null` if the key is not found.
                 */
                get = <T = Record<string, any>>(key: string): InterfaceDataModel<T> | string | null => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    return this._data[key] ? hison.utils.deepCopyObject(this._data[key]) : null;
                };
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
                 * // Throws an error: "The data does not contain the specified string value."
                 * console.log(dataWrapper.getString("count"));
                 * ```
                 *
                 * @param {string} key The key associated with the string value.
                 * @returns {string | null} The associated string value, or `null` if not found.
                 * @throws {Error} If the key is not a string or if the stored value is not a string.
                 */
                getString = (key: string): string | null => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (typeof this._data[key] !== 'string') throw new Error('The data does not contain the specified string value.');
                    return this._data[key] ? this._data[key] as string : null;
                };
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
                getDataModel = <T = Record<string, any>>(key: string): InterfaceDataModel<T> => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (!this._data[key] || !(this._data[key] as InterfaceDataModel<T>).getIsDataModel || !(this._data[key] as InterfaceDataModel<T>).getIsDataModel()) throw new Error('The data does not contain the specified data-model value.');
                    return (this._data[key] as InterfaceDataModel<T>).clone();
                };
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
                put = (key: string, value: any): InterfaceDataWrapper => {
                    this._put(key, value);
                    return this;
                };
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
                putString = (key: string, value: string | number | boolean | bigint | symbol | null): InterfaceDataWrapper => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (typeof value !== 'string'
                        && typeof value !== 'number'
                        && typeof value !== 'boolean'
                        && typeof value !== 'bigint'
                        && typeof value !== 'symbol'
                        && value !== null) {
                        throw new Error('Please insert only values convertible to string type.');
                    }
                    this._put(key, value);
                    return this;
                };
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
                putDataModel = (key: string, value: InterfaceDataModel<any>): InterfaceDataWrapper => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (value === null || !value.getIsDataModel || !value.getIsDataModel()) {
                        throw new Error('Please insert only values of data-model type.');
                    }
                    this._put(key, value);
                    return this;
                };
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
                getObject = (): Record<string, any> => {
                    const result: Record<string, any> = {};
                    for(let key in this._data) {
                        if (this._data[key] && (this._data[key] as InterfaceDataModel<any>).getIsDataModel && (this._data[key] as InterfaceDataModel<any>).getIsDataModel()) {
                            result[key] = (this._data[key] as InterfaceDataModel<any>).getObject();
                        } else {
                            result[key] = this._data[key];
                        }
                    }
                    return result;
                };
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
                containsKey = (key: string): boolean => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    return this._data.hasOwnProperty(key);
                };
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
                isEmpty = (): boolean => {
                    return Object.keys(this._data).length === 0;
                };
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
                remove = <T = Record<string, any>>(key: string): InterfaceDataModel<T> | string | null => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    let result: InterfaceDataModel<T> | string | null = null;
                    if (this._data.hasOwnProperty(key)) {
                        result = this._data[key];
                        delete this._data[key];
                    }
                    return result;
                };
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
                size = (): number => {
                    return Object.keys(this._data).length;
                };
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
                keys = (): string[] => {
                    return Object.keys(this._data);
                };
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
                 * - **`InterfaceDataModel<any>[] | string[]`**: An array containing deep copies of all stored values.
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
                values = (): InterfaceDataModel<any>[] | string[] => {
                    const values:InterfaceDataModel<any>[] | string[] = [];
                    for (let key in this._data) {
                        if (this._data.hasOwnProperty(key)) {
                            values.push(hison.utils.deepCopyObject(this._data[key]));
                        }
                    }
                    return values;
                };
            },
            /**
             * The `InterfaceDataModel<T>` interface defines the structure for managing tabular data within the `hisondev` solution.
             * It is designed to store, manipulate, and retrieve data efficiently while ensuring type consistency and validation.
             *
             * ### Generic Type `<T>`
             * - `T` represents the shape of each row in the `DataModel`.
             * - By specifying `T`, developers can enforce type safety for row values.
             * - If no type is provided, `T` defaults to `Record<string, any>`, allowing dynamic structures.
             * 
             * ### Core Features:
             * - **Column and Row Management:**
             *   - Supports dynamic addition and removal of columns and rows.
             *   - Ensures column consistency when inserting data.
             * - **Validation and Formatting:**
             *   - Allows setting a `DataModelValidator` to check column values.
             *   - Supports `DataModelFormatter` to format column values uniformly.
             * - **Filtering and Searching:**
             *   - Provides methods to filter rows based on conditions (`filterRows()`, `searchRows()`).
             *   - Allows searching rows and modifying data accordingly (`searchAndModify()`).
             * - **Sorting and Structuring:**
             *   - Supports ascending, descending, and reverse sorting on both columns and rows.
             * - **Serialization and Cloning:**
             *   - Enables deep copying of the entire `DataModel<T>`.
             *   - Provides `getSerialized()` to retrieve a JSON string of the model.
             * - **Integration with `DataWrapper`**
             *   - `DataWrapper` is an instance for storing `DataModel<T>`.
             *
             * ### Data Consistency and Validation:
             * - Uses `_deepCopy()` to ensure stored objects are immutable.
             * - Prevents invalid data types using `_getValidRowValue()`.
             * - Ensures uniform column data types to maintain consistency.
             *
             * ### Example Usage:
             * ```typescript
             * interface User {
             *     id: number;
             *     name: string;
             *     age: number;
             * }
             * 
             * // Creating a DataModel with a defined type
             * const dataModel: InterfaceDataModel<User> = new hison.data.DataModel<User>([
             *     { id: 1, name: "Alice", age: 25 },
             *     { id: 2, name: "Bob", age: 30 }
             * ]);
             * 
             * // Add a new column (TypeScript enforces type constraints)
             * dataModel.addColumn("gender");
             * 
             * // Set a default value for a column
             * dataModel.setColumnSameValue("gender", "Unknown");
             * 
             * // Apply a formatting function to the age column
             * dataModel.setColumnSameFormat("age", (value) => `${value} years old`);
             * 
             * // Get filtered rows where age is greater than 25
             * const filtered = dataModel.filterRows(row => row.age > 25);
             * console.log(filtered);
             * ```
             *
             * ### Related Functions:
             * - `hison.setConvertValue()`: Sets the conversion logic for special values before insertion.
             */
            DataModel : class<T extends Record<string, any> = Record<string, any>> implements InterfaceDataModel<T> {
                /**
                 * Creates a `DataModel<T>` instance, which manages a structured table-like data format.
                 * The instance allows for efficient row and column management.
                 *
                 * ### Generic Type `<T>`
                 * - `T` represents the structure of each row in the `DataModel<T>`.
                 * - If no type is provided, `T` defaults to `Record<string, any>`, allowing flexible structures.
                 *
                 * ### Parameters
                 * - `data` **(T[] | T, optional)**: The initial dataset, which can be:
                 *   - An **array of objects (`T[]`)**, where each object represents a row and its keys represent columns.
                 *   - A **single object (`T`)**, representing a single-row initialization.
                 *   - An **array of strings**, which initializes column names (if `T` is `Record<string, any>`).
                 *
                 * ### Behavior
                 * - If no data is provided, an empty `DataModel<T>` is created.
                 * - Calls `_put(data)`, which processes the input and initializes `_cols` and `_rows` accordingly.
                 *
                 * ### Returns
                 * - **`DataModel<T>`**: A new instance containing structured tabular data.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 * }
                 * 
                 * // Creating a DataModel with an array of objects (rows)
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 *
                 * console.log(dataModel.getRowCount()); // Output: 2
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // Creating a DataModel with a single object (one row)
                 * const singleRowModel = new hison.data.DataModel<User>({ id: 1, name: "Alice" });
                 * console.log(singleRowModel.getRowCount()); // Output: 1
                 * ```
                 *
                 * @constructor
                 * @param {T[] | T} [data] The initial dataset, which can be an array of objects, an array of column names, or a single object.
                 */
                constructor(data?: T[] | T) {
                    if (!data) return;
                    this._put(data);
                }
                private _cols: string[] = [];
                private _rows: T[] = [];
                private _isDataModel = true;
                private _deepCopy = (object: any, visited?: { source: any, copy: any }[]): any => {
                    if (object === null || typeof object !== 'object') {
                        return object;
                    }
                    if (object.constructor !== Object && object.constructor !== Array) {
                        const convertValue = customOption.data.convertValue(object);
                        return convertValue !== undefined ? convertValue : object;
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
                            copy[j] = this._deepCopy(object[j], visited);
                        }
                    } else {
                        copy = {};
                        visited.push({ source: object, copy: copy });
                
                        for (let key in object) {
                            if (object.hasOwnProperty(key)) {
                                copy[key] = this._deepCopy(object[key], visited);
                            }
                        }
                    }
                    return copy;
                };
                private _isPositiveIntegerIncludingZero = (value: string | number | bigint): boolean => {
                    if (typeof value !== 'number' && typeof value !== 'string' && typeof value !== 'bigint') {
                        return false;
                    }
                    value = String(value);
                    const intNum = parseInt(value, 10);
                    const floatNum = parseFloat(value);
                    if (intNum !== floatNum || isNaN(intNum) || intNum < 0) {
                        return false;
                    }
                    return true;
                };
                private _getValidRowIndex = (rowIndex: number): number => {
                    if (!this._isPositiveIntegerIncludingZero(rowIndex)) {
                        throw new Error('Invalid number type. It should be a number or a string that can be converted to a number.');
                    }
                    const index = Number(rowIndex);
                    if (index < 0 || index >= this._rows.length) {
                        throw new Error(`Invalid rowIndex value. It should be within the range of the rows.\nrange: between 0 and ${this._rows.length - 1}\ninsert rowIndex : ${index}`);
                    }
                    return index;
                }
                private _isConvertibleString = (value: any): boolean => {
                    if (value === undefined) throw new Error('You can not put a value of undefined type.');
                    if (value === null) return true;
                    if (['string','number','boolean','bigint','symbol'].indexOf(typeof value) >= 0) {
                        return true;
                    } else {
                        return false;
                    }
                };
                private _hasColumn = (column: string): boolean => {
                    return this._cols.indexOf(column) >= 0
                };
                private _checkColumn = (column: string) => {
                    if (!this._hasColumn(column)) {
                        throw new Error('The column does not exist. column : ' + column);
                    }
                };
                private _checkValidFunction = (func: Function) => {
                    if (!func || typeof func !== 'function') {
                        throw new Error('Please insert the valid function.');
                    }
                };
                private _checkBoolean = (value: boolean) => {
                    if (typeof value !== 'boolean') {
                        throw new Error('Please pass an boolean as a parameter.');
                    }
                };
                private _checkOriginObject = (value: Object) => {
                    if (value.constructor !== Object) {
                        throw new Error('Please pass an object with its own key-value pairs as a parameter.');
                    }
                };
                private _checkArray = (value: any[]) => {
                    if (value.constructor !== Array) {
                        throw new Error('Please pass an array.');
                    }
                };
                private _getColumnType = (rowIndex: number, col: string): string => {
                    if (rowIndex === 0) return 'null';
                    for(let index = rowIndex - 1; index >= 0; index--) {
                        if (this._rows[index][col]) {
                            if (typeof this._rows[index][col] === 'object') {
                                return this._rows[index][col].constructor;
                            }
                            return typeof this._rows[index][col];
                        }
                    }
                    return 'null';
                };
                private _makeValue = (value: any): any => {
                    let result = value;
                    /*if (typeof value === 'string') {
                        result = value;
                    } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
                        result = String(value);
                    } else if (typeof value === 'symbol') {
                        result = value.description;
                    } else if (value === null) {
                        result = null;
                    } else */if (typeof value === 'object') {
                        if ((value && value.getIsDataWrapper && value.getIsDataWrapper())
                            || (value && value.getIsDataModel && value.getIsDataModel())
                        ) {
                            throw new Error('You cannot insert a datawrapper or datamodel within a datamodel.');
                        }
                        result = this._deepCopy(value);
                    }
                    return result;
                };
                private _getValidColValue = (value: string): string => {
                    value = this._makeValue(value);
                    if (!this._isConvertibleString(value)) {
                        throw new Error('Only strings can be inserted into columns.');
                    }
                    if (!value) {
                        throw new Error('Column cannot be null.');
                    }
                    return value;
                }
                private _getValidRowValue = (rowIndex: number, col: string, value: any): any => {
                    value = this._makeValue(value);
                    const chkType = this._getColumnType(rowIndex, col);
                    if (chkType !== 'null' && value !== null) {
                        if (typeof value === 'object') {
                            if (value.constructor !== chkType) {
                                throw new Error('Data of the same type must be inserted into the same column. column : ' + col);
                            }
                        } else {
                            if (typeof value !== 'object' && typeof value !== chkType) {
                                throw new Error('Data of the same type must be inserted into the same column. column : ' + col);
                            }
                        }
                    }
                    return value;
                }
                private _addCol = (value: string) => {
                    value = this._getValidColValue(value);
                    if (this._cols.indexOf(value) === -1) {
                        this._cols.push(value);
                    } else {
                        throw new Error('There are duplicate columns to add. column : ' + value);
                    }
                }
                private _addRow = (rowIndex: number, row: T) => {
                    if (!row) {
                        throw new Error('Please insert vaild object');
                    }
                    if (row.constructor !== Object) {
                        throw new Error('Please insert object with their own key-value pairs.');
                    }
                    if (Object.keys(row).length === 0) return;
                    if (this._cols.length === 0) {
                        for (const key in row) {
                            this._addCol(key);
                        }
                    }
                    const tempRow: any = {};
                    for(const col of this._cols) {
                        if (row.hasOwnProperty(col)) {
                            tempRow[col] = this._getValidRowValue(rowIndex, col, row[col]);
                        }
                        else {
                            tempRow[col] = null;
                        }
                    }
                    this._rows.push(tempRow as T);
                }
                private _put = (data: Record<string, any>[] | Record<string, any>) => {
                    let rowIndex = this._rows.length;
                    if (Array.isArray(data)) {
                        if (data.length === 0) return;
                        if (this._isConvertibleString(data[0])) {
                            for(const col of data) {
                                this._addCol(col);
                            }
                            return;
                        } else {
                            for(const row of data) {
                                this._addRow(rowIndex, row);
                                rowIndex++;
                            }
                            return;
                        }
                    } else if (typeof data === 'object') {
                        if (data && (data as InterfaceDataWrapper).getIsDataWrapper && (data as InterfaceDataWrapper).getIsDataWrapper()) {
                            throw new Error('You cannot construct a datamodel with datawrapper.');
                        } else if (data && (data as InterfaceDataModel<T>).getIsDataModel && (data as InterfaceDataModel<T>).getIsDataModel()){
                            for(const row of (data as InterfaceDataModel<T>).getRows() ) {
                                this._addRow(rowIndex, row as T);
                                rowIndex++;
                            }
                            return;
                        } else if (data.constructor === Object) {
                            this._addRow(rowIndex, data as T);
                            return;
                        }
                    }
                    throw new Error('Please insert array contains objects with their own key-value pairs, array contains strings or only object of key-value pairs.');
                };
                private _getNullColumnFirstRowIndex = (column: string): number => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    for(let i = 0; i < this._rows.length; i++) {
                        if (this._rows[i][column] === null) return i;
                    }
                    return -1;
                };
                private _getDuplColumnFirstRowIndex = (column: string): number => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    const checkedValues: string[] = [];
                    for(let i = 0; i < this._rows.length; i++) {
                        if (checkedValues.includes(JSON.stringify(this._rows[i][column]))) {
                            return i;
                        }
                        if (this._rows[i][column] !== null) {
                            checkedValues.push(JSON.stringify(this._rows[i][column]));
                        }
                    }
                    return -1;
                };
                private _getInValidColumnFirstRowIndex = (column: string, validator: DataModelValidator): number => {
                    this._checkValidFunction(validator);
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    
                    for(let i = 0; i < this._rows.length; i++) {
                        if (!validator(this._rows[i][column])) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**
                 * Checks whether the current instance is a `DataModel`.
                 * This method is primarily used for type verification.
                 *
                 * ### Returns
                 * - **`boolean`**: Returns `true` if the instance is a `DataModel`, otherwise `false`.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * console.log(dataModel.getIsDataModel()); // Output: true
                 * ```
                 *
                 * @returns {boolean} `true` if the instance is a `DataModel`, otherwise `false`.
                 */
                getIsDataModel = (): boolean => {
                    return this._isDataModel;
                };
                /**
                 * Creates and returns a deep copy of the current `DataModel` instance.
                 * The cloned instance contains independent copies of all stored rows, 
                 * ensuring that modifications in the cloned instance do not affect the original instance.
                 *
                 * ### Behavior
                 * - Uses the internal `_rows` data to initialize a new `DataModel` instance.
                 * - Ensures that all row data is duplicated to maintain data integrity.
                 *
                 * ### Returns
                 * - **`DataModel`**: A new `DataModel` instance containing a copy of the original rows.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * const clonedModel = dataModel.clone();
                 * 
                 * console.log(clonedModel.getRowCount()); // Output: 1
                 * console.log(clonedModel !== dataModel); // Output: true (Cloned instance is independent)
                 * ```
                 *
                 * @returns {InterfaceDataModel<T>} A new `DataModel` instance with a copy of the stored rows.
                 */
                clone = (): InterfaceDataModel<T> => {
                    return new hison.data.DataModel<T>(this._rows);
                };
                /**
                 * Removes all stored rows and columns from the `DataModel`, resetting it to an empty state.
                 * 
                 * ### Behavior
                 * - Clears the `_cols` array, removing all column definitions.
                 * - Clears the `_rows` array, removing all stored data.
                 * - Returns the same `DataModel` instance for method chaining.
                 *
                 * ### Returns
                 * - **`DataModel`**: The current instance after clearing all stored data.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * console.log(dataModel.getRowCount()); // Output: 1
                 * 
                 * dataModel.clear();
                 * console.log(dataModel.getRowCount()); // Output: 0
                 * console.log(dataModel.getColumns());  // Output: []
                 * ```
                 *
                 * @returns {InterfaceDataModel<T>} The current `DataModel` instance after clearing all data.
                 */
                clear = (): InterfaceDataModel<T> => {
                    this._cols = [];
                    this._rows = [];
                    return this;
                };
                /**
                 * Serializes the `DataModel` instance into a JSON string representation.
                 * Converts the stored row data into a JSON format for easy storage or transmission.
                 *
                 * ### Behavior
                 * - Uses `JSON.stringify()` to serialize the `_rows` array.
                 * - Column definitions (`_cols`) are not included in the serialized output.
                 *
                 * ### Returns
                 * - **`string`**: A JSON string representation of the stored row data.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getSerialized());
                 * // Output: '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]'
                 * ```
                 *
                 * @returns {string} JSON string representation of the stored row data.
                 */
                getSerialized = (): string => {
                    return JSON.stringify(this._rows);
                };
                /**
                 * Checks whether the `DataModel` has defined columns.
                 * This method determines if the `DataModel` has been initialized with at least one column.
                 *
                 * ### Behavior
                 * - Returns `true` if `_cols` contains at least one column.
                 * - Returns `false` if no columns have been defined.
                 *
                 * ### Returns
                 * - **`boolean`**: `true` if columns are defined, otherwise `false`.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name"]);
                 * console.log(dataModel.isDeclare()); // Output: true
                 * 
                 * const emptyModel = new hison.data.DataModel();
                 * console.log(emptyModel.isDeclare()); // Output: false
                 * ```
                 *
                 * @returns {boolean} `true` if columns are defined, otherwise `false`.
                 */
                isDeclare = (): boolean => {
                    return this._cols.length > 0;
                };
                /**
                 * Retrieves an array of all column names defined in the `DataModel`.
                 * Returns a deep copy of the `_cols` array to prevent unintended modifications.
                 *
                 * ### Behavior
                 * - Uses `_deepCopy()` to return a copy of `_cols`, ensuring data integrity.
                 * - If no columns are defined, returns an empty array.
                 *
                 * ### Returns
                 * - **`string[]`**: An array of column names.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name"]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 * 
                 * const emptyModel = new hison.data.DataModel();
                 * console.log(emptyModel.getColumns()); // Output: []
                 * ```
                 *
                 * @returns {string[]} An array containing the column names.
                 */
                getColumns = (): string[] => {
                    return this._deepCopy(this._cols);
                };
                /**
                 * Retrieves an array of all values in the specified column.
                 * Ensures that returned values are deep copies to prevent unintended modifications.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The column name from which to retrieve values.
                 *
                 * ### Behavior
                 * - Throws an error if `column` is not a valid key in `T`.
                 * - Throws an error if the specified column does not exist.
                 * - Iterates through all rows and extracts the values of the specified column.
                 * - Uses `_deepCopy()` to return deep copies of the values.
                 * - The return type is inferred as `T[K][]`, maintaining strong type safety.
                 *
                 * ### Returns
                 * - **`T[K][]`**: An array containing all values from the specified column.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: string;
                 *     age: number;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: "U1", age: 25 },
                 *     { id: "U2", age: 30 }
                 * ]);
                 * 
                 * const ids = dataModel.getColumnValues("id");  // Inferred as string[]
                 * console.log(ids); // Output: ["U1", "U2"]
                 * 
                 * const ages = dataModel.getColumnValues("age"); // Inferred as number[]
                 * console.log(ages); // Output: [25, 30]
                 * 
                 * // Throws an error: "The column does not exist."
                 * // console.log(dataModel.getColumnValues("name"));
                 * ```
                 *
                 * @param {K} column The column name from which to retrieve values.
                 * @returns {T[K][]} An array of values from the specified column.
                 * @throws {Error} If the column is invalid or does not exist.
                 */
                getColumnValues = <K extends keyof T>(column: K): T[K][] => {
                    column = this._getValidColValue(column as string) as K;
                    this._checkColumn(column as string);
                    const result = [];
                    for(const row of this._rows) {
                        result.push(this._deepCopy(row[column]));
                    }
                    return result;
                };
                /**
                 * Adds a new column to the `DataModel`.
                 * Ensures that all existing rows include the new column with a default value of `null`.
                 *
                 * ### Parameters
                 * - `column` **(string)**: The name of the column to be added.
                 *
                 * ### Behavior
                 * - Throws an error if `column` is not a valid string.
                 * - Calls `_addCol(column)` to validate and add the column.
                 * - Iterates through `_rows` and ensures each row includes the new column, assigning `null` if missing.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically added columns.
                 * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
                 *
                 * ### Returns
                 * - **`DataModel`**: The current instance after adding the new column.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 * 
                 * dataModel.addColumn("age");
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * console.log(dataModel.getRow(0)); // Output: { id: 1, name: "Alice", age: null }
                 * ```
                 *
                 * @param {string} column The name of the column to add.
                 * @returns {InterfaceDataModel<T>} The current `DataModel` instance after adding the column.
                 * @throws {Error} If the column is invalid or already exists.
                 */
                addColumn = (column: string): InterfaceDataModel<T> => {
                    this._addCol(column);
                    for(const row of this._rows) {
                        if (!row.hasOwnProperty(column)) {
                            (row as Record<string, any>)[column] = null;
                        }
                    }
                    return this;
                };
                /**
                 * Adds multiple new columns to the `DataModel`.
                 * Ensures that all existing rows include the newly added columns with a default value of `null`.
                 *
                 * ### Parameters
                 * - `columns` **(string[])**: An array of column names to be added.
                 *
                 * ### Behavior
                 * - Throws an error if `columns` is not an array.
                 * - Iterates through the provided column names and calls `_addCol(column)` to validate and add each column.
                 * - Ensures that all existing rows include the new columns, assigning `null` if missing.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically added columns.
                 * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
                 *
                 * ### Returns
                 * - **`DataModel`**: The current instance after adding the new columns.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 * 
                 * dataModel.addColumns(["age", "email"]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age", "email"]
                 * console.log(dataModel.getRow(0)); // Output: { id: 1, name: "Alice", age: null, email: null }
                 * ```
                 *
                 * @param {string[]} columns An array of column names to add.
                 * @returns {InterfaceDataModel<T>} The current `DataModel` instance after adding the columns.
                 * @throws {Error} If `columns` is not an array or contains invalid column names.
                 */
                addColumns = (columns: string[]): InterfaceDataModel<T> => {
                    if (!Array.isArray(columns)) {
                        throw new Error('Only array contains strings can be inserted into columns.');
                    }
                    for(const column of columns) {
                        this._addCol(column);
                        for(const row of this._rows) {
                            if (!row.hasOwnProperty(column)) {
                                (row as Record<string, any>)[column] = null;
                            }
                        }
                    }
                    return this;
                };
                /**
                 * Sets the same value for all rows in the specified column.
                 * If the column does not exist, it is created before assigning values.
                 * 
                 * Supports type safety when `T` is defined, while allowing dynamic usage when `T = Record<string, any>`.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The name of the column to update, constrained to keys of `T` if defined.
                 * - `value` **(`T[K]`)**: The value to be assigned to all rows in the specified column.
                 *
                 * ### Behavior
                 * - Throws an error if `value` is `undefined`.
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - If the column does not exist, `_addCol(column)` is called to add it.
                 * - Iterates through all rows and assigns the specified value using `_getValidRowValue()`.
                 * - Ensures type consistency when `T` is specified.
                 * - Allows any column name when `T = Record<string, any>`.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The current `DataModel` instance after setting the column values.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 *     status?: string;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * // Set the same value for all rows in the "status" column
                 * dataModel.setColumnSameValue("status", "active");
                 * console.log(dataModel.getColumnValues("status")); // Output: ["active", "active"]
                 * 
                 * // If the column does not exist, it is created automatically
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "status"]
                 * 
                 * // With default `Record<string, any>`, dynamic columns can be added without strict typing
                 * const flexibleModel = new hison.data.DataModel();
                 * flexibleModel.setColumnSameValue("newField", 123);
                 * ```
                 *
                 * @param {K} column The name of the column to set the value for.
                 * @param {T[K]} value The value to assign to all rows in the column.
                 * @returns {InterfaceDataModel<T>} The current `DataModel<T>` instance after updating the column.
                 * @throws {Error} If `value` is `undefined` or if the column name is invalid.
                 */
                setColumnSameValue = <K extends keyof T>(column: K, value: T[K]): InterfaceDataModel<T> => {
                    if (value === undefined) throw new Error('You can not put a value of undefined type.');
                    column = this._getValidColValue(column as string) as K;
                    if (!this._hasColumn(column as string)) this._addCol(column as string);
                    let rowIndex = 0;
                    for(const row of this._rows) {
                        (row as Record<string, any>)[column as string] = this._getValidRowValue(rowIndex, column as string, value);
                        rowIndex++;
                    }
                    return this;
                };
                /**
                 * Applies a formatting function to all values in the specified column.
                 * Ensures type safety when `T` is specified, while maintaining flexibility for dynamic structures.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The name of the column to format, constrained to keys of `T` if defined.
                 * - `formatter` **(`DataModelFormatter`)**: A function that transforms each value in the column.
                 *
                 * ### Behavior
                 * - Throws an error if `formatter` is not a valid function.
                 * - Validates `column` using `_getValidColValue(column)`.
                 * - Throws an error if the column does not exist.
                 * - Iterates through all rows and applies `formatter` to each value in the column.
                 * - Ensures that the formatted values remain valid using `_getValidRowValue()`.
                 * - Allows any string as `column` if `T = Record<string, any>`.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The current `DataModel` instance after formatting the column.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface Product {
                 *     id: number;
                 *     price: number;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<Product>([
                 *     { id: 1, price: 1000 },
                 *     { id: 2, price: 2000 }
                 * ]);
                 * 
                 * // Format the "price" column by adding a currency symbol
                 * dataModel.setColumnSameFormat("price", value => `$${value}`);
                 * console.log(dataModel.getColumnValues("price")); // Output: ["$1000", "$2000"]
                 * 
                 * // With default `Record<string, any>`, any column can be formatted dynamically
                 * const flexibleModel = new hison.data.DataModel();
                 * flexibleModel.setColumnSameFormat("randomColumn", value => `formatted-${value}`);
                 * ```
                 *
                 * @param {K} column The name of the column to format.
                 * @param {DataModelFormatter} formatter A function that transforms each value in the column.
                 * @returns {InterfaceDataModel<T>} The current `DataModel<T>` instance after formatting the column.
                 * @throws {Error} If `formatter` is not a function or if the column does not exist.
                 */
                setColumnSameFormat = <K extends keyof T>(column: K, formatter: DataModelFormatter): InterfaceDataModel<T> => {
                    this._checkValidFunction(formatter);
                    column = this._getValidColValue(column as string) as K;
                    this._checkColumn(column as string);
                    let rowIndex = 0;
                    for(const row of this._rows) {
                        (row as Record<string, any>)[column as string] = this._getValidRowValue(rowIndex, column as string, formatter(row[column]));
                        rowIndex++;
                    }
                    return this;
                };
                /**
                 * Retrieves a deep copy of the row at the specified index.
                 * Ensures that modifications to the returned row do not affect the original data.
                 *
                 * ### Parameters
                 * - `rowIndex` **(number)**: The index of the row to retrieve.
                 *
                 * ### Behavior
                 * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
                 * - Uses `_deepCopy()` to return a copy of the row, preventing unintended modifications.
                 *
                 * ### Returns
                 * - **`T`**: A deep copy of the row data as an object.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getRow(0)); // Output: { id: 1, name: "Alice" }
                 *
                 * // Throws an error if the index is out of bounds
                 * // console.log(dataModel.getRow(10));
                 * ```
                 *
                 * @param {number} rowIndex The index of the row to retrieve.
                 * @returns {T} A deep copy of the row data.
                 * @throws {Error} If `rowIndex` is out of bounds.
                 */
                getRow = (rowIndex: number): T => {
                    return this._deepCopy(this._rows[this._getValidRowIndex(rowIndex)]);
                };
                /**
                 * Retrieves the row at the specified index as a new `DataModel` instance.
                 * Converts the row object into a `DataModel` for further structured operations.
                 *
                 * ### Parameters
                 * - `rowIndex` **(number)**: The index of the row to retrieve.
                 *
                 * ### Behavior
                 * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
                 * - Initializes a new `DataModel` using the retrieved row data.
                 *
                 * ### Returns
                 * - **`DataModel`**: A new `DataModel` instance containing the specified row.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * const rowDataModel = dataModel.getRowAsDataModel(0);
                 * console.log(rowDataModel.getRowCount()); // Output: 1
                 * console.log(rowDataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // Throws an error if the index is out of bounds
                 * // console.log(dataModel.getRowAsDataModel(10));
                 * ```
                 *
                 * @param {number} rowIndex The index of the row to retrieve.
                 * @returns {InterfaceDataModel<T>} A new `DataModel` instance containing the row data.
                 * @throws {Error} If `rowIndex` is out of bounds.
                 */
                getRowAsDataModel = (rowIndex: number): InterfaceDataModel<T> => {
                    return new hison.data.DataModel<T>(this._rows[this._getValidRowIndex(rowIndex)]);
                };
                /**
                 * Adds a new row to the `DataModel<T>` at the specified index or appends it to the end.
                 * If no parameters are provided, an empty row is added.
                 *
                 * ### Generic Type `<T>`
                 * - `T` represents the structure of each row in the `DataModel<T>`.
                 * - If no type is provided, `T` defaults to `Record<string, any>`, allowing flexible row structures.
                 *
                 * ### Parameters
                 * - `rowIndexOrRow` **(number | T, optional)**: The index at which to insert the row, or the row data to insert.
                 * - `row` **(T, optional)**: The row data to insert (only required when `rowIndexOrRow` is a number).
                 *
                 * ### Behavior
                 * - If **no parameters** are provided, an empty row is appended.
                 * - If **only a number is provided**, an empty row is inserted at that index.
                 * - If **only an object (`T`) is provided**, it is inserted as a new row at the end.
                 * - If **both a number and an object are provided**, the row is inserted at the specified index.
                 * - Throws an error if attempting to add a row without first defining columns.
                 *
                 * ### Returns
                 * - **`DataModel<T>`**: The current instance after adding the new row.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>(["id", "name"]);
                 * 
                 * // Add an empty row
                 * dataModel.addRow();
                 * console.log(dataModel.getRowCount()); // Output: 1
                 * console.log(dataModel.getRow(0)); // Output: { id: null, name: null }
                 * 
                 * // Add a row with data
                 * dataModel.addRow({ id: 1, name: "Alice" });
                 * console.log(dataModel.getRow(1)); // Output: { id: 1, name: "Alice" }
                 * 
                 * // Insert a row at index 1
                 * dataModel.addRow(1, { id: 2, name: "Bob" });
                 * console.log(dataModel.getRow(1)); // Output: { id: 2, name: "Bob" }
                 * 
                 * // Throws an error: "Please define the column first."
                 * // new hison.data.DataModel<User>().addRow();
                 * ```
                 *
                 * @param {number | T} [rowIndexOrRow] The index at which to insert the row, or the row data.
                 * @param {T} [row] The row data to insert (only required if `rowIndexOrRow` is a number).
                 * @returns {InterfaceDataModel<T>} The current `DataModel<T>` instance after adding the row.
                 * @throws {Error} If columns are not defined or parameters are invalid.
                 */
                addRow = (rowIndexOrRow?: number | T, row?: T): InterfaceDataModel<T> => {
                    if (rowIndexOrRow === undefined && row === undefined) {
                        if (this._cols.length <= 0) {
                            throw new Error('Please define the column first.');
                        }
                        const emptyRow: Record<string, any> = {};
                        for (const col of this._cols) {
                            emptyRow[col] = null;
                        }
                        this._rows.push(emptyRow as T);
                    } else if (typeof rowIndexOrRow === 'number' && row === undefined) {
                        if (this._cols.length <= 0) {
                            throw new Error('Please define the column first.');
                        }
                        const validIndex = rowIndexOrRow >= this._rows.length ? this._rows.length : this._getValidRowIndex(rowIndexOrRow);
                        const emptyRow: Record<string, any> = {};
                        for (const col of this._cols) {
                            emptyRow[col] = null;
                        }
                        this._rows.splice(validIndex, 0, emptyRow as T);
                    } else if (typeof rowIndexOrRow === 'object' && row === undefined) {
                        this._addRow(this._rows.length, rowIndexOrRow);
                    } else if (typeof rowIndexOrRow === 'number' && typeof row === 'object') {
                        const validIndex = rowIndexOrRow >= this._rows.length ? this._rows.length : this._getValidRowIndex(rowIndexOrRow);
                        this._addRow(validIndex, row);
                        const newRow: Record<string, any> | undefined = this._rows.pop();
                        if(newRow) this._rows.splice(validIndex, 0, newRow as T);
                    } else {
                        throw new Error('Invalid parameters for addRow method.');
                    }
                    return this;
                };
                /**
                 * Retrieves a deep copy of a range of rows from the `DataModel`.
                 * Ensures that modifications to the returned rows do not affect the original data.
                 *
                 * ### Generic Type `<T>`
                 * - `T` represents the structure of each row in the `DataModel`.
                 * - By specifying `T`, developers can enforce type safety when retrieving rows.
                 * - If no type is provided, `T` defaults to `Record<string, any>`, allowing flexible data structures.
                 *
                 * ### Parameters
                 * - `startRow` **(number, optional, default = `0`)**: The starting index of the row range.
                 * - `endRow` **(number, optional, default = `null`)**: The ending index of the row range (inclusive).
                 *
                 * ### Behavior
                 * - Calls `_getValidRowIndex(startRow)` and `_getValidRowIndex(endRow)` to validate row indices.
                 * - If `endRow` is `null`, retrieves rows from `startRow` to the last row.
                 * - Uses `_deepCopy()` to ensure the returned rows are independent copies.
                 *
                 * ### Returns
                 * - **`T[]`**: An array of deep-copied row objects, ensuring type safety.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.getRows()); 
                 * // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
                 * 
                 * console.log(dataModel.getRows(1, 2)); 
                 * // Output: [{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
                 * 
                 * // Throws an error if startRow or endRow is out of bounds
                 * // console.log(dataModel.getRows(5));
                 * ```
                 *
                 * @param {number} [startRow=0] The starting index of the row range.
                 * @param {number} [endRow=null] The ending index of the row range (inclusive).
                 * @returns {T[]} An array of deep-copied rows, preserving type safety.
                 * @throws {Error} If `startRow` or `endRow` is out of bounds.
                 */
                getRows = (startRow: number = 0, endRow: number | null = null): T[] => {
                    const sRow = this._getValidRowIndex(startRow);
                    if(sRow === 0 && endRow === null) return this._deepCopy(this._rows);
                    const eRow = endRow ? this._getValidRowIndex(endRow) : this._rows.length;
                    const result = [];
                    for(let i = sRow; i <= eRow; i++) {
                        if(!this._rows[i]) break;
                        result.push(this._deepCopy(this._rows[i]));
                    }
                    return result;
                };
                /**
                 * Retrieves a range of rows as a new `DataModel` instance.
                 * Ensures that the returned `DataModel` contains independent copies of the selected rows.
                 *
                 * ### Parameters
                 * - `startRow` **(number, optional, default = `0`)**: The starting index of the row range.
                 * - `endRow` **(number, optional, default = `null`)**: The ending index of the row range (inclusive).
                 *
                 * ### Behavior
                 * - Calls `_getValidRowIndex(startRow)` and `_getValidRowIndex(endRow)` to validate row indices.
                 * - If `startRow` is `0` and `endRow` is `null`, returns a clone of the entire `DataModel`.
                 * - Uses `_deepCopy()` to ensure the returned rows are independent.
                 * - Returns a new `DataModel` containing the selected rows.
                 *
                 * ### Returns
                 * - **`DataModel`**: A new `DataModel` instance containing the selected row range.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * const newModel = dataModel.getRowsAsDataModel(1, 2);
                 * console.log(newModel.getRowCount()); // Output: 2
                 * console.log(newModel.getRow(0)); // Output: { id: 2, name: "Bob" }
                 *
                 * // Retrieves all rows as a new DataModel
                 * const clonedModel = dataModel.getRowsAsDataModel();
                 * console.log(clonedModel.getRowCount()); // Output: 3
                 * ```
                 *
                 * @param {number} [startRow=0] The starting index of the row range.
                 * @param {number} [endRow=null] The ending index of the row range (inclusive).
                 * @returns {InterfaceDataModel<T>} A new `DataModel` instance containing the selected rows.
                 * @throws {Error} If `startRow` or `endRow` is out of bounds.
                 */
                getRowsAsDataModel = (startRow: number = 0, endRow: number | null = null): InterfaceDataModel<T> => {
                    const sRow = this._getValidRowIndex(startRow);
                    if(sRow === 0 && endRow === null) return this.clone();
                    const eRow = endRow ? this._getValidRowIndex(endRow) : this._rows.length;
                    const result = [];
                    for(let i = sRow; i <= eRow; i++) {
                        if(!this._rows[i]) break;
                        result.push(this._deepCopy(this._rows[i]));
                    }
                    return new hison.data.DataModel<T>(result);
                };
                /**
                 * Adds multiple rows to the `DataModel`.
                 * Each row is validated and inserted into the existing dataset.
                 *
                 * ### Generic Type `<T>`
                 * - `T` represents the structure of each row in the `DataModel`.
                 * - By specifying `T`, developers can enforce type safety for inserted rows.
                 * - If no type is provided, `T` defaults to `Record<string, any>`, allowing flexible data structures.
                 *
                 * ### Parameters
                 * - `rows` **(`T[]`)**: An array of row objects to be added.
                 *
                 * ### Behavior
                 * - Calls `_put(rows)` to process and insert the provided rows.
                 * - Ensures that column structures are maintained.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The current instance after adding the new rows.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>(["id", "name"]);
                 * 
                 * // Add multiple rows
                 * dataModel.addRows([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getRowCount()); // Output: 2
                 * console.log(dataModel.getRow(1)); // Output: { id: 2, name: "Bob" }
                 * ```
                 *
                 * @param {T[]} rows An array of row objects to add.
                 * @returns {InterfaceDataModel<T>} The current `DataModel<T>` instance after adding the rows.
                 * @throws {Error} If `rows` contain invalid data.
                 */
                addRows = (rows: T[]): InterfaceDataModel<T> => {
                    this._put(rows);
                    return this;
                };
                /**
                 * Converts the `DataModel` instance into a structured JavaScript object.
                 * The returned object includes column definitions, row data, and metadata.
                 *
                 * ### Behavior
                 * - Uses `_deepCopy()` to ensure the returned data is independent of the original `DataModel`.
                 * - The returned object contains:
                 *   - `cols`: An array of column names (`keyof T`).
                 *   - `rows`: An array of row objects (`T[]`).
                 *   - `colCount`: The total number of columns.
                 *   - `rowCount`: The total number of rows.
                 *   - `isDeclare`: A boolean indicating whether columns are explicitly defined.
                 *
                 * ### Returns
                 * - **`{ cols: (keyof T)[], rows: T[], colCount: number, rowCount: number, isDeclare: boolean }`**:
                 *   A structured object representing the `DataModel`.
                 *
                 * ⚠ **Note:** If `T` is explicitly defined, `cols` will reflect only the known keys of `T`.
                 * If `T` is the default `Record<string, any>`, `cols` may include dynamically added columns.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getObject());
                 * // Output:
                 * // {
                 * //   cols: ["id", "name"],
                 * //   rows: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
                 * //   colCount: 2,
                 * //   rowCount: 2,
                 * //   isDeclare: true
                 * // }
                 * ```
                 *
                 * @returns {{ cols: (keyof T)[]; rows: T[], colCount: number, rowCount: number, isDeclare: boolean }}
                 *          A structured object representing the `DataModel` structure.
                 */
                getObject = (): { cols: (keyof T)[]; rows: T[]; colCount: number; rowCount: number; isDeclare: boolean; } => {
                    const copyCol = this._deepCopy(this._cols);
                    const copyRow = this._deepCopy(this._rows);
                    const result = {
                        cols: copyCol,
                        rows: copyRow,
                        colCount: copyCol.length,
                        rowCount: copyRow.length,
                        isDeclare: this.isDeclare(),
                    };
                    return result;
                };
                /**
                 * Retrieves a deep copy of the value at the specified row index and column name.
                 * Ensures type safety when `T` is specified, while maintaining flexibility for dynamic structures.
                 *
                 * ### Parameters
                 * - `rowIndex` **(number)**: The index of the row to retrieve the value from.
                 * - `column` **(K)**: The column name, constrained to the keys of `T` if defined.
                 *
                 * ### Behavior
                 * - Validates `column` and `rowIndex` before accessing the value.
                 * - Returns a deep copy to prevent unintended modifications.
                 * - Allows any string as `column` if `T = Record<string, any>`.
                 *
                 * ### Returns
                 * - **`T[K]`**: A deep copy of the value stored at the specified row and column.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: string;
                 *     age: number;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: "U1", age: 25 },
                 *     { id: "U2", age: 30 }
                 * ]);
                 * 
                 * console.log(dataModel.getValue(0, "age")); // Output: 25 (type: number)
                 * console.log(dataModel.getValue(0, "id"));  // Output: "U1" (type: string)
                 * 
                 * // With default `Record<string, any>`, any column can be accessed.
                 * const flexibleModel = new hison.data.DataModel();
                 * console.log(flexibleModel.getValue(0, "randomColumn")); // No TypeScript error
                 * ```
                 *
                 * @param {number} rowIndex The row index to retrieve the value from.
                 * @param {K} column The column name to retrieve the value from.
                 * @returns {T[K]} A deep copy of the value stored at the specified row and column.
                 * @throws {Error} If `rowIndex` or `column` is invalid.
                 */
                getValue = <K extends keyof T>(rowIndex: number, column: K): T[K] => {
                    column = this._getValidColValue(column as string) as K;
                    this._checkColumn(column as string);
                    return this._deepCopy(this._rows[this._getValidRowIndex(rowIndex)][column]);
                };
                /**
                 * Sets a value at the specified row index and column name.
                 * Ensures that the value is valid and maintains data integrity.
                 *
                 * ### Parameters
                 * - `rowIndex` **(number)**: The index of the row where the value should be set.
                 * - `column` **(K)**: The name of the column where the value should be stored.
                 * - `value` **(T[K])**: The value to be assigned, ensuring type safety.
                 *
                 * ### Behavior
                 * - Throws an error if `value` is `undefined`.
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - Throws an error if the specified column does not exist.
                 * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
                 * - Calls `_getValidRowValue(rowIndex, column, value)` to ensure the value is properly formatted.
                 * - Updates the value at the specified row and column.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ### Type Safety
                 * - Uses `<K extends keyof T>` to ensure that `column` is a valid key of `T`.
                 * - The `value` type is inferred as `T[K]`, preventing type mismatches.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The current instance after updating the value.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * dataModel.setValue(0, "name", "Charlie");
                 * console.log(dataModel.getValue(0, "name")); // Output: "Charlie"
                 *
                 * // Throws an error if trying to set `undefined`
                 * // dataModel.setValue(1, "name", undefined);
                 *
                 * // Throws an error if the column does not exist
                 * // dataModel.setValue(0, "age", 25);
                 * ```
                 *
                 * @param {number} rowIndex The index of the row where the value should be set.
                 * @param {K} column The column name where the value should be stored.
                 * @param {T[K]} value The value to assign, ensuring type safety.
                 * @returns {InterfaceDataModel<T>} The current `DataModel` instance after updating the value.
                 * @throws {Error} If `value` is `undefined` or if `rowIndex` or `column` is invalid.
                 */
                setValue = <K extends keyof T>(rowIndex: number, column: K, value: T[K]): InterfaceDataModel<T> => {
                    if (value === undefined) throw new Error('You can not put a value of undefined type.');
                    column = this._getValidColValue(column as string) as K;
                    this._checkColumn(column as string);
                    this._rows[this._getValidRowIndex(rowIndex)][column] = this._getValidRowValue(rowIndex, column as string, value);
                    return this;
                };
                /**
                 * Removes a column from the `DataModel`, deleting its values from all rows.
                 * Ensures that the column exists before attempting removal.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The name of the column to remove, ensuring type safety.
                 *
                 * ### Behavior
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - Throws an error if the specified column does not exist.
                 * - Iterates through all rows and removes the specified column.
                 * - Updates `_cols` to exclude the removed column.
                 * - Returns the current `DataModel` instance for method chaining.
                 * 
                 * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically removed columns.
                 * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
                 * 
                 * ### Type Safety
                 * - Uses `<K extends keyof T>` to ensure that `column` is a valid key of `T`.
                 * - Prevents attempts to remove a column that does not exist in the defined type.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The current instance after removing the column.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string;
                 *   age: number;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 }
                 * ]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * 
                 * dataModel.removeColumn("age");
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // Throws an error if the column does not exist
                 * // dataModel.removeColumn("salary");
                 * ```
                 *
                 * @param {K} column The name of the column to remove, ensuring type safety.
                 * @returns {InterfaceDataModel<T>} The current `DataModel` instance after removing the column.
                 * @throws {Error} If `column` is invalid or does not exist.
                 */
                removeColumn = <K extends keyof T>(column: K): InterfaceDataModel<T> => {
                    column = this._getValidColValue(column as string) as K;
                    this._checkColumn(column as string);
                    for(const row of this._rows) {
                        delete row[column]
                    }
                    this._cols = this._cols.filter(oriColumn => oriColumn !== column as string);
                    return this;
                };
                /**
                 * Removes multiple columns from the `DataModel`, deleting their values from all rows.
                 * Ensures that each specified column exists before attempting removal.
                 *
                 * ### Parameters
                 * - `columns` **(K[])**: An array of column names to remove, ensuring type safety.
                 *
                 * ### Behavior
                 * - Uses `<K extends keyof T>` to enforce that `columns` contain only valid keys of `T`.
                 * - Iterates through the `columns` array and calls `removeColumn(column)` for each entry.
                 * - If any column does not exist, `removeColumn` will throw an error.
                 * - Returns the current `DataModel` instance for method chaining.
                 * 
                 * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically removed columns.
                 * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
                 * 
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The current instance after removing the specified columns.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string;
                 *   age: number;
                 *   city: string;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice", age: 25, city: "New York" },
                 *     { id: 2, name: "Bob", age: 30, city: "Los Angeles" }
                 * ]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age", "city"]
                 * 
                 * dataModel.removeColumns(["age", "city"]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // Throws an error if a column does not exist
                 * // dataModel.removeColumns(["salary", "bonus"]);
                 * ```
                 *
                 * @param {K[]} columns An array of column names to remove, ensuring type safety.
                 * @returns {InterfaceDataModel<T>} The current `DataModel` instance after removing the columns.
                 * @throws {Error} If any column does not exist.
                 */
                removeColumns = <K extends keyof T>(columns: K[]): InterfaceDataModel<T> => {
                    for(const column of columns) {
                        this.removeColumn(column);
                    }
                    return this;
                };
                /**
                 * Removes a row from the `DataModel` at the specified index and returns the removed row.
                 * Ensures that the row index is valid before removal.
                 *
                 * ### Parameters
                 * - `rowIndex` **(number, optional, default = `0`)**: The index of the row to remove.
                 *
                 * ### Behavior
                 * - Uses `<T>` to ensure that the returned row matches the structure of `T`.
                 * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
                 * - Uses `splice()` to remove the row from `_rows` and returns the removed row.
                 *
                 * ### Returns
                 * - **`T`**: The removed row object, ensuring type safety based on `T`.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.getRowCount()); // Output: 3
                 * 
                 * const removedRow = dataModel.removeRow(1);
                 * console.log(removedRow); // Output: { id: 2, name: "Bob" }
                 * console.log(dataModel.getRowCount()); // Output: 2
                 *
                 * // Throws an error if rowIndex is out of bounds
                 * // dataModel.removeRow(10);
                 * ```
                 *
                 * @param {number} [rowIndex=0] The index of the row to remove.
                 * @returns {T} The removed row object, with type safety enforced.
                 * @throws {Error} If `rowIndex` is out of bounds.
                 */
                removeRow = (rowIndex: number = 0): T => {
                    return this._rows.splice(this._getValidRowIndex(rowIndex), 1)[0];
                };
                /**
                 * Retrieves the total number of columns in the `DataModel`.
                 *
                 * ### Behavior
                 * - Returns the length of the `_cols` array, which represents the column definitions.
                 *
                 * ### Returns
                 * - **`number`**: The total number of columns in the `DataModel`.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name", "age"]);
                 * console.log(dataModel.getColumnCount()); // Output: 3
                 * 
                 * dataModel.removeColumn("age");
                 * console.log(dataModel.getColumnCount()); // Output: 2
                 * ```
                 *
                 * @returns {number} The number of columns in the `DataModel`.
                 */
                getColumnCount = (): number => {
                    return this._cols.length;
                };
                /**
                 * Retrieves the total number of rows in the `DataModel`.
                 *
                 * ### Behavior
                 * - Returns the length of the `_rows` array, which represents the stored data rows.
                 *
                 * ### Returns
                 * - **`number`**: The total number of rows in the `DataModel`.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getRowCount()); // Output: 2
                 * 
                 * dataModel.addRow({ id: 3, name: "Charlie" });
                 * console.log(dataModel.getRowCount()); // Output: 3
                 * ```
                 *
                 * @returns {number} The number of rows in the `DataModel`.
                 */
                getRowCount = (): number => {
                    return this._rows.length;
                };
                /**
                 * Checks whether the `DataModel` contains a specified column.
                 * Uses `<K extends keyof T>` to ensure type safety when checking column names.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The column name to check, constrained to keys of `T`.
                 *
                 * ### Behavior
                 * - Ensures type safety by restricting `column` to valid keys of `T`.
                 * - Calls `_hasColumn(column)` to determine if the column exists.
                 * - Returns `true` if the column is found in `_cols`, otherwise `false`.
                 *
                 * ### Returns
                 * - **`boolean`**: `true` if the column exists, otherwise `false`.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>(["id", "name"]);
                 * 
                 * console.log(dataModel.hasColumn("name")); // Output: true
                 * console.log(dataModel.hasColumn("age"));  // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
                 * ```
                 *
                 * @param {K} column The column name to check, constrained to keys of `T`.
                 * @returns {boolean} `true` if the column exists, otherwise `false`.
                 */
                hasColumn = <K extends keyof T>(column: K): boolean => {
                    return this._hasColumn(column as string);
                };
                /**
                 * Restricts the `DataModel` to only the specified columns by removing all other columns.
                 * Uses `<K extends keyof T>` to enforce type safety when specifying valid columns.
                 *
                 * ### Parameters
                 * - `columns` **(K[])**: An array of column names to retain, constrained to keys of `T`.
                 *
                 * ### Behavior
                 * - Ensures type safety by allowing only existing keys of `T` as valid columns.
                 * - Identifies and removes columns that are **not** included in the provided `columns` list.
                 * - Calls `removeColumns()` to eliminate those columns from the dataset.
                 * - Returns the modified `DataModel` instance for method chaining.
                 * 
                 * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically removed columns.
                 * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
                 * 
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The modified `DataModel` instance with only the specified columns retained.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string;
                 *   age: number;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 }
                 * ]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * 
                 * // Keep only "id" and "name" columns
                 * dataModel.setValidColumns(["id", "name"]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // TypeScript Error: Argument of type '"salary"' is not assignable to parameter of type '"id" | "name" | "age"'.
                 * // dataModel.setValidColumns(["id", "salary"]);
                 * ```
                 *
                 * @param {K[]} columns An array of column names to retain, constrained to keys of `T`.
                 * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with only the specified columns retained.
                 */
                setValidColumns = <K extends keyof T>(columns: K[]): InterfaceDataModel<T> => {
                    columns = this._cols.filter(oriColumn => !columns.includes(oriColumn as K)) as K[];
                    this.removeColumns(columns);
                    return this;
                };
                /**
                 * Checks whether a specified column contains only non-null values.
                 * Uses `<K extends keyof T>` to ensure type safety when specifying the column.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The name of the column to check, constrained to keys of `T`.
                 *
                 * ### Behavior
                 * - Ensures type safety by restricting `column` to existing keys of `T`.
                 * - Calls `_getNullColumnFirstRowIndex(column)` to find the first occurrence of a `null` value in the column.
                 * - If no `null` values are found, returns `true`; otherwise, returns `false`.
                 *
                 * ### Returns
                 * - **`boolean`**: `true` if the column has no `null` values, otherwise `false`.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string | null;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: null },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.isNotNullColumn("id"));   // Output: true
                 * console.log(dataModel.isNotNullColumn("name")); // Output: false
                 *
                 * // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
                 * // console.log(dataModel.isNotNullColumn("age"));
                 * ```
                 *
                 * @param {K} column The column name to check, constrained to keys of `T`.
                 * @returns {boolean} `true` if the column has no `null` values, otherwise `false`.
                 * @throws {Error} If `column` does not exist.
                 */
                isNotNullColumn = <K extends keyof T>(column: K): boolean => {
                    return this._getNullColumnFirstRowIndex(column as string) === -1;
                };
                /**
                 * Finds and returns the first row where the specified column contains a `null` value.
                 * Uses `<K extends keyof T>` to enforce type safety on the column name.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The column name to check, constrained to keys of `T`.
                 *
                 * ### Behavior
                 * - Ensures type safety by restricting `column` to existing keys of `T`.
                 * - Calls `_getNullColumnFirstRowIndex(column)` to locate the first occurrence of a `null` value.
                 * - If no `null` values are found, returns `null`.
                 * - If a `null` value is found, retrieves and returns the corresponding row using `getRow()`.
                 *
                 * ### Returns
                 * - **`T | null`**: The first row where the column has a `null` value, or `null` if none exist.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string | null;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: null },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.findFirstRowNullColumn("name"));
                 * // Output: { id: 2, name: null }
                 * 
                 * console.log(dataModel.findFirstRowNullColumn("id"));
                 * // Output: null (no null values in the "id" column)
                 *
                 * // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
                 * // console.log(dataModel.findFirstRowNullColumn("age"));
                 * ```
                 *
                 * @param {K} column The column name to check for `null` values.
                 * @returns {T | null} The first row where the column has a `null` value, or `null` if none exist.
                 * @throws {Error} If `column` does not exist.
                 */
                findFirstRowNullColumn = <K extends keyof T>(column: K): T | null => {
                    const nullColumnFirstRowIndex = this._getNullColumnFirstRowIndex(column as string);
                    if (nullColumnFirstRowIndex === -1) {
                        return null
                    } else {
                        return this.getRow(nullColumnFirstRowIndex);
                    }
                };
                /**
                 * Checks whether a specified column contains only unique values (i.e., no duplicate values).
                 * Uses `<K extends keyof T>` to enforce type safety on the column name.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The column name to check, constrained to keys of `T`.
                 *
                 * ### Behavior
                 * - Ensures type safety by restricting `column` to existing keys of `T`.
                 * - Calls `_getDuplColumnFirstRowIndex(column)` to find the first occurrence of a duplicate value in the column.
                 * - If no duplicates are found, returns `true`; otherwise, returns `false`.
                 *
                 * ### Returns
                 * - **`boolean`**: `true` if the column has no duplicate values, otherwise `false`.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Alice" }
                 * ]);
                 * 
                 * console.log(dataModel.isNotDuplColumn("id")); // Output: true
                 * console.log(dataModel.isNotDuplColumn("name")); // Output: false
                 *
                 * // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
                 * // console.log(dataModel.isNotDuplColumn("age"));
                 * ```
                 *
                 * @param {K} column The column name to check for duplicate values.
                 * @returns {boolean} `true` if the column has no duplicate values, otherwise `false`.
                 * @throws {Error} If `column` does not exist.
                 */
                isNotDuplColumn = <K extends keyof T>(column: K): boolean => {
                    return this._getDuplColumnFirstRowIndex(column as string) === -1;
                };
                /**
                 * Finds and returns the first row where the specified column contains a duplicate value.
                 * Uses `<K extends keyof T>` to ensure that the column exists in `T`, enforcing type safety.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The column name to check for duplicate values, constrained to keys of `T`.
                 *
                 * ### Behavior
                 * - Ensures type safety by restricting `column` to existing keys of `T`.
                 * - Calls `_getDuplColumnFirstRowIndex(column)` to locate the first occurrence of a duplicate value.
                 * - If no duplicate values are found, returns `null`.
                 * - If a duplicate value is found, retrieves and returns the corresponding row using `getRow()`.
                 *
                 * ### Returns
                 * - **`T | null`**: The first row where the column has a duplicate value, or `null` if no duplicates exist.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   name: string;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Alice" }
                 * ]);
                 * 
                 * console.log(dataModel.findFirstRowDuplColumn("name"));
                 * // Output: { id: 3, name: "Alice" } (the second occurrence of "Alice")
                 * 
                 * console.log(dataModel.findFirstRowDuplColumn("id"));
                 * // Output: null (no duplicate values in the "id" column)
                 *
                 * // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
                 * // console.log(dataModel.findFirstRowDuplColumn("age"));
                 * ```
                 *
                 * @param {K} column The column name to check for duplicate values.
                 * @returns {T | null} The first row where the column has a duplicate value, or `null` if none exist.
                 * @throws {Error} If `column` does not exist.
                 */
                findFirstRowDuplColumn = <K extends keyof T>(column: K): T | null => {
                    const duplColumnFirstRowIndex = this._getDuplColumnFirstRowIndex(column as string);
                    if (duplColumnFirstRowIndex === -1) {
                        return null
                    } else {
                        return this.getRow(duplColumnFirstRowIndex);
                    }
                };
                /**
                 * Checks whether all values in the specified column satisfy a given validation function.
                 * Uses `<K extends keyof T>` to ensure type safety for column selection.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The column name to validate, constrained to keys of `T`.
                 * - `validator` **(`DataModelValidator`)**: A function that takes a value as input and returns `true` if the value is valid.
                 *
                 * ### Behavior
                 * - Ensures type safety by restricting `column` to existing keys of `T`.
                 * - Calls `_getInValidColumnFirstRowIndex(column, validator)` to check for invalid values.
                 * - If no invalid values are found, returns `true`; otherwise, returns `false`.
                 *
                 * ### Returns
                 * - **`boolean`**: `true` if all values in the column are valid, otherwise `false`.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   age: number;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, age: 25 },
                 *     { id: 2, age: 30 },
                 *     { id: 3, age: "invalid" as any }
                 * ]);
                 * 
                 * // Check if all values in "age" column are valid numbers
                 * console.log(dataModel.isValidValue("age", value => typeof value === "number"));
                 * // Output: false
                 * 
                 * console.log(dataModel.isValidValue("id", value => typeof value === "number"));
                 * // Output: true
                 *
                 * // TypeScript Error: Argument of type '"name"' is not assignable to parameter of type '"id" | "age"'.
                 * // console.log(dataModel.isValidValue("name", value => typeof value === "string"));
                 * ```
                 *
                 * @param {K} column The column name to validate.
                 * @param {DataModelValidator} validator A function that checks if a value is valid.
                 * @returns {boolean} `true` if all values in the column are valid, otherwise `false`.
                 * @throws {Error} If `column` does not exist or `validator` is not a function.
                 */
                isValidValue = <K extends keyof T>(column: K, vaildator: DataModelValidator): boolean => {
                    return this._getInValidColumnFirstRowIndex(column as string, vaildator) === -1;
                };
                /**
                 * Finds and returns the first row where the specified column contains an invalid value based on a given validation function.
                 * Uses `<K extends keyof T>` to ensure type safety for column selection.
                 *
                 * ### Parameters
                 * - `column` **(K)**: The column name to validate, constrained to keys of `T`.
                 * - `validator` **(`DataModelValidator`)**: A function that takes a value as input and returns `true` if the value is valid.
                 *
                 * ### Behavior
                 * - Ensures type safety by restricting `column` to existing keys of `T`.
                 * - Calls `_getInValidColumnFirstRowIndex(column, validator)` to locate the first occurrence of an invalid value in the column.
                 * - If no invalid values are found, returns `null`.
                 * - If an invalid value is found, retrieves and returns the corresponding row using `getRow()`.
                 *
                 * ### Returns
                 * - **`T | null`**: The first row where the column has an invalid value, or `null` if all values are valid.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *   id: number;
                 *   age: number;
                 * }
                 *
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, age: 25 },
                 *     { id: 2, age: "invalid" as any },
                 *     { id: 3, age: 30 }
                 * ]);
                 * 
                 * // Find the first row where "age" contains a non-numeric value
                 * console.log(dataModel.findFirstRowInvalidValue("age", value => typeof value === "number"));
                 * // Output: { id: 2, age: "invalid" }
                 * 
                 * console.log(dataModel.findFirstRowInvalidValue("id", value => typeof value === "number"));
                 * // Output: null (all values in "id" are valid)
                 *
                 * // TypeScript Error: Argument of type '"name"' is not assignable to parameter of type '"id" | "age"'.
                 * // console.log(dataModel.findFirstRowInvalidValue("name", value => typeof value === "string"));
                 * ```
                 *
                 * @param {K} column The column name to validate.
                 * @param {DataModelValidator} validator A function that checks if a value is valid.
                 * @returns {T | null} The first row with an invalid value, or `null` if all values are valid.
                 * @throws {Error} If `column` does not exist or `validator` is not a function.
                 */
                findFirstRowInvalidValue = <K extends keyof T>(column: K, vaildator: DataModelValidator): T | null => {
                    const inValidColumnFirstRowIndex = this._getInValidColumnFirstRowIndex(column as string, vaildator);
                    if (inValidColumnFirstRowIndex === -1) {
                        return null
                    } else {
                        return this.getRow(inValidColumnFirstRowIndex);
                    }
                };
                /**
                 * Searches for rows that match a given condition and returns their indexes.
                 * Allows both positive and negative filtering based on the `isNegative` flag.
                 *
                 * ### Parameters
                 * - `condition` **(`Record<K, T[K]>`)**: An object representing the key-value conditions to match.
                 * - `isNegative` **(`boolean`, optional, default = `false`)**: If `true`, returns indexes of rows that **do not** match the condition.
                 *
                 * ### Behavior
                 * - Ensures `condition` is a valid object using `_checkOriginObject(condition)`.
                 * - Validates `isNegative` as a boolean using `_checkBoolean(isNegative)`.
                 * - Iterates through `_rows` to check if each row meets the condition.
                 * - Uses `JSON.stringify()` for deep comparison of values.
                 * - If `isNegative` is `false`, adds matching row indexes to the result.
                 * - If `isNegative` is `true`, adds **non-matching** row indexes to the result.
                 *
                 * ### Type Safety
                 * - The generic type `<K extends keyof T>` ensures that `condition` keys must exist in `T`.
                 * - `T[K]` enforces that values in `condition` match the expected type of the corresponding column.
                 *
                 * ### Returns
                 * - **`number[]`**: An array of indexes of rows that match (or do not match) the condition.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 *     age: number;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 25 }
                 * ]);
                 * 
                 * // Search for row indexes where age is 25
                 * console.log(dataModel.searchRowIndexes({ age: 25 }));
                 * // Output: [0, 2]
                 * 
                 * // Search for row indexes where age is NOT 25
                 * console.log(dataModel.searchRowIndexes({ age: 25 }, true));
                 * // Output: [1]
                 * ```
                 *
                 * @param {Record<K, T[K]>} condition The key-value condition to match.
                 * @param {boolean} [isNegative=false] If `true`, returns indexes of rows that do **not** match the condition.
                 * @returns {number[]} An array of indexes of rows that match or do not match the condition.
                 * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
                 */
                searchRowIndexes = <K extends keyof T>(condition: Record<K, T[K]>, isNegative: boolean = false): number[] => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    const matched: number[] = [];
                    _this._rows.forEach(function(row, index) {
                        let matchesCondition = true;
                        for (const key in condition) {
                            _this._checkColumn(key);
                            if ((JSON.stringify(row[key]) !== JSON.stringify(condition[key]))) {
                                matchesCondition = false;
                                break;
                            }
                        }
                        if (isNegative) {
                            if (!matchesCondition) matched.push(index);
                        } else {
                            if (matchesCondition) matched.push(index);
                        }
                    });
                    return matched;
                };
                /**
                 * Searches for rows that match a given condition and returns them as an array.
                 * Allows both positive and negative filtering based on the `isNegative` flag.
                 *
                 * ### Parameters
                 * - `condition` **(`Record<K, T[K]>`)**: An object representing the key-value conditions to match.
                 * - `isNegative` **(`boolean`, optional, default = `false`)**: If `true`, returns rows that **do not** match the condition.
                 *
                 * ### Behavior
                 * - Ensures `condition` is a valid object using `_checkOriginObject(condition)`.
                 * - Validates `isNegative` as a boolean using `_checkBoolean(isNegative)`.
                 * - Iterates through `_rows`, checking if each row meets the condition.
                 * - Uses `JSON.stringify()` for deep comparison of values.
                 * - If `isNegative` is `false`, adds matching rows to the result.
                 * - If `isNegative` is `true`, adds **non-matching** rows to the result.
                 * - Returns a deep copy of the matched rows to ensure immutability.
                 *
                 * ### Type Safety
                 * - The generic type `<K extends keyof T>` ensures that `condition` keys must exist in `T`.
                 * - `T[K]` enforces that values in `condition` match the expected type of the corresponding column.
                 *
                 * ### Returns
                 * - **`T[]`**: An array of deep-copied rows that match (or do not match) the condition.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 *     age: number;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 25 }
                 * ]);
                 * 
                 * // Search for rows where age is 25
                 * console.log(dataModel.searchRows({ age: 25 }));
                 * // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 3, name: "Charlie", age: 25 }]
                 * 
                 * // Search for rows where age is NOT 25
                 * console.log(dataModel.searchRows({ age: 25 }, true));
                 * // Output: [{ id: 2, name: "Bob", age: 30 }]
                 * ```
                 *
                 * @param {Record<K, T[K]>} condition The key-value condition to match.
                 * @param {boolean} [isNegative=false] If `true`, returns rows that do **not** match the condition.
                 * @returns {T[]} An array of deep-copied rows that match or do not match the condition.
                 * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
                 */
                searchRows = <K extends keyof T>(condition: Record<K, T[K]>, isNegative: boolean = false): T[] => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    const matched: T[] = [];
                    _this._rows.forEach(function(row) {
                        let matchesCondition = true;
                        for (const key in condition) {
                            _this._checkColumn(key);
                            if ((JSON.stringify(row[key]) !== JSON.stringify(condition[key]))) {
                                matchesCondition = false;
                                break;
                            }
                        }
                        if (isNegative) {
                            if (!matchesCondition) matched.push(_this._deepCopy(row));
                        } else {
                            if (matchesCondition) matched.push(_this._deepCopy(row));
                        }
                    });
                    return matched;
                };
                /**
                 * Searches for rows that match a given condition and returns them as a new `DataModel` instance.
                 * Allows both positive and negative filtering based on the `isNegative` flag.
                 *
                 * ### Parameters
                 * - `condition` **(`Record<K, T[K]>`)**: An object representing the key-value conditions to match.
                 * - `isNegative` **(`boolean`, optional, default = `false`)**: If `true`, returns rows that **do not** match the condition.
                 *
                 * ### Behavior
                 * - Ensures `condition` is a valid object using `_checkOriginObject(condition)`.
                 * - Validates `isNegative` as a boolean using `_checkBoolean(isNegative)`.
                 * - Iterates through `_rows`, checking if each row meets the condition.
                 * - Uses `JSON.stringify()` for deep comparison of values.
                 * - If `isNegative` is `false`, adds matching rows to the result.
                 * - If `isNegative` is `true`, adds **non-matching** rows to the result.
                 * - Returns a new `DataModel<T>` containing the filtered rows.
                 *
                 * ### Type Safety
                 * - The generic type `<K extends keyof T>` ensures that `condition` keys must exist in `T`.
                 * - `T[K]` enforces that values in `condition` match the expected type of the corresponding column.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: A new `DataModel<T>` instance containing the matched rows.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 *     age: number;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 25 }
                 * ]);
                 * 
                 * // Search for rows where age is 25 and return them as a new DataModel
                 * const filteredModel = dataModel.searchRowsAsDataModel({ age: 25 });
                 * console.log(filteredModel.getRowCount()); // Output: 2
                 * console.log(filteredModel.getRows());
                 * // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 3, name: "Charlie", age: 25 }]
                 * 
                 * // Search for rows where age is NOT 25
                 * const excludedModel = dataModel.searchRowsAsDataModel({ age: 25 }, true);
                 * console.log(excludedModel.getRows());
                 * // Output: [{ id: 2, name: "Bob", age: 30 }]
                 * ```
                 *
                 * @param {Record<K, T[K]>} condition The key-value condition to match.
                 * @param {boolean} [isNegative=false] If `true`, returns rows that do **not** match the condition.
                 * @returns {InterfaceDataModel<T>} A new `DataModel<T>` instance containing the matched rows.
                 * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
                 */
                searchRowsAsDataModel = <K extends keyof T>(condition: Record<K, T[K]>, isNegative: boolean = false): InterfaceDataModel<T> => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    const matched: T[] = [];
                    _this._rows.forEach(function(row) {
                        let matchesCondition = true;
                        for (const key in condition) {
                            _this._checkColumn(key);
                            if ((JSON.stringify(row[key]) !== JSON.stringify(condition[key]))) {
                                matchesCondition = false;
                                break;
                            }
                        }
                        if (isNegative) {
                            if (!matchesCondition) matched.push(row);
                        } else {
                            if (matchesCondition) matched.push(row);
                        }
                    });
                    return new hison.data.DataModel(matched);
                };
                /**
                 * Searches for rows that match a given condition and **modifies** the original `DataModel` 
                 * by removing matched or unmatched rows. Unlike `searchRowsAsDataModel`, this method directly 
                 * updates the existing dataset instead of returning a new instance.
                 *
                 * ### Parameters
                 * - `condition` **(`Record<K, T[K]>`)**: An object representing the key-value conditions to match.
                 * - `isNegative` **(`boolean`, optional, default = `false`)**: 
                 *   - If `false` (default), removes rows that **do not** match the condition.
                 *   - If `true`, removes rows that **do** match the condition.
                 *
                 * ### Behavior
                 * - Ensures `condition` is a valid object using `_checkOriginObject(condition)`.
                 * - Validates `isNegative` as a boolean using `_checkBoolean(isNegative)`.
                 * - Iterates through `_rows`, checking if each row meets the condition.
                 * - Uses `JSON.stringify()` for deep comparison of values.
                 * - Removes rows based on the `isNegative` flag:
                 *   - If `false`, keeps only matching rows.
                 *   - If `true`, removes matching rows.
                 * - Returns the modified `DataModel<T>` instance for method chaining.
                 *
                 * ### Type Safety
                 * - The generic type `<K extends keyof T>` ensures that `condition` keys must exist in `T`.
                 * - `T[K]` enforces that values in `condition` match the expected type of the corresponding column.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The modified `DataModel<T>` instance after removing specified rows.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 *     age: number;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 25 }
                 * ]);
                 * 
                 * // Keep only rows where age is 25
                 * dataModel.searchAndModify({ age: 25 });
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 3, name: "Charlie", age: 25 }]
                 * 
                 * // Remove rows where age is 25
                 * dataModel.searchAndModify({ age: 25 }, true);
                 * console.log(dataModel.getRows());
                 * // Output: []
                 * ```
                 *
                 * @param {Record<K, T[K]>} condition The key-value condition to match.
                 * @param {boolean} [isNegative=false] If `true`, removes rows that **match** the condition; otherwise, removes rows that **do not** match the condition.
                 * @returns {InterfaceDataModel<T>} The modified `DataModel<T>` instance after removing specified rows.
                 * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
                 */
                searchAndModify = <K extends keyof T>(condition: Record<K, T[K]>, isNegative: boolean = false): InterfaceDataModel<T> => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    for (let i = 0; i < _this._rows.length; i++ ){
                        let matchesCondition = true;
                        for (const key in condition) {
                            _this._checkColumn(key);
                            if ((JSON.stringify(_this._rows[i][key]) !== JSON.stringify(condition[key]))) {
                                matchesCondition = false;
                                break;
                            }
                        }
                        if (isNegative) {
                            if (matchesCondition) {
                                _this._rows.splice(i, 1);
                                i--;
                            }
                        } else {
                            if (!matchesCondition) {
                                _this._rows.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    return _this;
                };
                /**
                 * Filters rows in the `DataModel` based on a custom filtering function and returns their indexes.
                 * Allows for efficiently identifying row positions that match a given condition.
                 *
                 * ### Parameters
                 * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
                 *
                 * ### Behavior
                 * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
                 * - Iterates through `_rows`, applying the filter function to each row.
                 * - Collects the indexes of rows that satisfy the filter condition.
                 *
                 * ### Returns
                 * - **`number[]`**: An array of indexes of rows that match the filter condition.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 22 }
                 * ]);
                 * 
                 * // Get indexes of rows where age is greater than 25
                 * const rowIndexes = dataModel.filterRowIndexes(row => row.age > 25);
                 * console.log(rowIndexes); // Output: [1]
                 * ```
                 *
                 * @param {DataModelFillter} filter A function that determines whether a row should be included.
                 * @returns {number[]} An array of indexes of rows that match the filter condition.
                 * @throws {Error} If `filter` is not a valid function.
                 */
                filterRowIndexes = (filter: DataModelFillter): number[] => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    const matched: number[] = [];
                    _this._rows.forEach(function(row: Record<string, any>, index) {
                        if (filter(row)) {
                            matched.push(index);
                        }
                    });
                    return matched;
                };
                /**
                 * Filters rows in the `DataModel` based on a custom filtering function.
                 * Returns an array of rows that satisfy the provided filter condition.
                 *
                 * ### Parameters
                 * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
                 *
                 * ### Behavior
                 * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
                 * - Iterates through `_rows`, applying the filter function to each row.
                 * - Uses `_deepCopy()` to ensure the returned rows are independent copies.
                 * - Returns an array of matching rows.
                 *
                 * ### Returns
                 * - **`T[]`**: An array of deep-copied rows that match the filter condition.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 22 }
                 * ]);
                 * 
                 * // Filter rows where age is greater than 25
                 * const filteredRows = dataModel.filterRows(row => row.age > 25);
                 * console.log(filteredRows);
                 * // Output: [{ id: 2, name: "Bob", age: 30 }]
                 * ```
                 *
                 * @param {DataModelFillter} filter A function that determines whether a row should be included.
                 * @returns {T[]} An array of deep-copied rows that match the filter condition.
                 * @throws {Error} If `filter` is not a valid function.
                 */
                filterRows = (filter: DataModelFillter): T[] => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    const matched: T[] = [];
                    _this._rows.forEach(function(row) {
                        if (filter(row)) {
                            matched.push(_this._deepCopy(row));
                        }
                    });
                    return matched;
                };
                /**
                 * Filters rows in the `DataModel` based on a custom filtering function and returns a new `DataModel` containing the matched rows.
                 * Allows for extracting a subset of the dataset while preserving the structured format.
                 *
                 * ### Parameters
                 * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
                 *
                 * ### Behavior
                 * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
                 * - Iterates through `_rows`, applying the filter function to each row.
                 * - Collects rows that satisfy the filter condition.
                 * - Returns a new `DataModel` instance containing the filtered rows.
                 *
                 * ### Returns
                 * - **`DataModel`**: A new `DataModel` instance containing the filtered rows.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 22 }
                 * ]);
                 * 
                 * // Create a new DataModel containing only rows where age is greater than 25
                 * const filteredDataModel = dataModel.filterRowsAsDataModel(row => row.age > 25);
                 * console.log(filteredDataModel.getRowCount()); // Output: 1
                 * console.log(filteredDataModel.getRow(0)); // Output: { id: 2, name: "Bob", age: 30 }
                 * ```
                 *
                 * @param {DataModelFillter} filter A function that determines whether a row should be included.
                 * @returns {InterfaceDataModel<T>} A new `DataModel` instance containing the filtered rows.
                 * @throws {Error} If `filter` is not a valid function.
                 */
                filterRowsAsDataModel = (filter: DataModelFillter): InterfaceDataModel<T> => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    const matched: T[] = [];
                    _this._rows.forEach(function(row) {
                        if (filter(row)) {
                            matched.push(row);
                        }
                    });
                    return new hison.data.DataModel(matched);
                };
                /**
                 * Filters rows in the `DataModel` based on a custom filtering function and **modifies** the original `DataModel` by removing unmatched rows.
                 * This method directly updates the existing dataset instead of returning a new instance.
                 *
                 * ### Parameters
                 * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be retained.
                 *
                 * ### Behavior
                 * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
                 * - Iterates through `_rows`, applying the filter function to each row.
                 * - Removes rows that do **not** satisfy the filter condition.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ### Returns
                 * - **`DataModel`**: The modified `DataModel` instance with only the filtered rows.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 22 }
                 * ]);
                 * 
                 * // Remove all rows where age is 25 or below
                 * dataModel.filterAndModify(row => row.age > 25);
                 * 
                 * console.log(dataModel.getRowCount()); // Output: 1
                 * console.log(dataModel.getRow(0)); // Output: { id: 2, name: "Bob", age: 30 }
                 * ```
                 *
                 * @param {DataModelFillter} filter A function that determines whether a row should be retained.
                 * @returns {InterfaceDataModel<T>} The modified `DataModel` instance after removing unmatched rows.
                 * @throws {Error} If `filter` is not a valid function.
                 */
                filterAndModify = (filter: DataModelFillter): InterfaceDataModel<T> => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    for (let i = 0; i < _this._rows.length; i++ ){
                        if (!filter(_this._rows[i])) {
                            _this._rows.splice(i, 1);
                            i--;
                        }
                    }
                    return _this;
                };
                /**
                 * Reorders the columns in the `DataModel` based on the specified order.
                 * Ensures that all existing columns are included, maintaining the defined structure.
                 *
                 * ### Parameters
                 * - `columns` **(`K[]`)**: An array of column names in the desired order.
                 *
                 * ### Behavior
                 * - Calls `_checkArray(columns)` to validate the input as an array.
                 * - Ensures that each column in `columns` exists in the `DataModel` using `_checkColumn(column)`.
                 * - Constructs a new column order by placing unspecified columns at the end.
                 * - Updates `_cols` with the new column order.
                 * - Returns the modified `DataModel<T>` instance for method chaining.
                 *
                 * ### Type Safety
                 * - Uses `<K extends keyof T>` to ensure that `columns` only contain valid keys of `T`.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The modified `DataModel<T>` instance with reordered columns.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 *     age: number;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>(["id", "name", "age"]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * 
                 * // Change column order
                 * dataModel.setColumnSorting(["age", "name"]);
                 * console.log(dataModel.getColumns()); // Output: ["age", "name", "id"]
                 * ```
                 *
                 * @param {K[]} columns An array of column names in the desired order.
                 * @returns {InterfaceDataModel<T>} The modified `DataModel<T>` instance with reordered columns.
                 * @throws {Error} If `columns` is not an array or contains invalid column names.
                 */
                setColumnSorting = <K extends keyof T>(columns: K[]): InterfaceDataModel<T> => {
                    this._checkArray(columns);
                    const newColumns = [];
                    for(let column of columns) {
                        column = this._getValidColValue(column as string) as K;
                        this._checkColumn(column as string);
                        newColumns.push(column);
                    }
                    for(const column of this._cols) {
                        if (!newColumns.includes(column)) {
                            newColumns.push(column)
                        }
                    }
                    this._cols = newColumns;
                    return this;
                };
                /**
                 * Sorts the columns of the `DataModel` in ascending (A-Z) order.
                 * The sorting is applied alphabetically based on column names.
                 *
                 * ### Behavior
                 * - Calls the native `Array.sort()` method on `_cols` to rearrange columns in ascending order.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ### Returns
                 * - **`DataModel`**: The modified `DataModel` instance with columns sorted in ascending order.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["name", "id", "age"]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
                 * 
                 * dataModel.sortColumnAscending();
                 * console.log(dataModel.getColumns()); // Output: ["age", "id", "name"]
                 * ```
                 *
                 * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with columns sorted in ascending order.
                 */
                sortColumnAscending = (): InterfaceDataModel<T> => {
                    this._cols.sort();
                    return this;
                };
                /**
                 * Sorts the columns of the `DataModel` in descending (Z-A) order.
                 * The sorting is applied alphabetically based on column names.
                 *
                 * ### Behavior
                 * - Calls the native `Array.sort()` method on `_cols` with a custom comparator to sort columns in descending order.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ### Returns
                 * - **`DataModel`**: The modified `DataModel` instance with columns sorted in descending order.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["name", "id", "age"]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
                 * 
                 * dataModel.sortColumnDescending();
                 * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
                 * ```
                 *
                 * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with columns sorted in descending order.
                 */
                sortColumnDescending = (): InterfaceDataModel<T> => {
                    this._cols.sort(function(a, b) {
                        if (a > b) {
                            return -1;
                        }
                        if (a < b) {
                            return 1;
                        }
                        return 0;
                    });
                    return this;
                };
                /**
                 * Reverses the order of columns in the `DataModel`.
                 * The column order is flipped without sorting alphabetically.
                 *
                 * ### Behavior
                 * - Calls the native `Array.reverse()` method on `_cols` to reverse the column order.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ### Returns
                 * - **`DataModel`**: The modified `DataModel` instance with reversed column order.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name", "age"]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * 
                 * dataModel.sortColumnReverse();
                 * console.log(dataModel.getColumns()); // Output: ["age", "name", "id"]
                 * ```
                 *
                 * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with reversed column order.
                 */
                sortColumnReverse = (): InterfaceDataModel<T> => {
                    this._cols.reverse();
                    return this;
                };
                /**
                 * Sorts the rows of the `DataModel` in ascending order based on the specified column.
                 * Optionally supports integer-based sorting for numerical values.
                 *
                 * ### Parameters
                 * - `column` **(`K`)**: The column name to sort by.
                 * - `isIntegerOrder` **(`boolean`, optional, default = `false`)**: If `true`, treats values as integers for sorting.
                 *
                 * ### Behavior
                 * - Validates `column` using `_getValidColValue(column)`.
                 * - Ensures `column` exists in the `DataModel` with `_checkColumn(column)`.
                 * - Validates `isIntegerOrder` using `_checkBoolean(isIntegerOrder)`.
                 * - Uses `Array.sort()` to sort rows in ascending order.
                 * - Places `null` values at the end of the sorted list.
                 * - Converts object values to JSON strings for sorting consistency.
                 * - If `isIntegerOrder` is `true`, parses values as integers before sorting.
                 * - Throws an error if a non-numeric value is encountered in integer sorting mode.
                 *
                 * ### Type Safety
                 * - Uses `<K extends keyof T>` to ensure `column` is a valid key of `T`.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The modified `DataModel<T>` instance with rows sorted in ascending order.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 3, name: "Charlie" },
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * // Sort rows by "id" in ascending order
                 * dataModel.sortRowAscending("id");
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
                 * 
                 * // Sort rows numerically by "id"
                 * dataModel.sortRowAscending("id", true);
                 * ```
                 *
                 * @param {K} column The column name to sort by.
                 * @param {boolean} [isIntegerOrder=false] If `true`, treats values as integers for sorting.
                 * @returns {InterfaceDataModel<T>} The modified `DataModel<T>` instance with rows sorted in ascending order.
                 * @throws {Error} If `column` is invalid or contains non-numeric values in integer mode.
                 */
                sortRowAscending = <K extends keyof T>(column: K, isIntegerOrder: boolean = false): InterfaceDataModel<T> => {
                    column = this._getValidColValue(column as string) as K;
                    this._checkColumn(column as string);
                    this._checkBoolean(isIntegerOrder);
                    this._rows.sort(function(a, b) {
                        let valueA: any = a[column];
                        let valueB: any = b[column];
                        if (valueA === null || valueB === null) {
                            return valueA === null ? 1 : -1;
                        }
                        if (typeof valueA === 'object' || typeof valueB === 'object') {
                            valueA = JSON.stringify(valueA);
                            valueB = JSON.stringify(valueB);
                        }
                        if (isIntegerOrder) {
                            valueA = parseInt(valueA, 10);
                            valueB = parseInt(valueB, 10);
                            if (isNaN(valueA) || isNaN(valueB)) {
                                throw new Error('Cannot sort rows: non-integer value encountered.');
                            }
                        }
                        if (valueA < valueB) {
                            return -1;
                        }
                        if (valueA > valueB) {
                            return 1;
                        }
                        return 0;
                    });
                    return this;
                };
                /**
                 * Sorts the rows of the `DataModel` in descending order based on the specified column.
                 * Optionally supports integer-based sorting for numerical values.
                 *
                 * ### Parameters
                 * - `column` **(`K`)**: The column name to sort by.
                 * - `isIntegerOrder` **(`boolean`, optional, default = `false`)**: If `true`, treats values as integers for sorting.
                 *
                 * ### Behavior
                 * - Validates `column` using `_getValidColValue(column)`.
                 * - Ensures `column` exists in the `DataModel` with `_checkColumn(column)`.
                 * - Validates `isIntegerOrder` using `_checkBoolean(isIntegerOrder)`.
                 * - Uses `Array.sort()` to sort rows in descending order.
                 * - Places `null` values at the beginning of the sorted list.
                 * - Converts object values to JSON strings for sorting consistency.
                 * - If `isIntegerOrder` is `true`, parses values as integers before sorting.
                 * - Throws an error if a non-numeric value is encountered in integer sorting mode.
                 *
                 * ### Type Safety
                 * - Uses `<K extends keyof T>` to ensure `column` is a valid key of `T`.
                 *
                 * ### Returns
                 * - **`InterfaceDataModel<T>`**: The modified `DataModel<T>` instance with rows sorted in descending order.
                 *
                 * ### Example Usage
                 * ```typescript
                 * interface User {
                 *     id: number;
                 *     name: string;
                 * }
                 * 
                 * const dataModel = new hison.data.DataModel<User>([
                 *     { id: 3, name: "Charlie" },
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * // Sort rows by "id" in descending order
                 * dataModel.sortRowDescending("id");
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 3, name: "Charlie" }, { id: 2, name: "Bob" }, { id: 1, name: "Alice" }]
                 * 
                 * // Sort rows numerically by "id"
                 * dataModel.sortRowDescending("id", true);
                 * ```
                 *
                 * @param {K} column The column name to sort by.
                 * @param {boolean} [isIntegerOrder=false] If `true`, treats values as integers for sorting.
                 * @returns {InterfaceDataModel<T>} The modified `DataModel<T>` instance with rows sorted in descending order.
                 * @throws {Error} If `column` is invalid or contains non-numeric values in integer mode.
                 */
                sortRowDescending = <K extends keyof T>(column: K, isIntegerOrder: boolean = false): InterfaceDataModel<T> => {
                    column = this._getValidColValue(column as string) as K;
                    this._checkColumn(column as string);
                    this._checkBoolean(isIntegerOrder);
                    this._rows.sort(function(a, b) {
                        let valueA: any = a[column];
                        let valueB: any = b[column];
                        if (valueA === null || valueB === null) {
                            return valueA === null ? -1 : 1;
                        }
                        if (typeof valueA === 'object' || typeof valueB === 'object') {
                            valueA = JSON.stringify(valueA);
                            valueB = JSON.stringify(valueB);
                        }
                        if (isIntegerOrder) {
                            valueA = parseInt(valueA, 10);
                            valueB = parseInt(valueB, 10);
                            if (isNaN(valueA) || isNaN(valueB)) {
                                throw new Error('Cannot sort rows: non-integer value encountered.');
                            }
                        }
                        if (valueA < valueB) {
                            return 1;
                        }
                        if (valueA > valueB) {
                            return -1;
                        }
                        return 0;
                    });
                    return this;
                };
                /**
                 * Reverses the order of rows in the `DataModel`.
                 * This method flips the row order without sorting by a specific column.
                 *
                 * ### Behavior
                 * - Calls the native `Array.reverse()` method on `_rows` to reverse the row order.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ### Returns
                 * - **`DataModel`**: The modified `DataModel` instance with reversed row order.
                 *
                 * ### Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
                 * 
                 * dataModel.sortRowReverse();
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 3, name: "Charlie" }, { id: 2, name: "Bob" }, { id: 1, name: "Alice" }]
                 * ```
                 *
                 * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with reversed row order.
                 */
                sortRowReverse = (): InterfaceDataModel<T> => {
                    this._rows.reverse();
                    return this;
                };
            },
        };
        link = {
            /**
             * **`CachingModule` - A module for API response caching and real-time WebSocket updates.**
             *
             * The `CachingModule` provides a caching mechanism for API responses using an **LRU (Least Recently Used) strategy** 
             * while integrating **WebSocket communication** for real-time data updates.
             *
             * ### **Key Features**
             * - **LRU Cache for API Responses**: Stores API responses with a configurable limit, reducing redundant network requests.
             * - **WebSocket Support**: Maintains a persistent WebSocket connection for real-time data updates.
             * - **Cache Management Methods**: Supports cache operations (`get`, `put`, `remove`, `clear`, etc.).
             * - **Event-Driven Communication**: Allows event listeners (`onopen`, `onmessage`, `onclose`, `onerror`) for WebSocket handling.
             * - **Flexible Configuration**: Uses `CustomOption` settings for cache limits and WebSocket parameters.
             * - **Validation Methods**: Ensures proper data types for cache keys and event listeners.
             *
             * ### **How It Works**
             * - **API responses are stored in an LRUCache instance**, avoiding redundant network calls.
             * - **When a WebSocket connection is established**, data updates can be received in real-time.
             * - **Cache data can be accessed and managed using `get`, `put`, `remove`, and `clear` methods.**
             * - **WebSocket event handlers can be set up for real-time notifications.**
             *
             * ### **Example Usage**
             * ```typescript
             * // Create a CachingModule instance with a cache limit of 20
             * const cachingModule = new hison.link.CachingModule(20);
             * 
             * // Store API response in the cache
             * cachingModule.put("users", fetch("/api/users").then(response => response.json()));
             * 
             * // Retrieve cached data
             * cachingModule.get("users").then(data => console.log(data));
             * 
             * // Register WebSocket event handlers
             * cachingModule.onopen = () => console.log("WebSocket Connected");
             * cachingModule.onmessage = event => console.log("New Message:", event.data);
             * ```
             *
             * ### **Internal Structure**
             * - **Uses `LRUCache`** to manage cached responses with a defined limit.
             * - **Maintains a WebSocket connection** to receive real-time data updates.
             * - **Supports configurable options via `CustomOption`**, such as WebSocket endpoint and cache size.
             * - **Provides utility methods** for cache validation, data retrieval, and event handling.
             *
             * ### **Related Components**
             * - **`LRUCache`**: Handles the caching logic for API responses.
             * - **`WebSocket`**: Establishes a real-time connection for live data updates.
             * - **`CustomOption`**: Provides configurable options for WebSocket and cache settings.
             * - **`ApiLink`**: Uses this module to fetch and store API responses efficiently.
             *
             * ### **Return Value**
             * - This module **returns an instance of `CachingModule`**, which allows cache operations and WebSocket event management.
             *
             * ### **Typical Use Cases**
             * - **Reducing unnecessary API calls** by storing frequently accessed responses.
             * - **Receiving real-time updates** from the server without polling.
             * - **Efficiently managing API response data** in web applications.
             * - **Supporting offline or low-latency scenarios** by using cached responses.
             */
            CachingModule: class implements InterfaceCachingModule {
                /**
                 * **Creates an instance of `CachingModule`, initializing an LRU cache and a WebSocket connection.**
                 *
                 * The constructor sets up the **WebSocket connection** for real-time updates and 
                 * **instantiates an `LRUCache`** to manage API response caching.
                 *
                 * ### **Parameters**
                 * - `cachingLimit` *(optional, number)* - The maximum number of items the cache can store.  
                 *   - **Default:** `customOption.cachingLimit`
                 *
                 * ### **Initialization Process**
                 * 1. **Establishes a WebSocket connection** using the protocol, domain, and endpoint specified in `CustomOption`.
                 * 2. **Configures WebSocket event handlers** (`onopen`, `onmessage`, `onclose`, `onerror`).
                 * 3. **Creates an LRUCache instance** with the specified caching limit.
                 * 4. **Marks this instance as a valid caching module** using `_isCachingModule = true`.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating a caching module with a default caching limit
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Creating a caching module with a custom limit of 50 entries
                 * const customCachingModule = new hison.link.CachingModule(50);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_webSocket`** *(WebSocket)* - The WebSocket connection instance.
                 * - **`_LRUCache`** *(LRUCache)* - The LRU-based cache for storing API responses.
                 * - **`_isCachingModule`** *(boolean)* - A flag indicating whether this instance is a caching module.
                 *
                 * @param {number} [cachingLimit=customOption.link.cachingLimit] - The maximum number of cached responses.
                 */
                constructor(cachingLimit: number = customOption.link.cachingLimit) {
                    this._webSocket = new WebSocket(customOption.link.webSocketProtocol + customOption.link.domain + customOption.link.webSocketEndPoint);
                    this._webSocket.onopen = function() {};
                    this._webSocket.onmessage = function() {};
                    this._webSocket.onclose = function() {};
                    this._webSocket.onerror = function() {};
                    this._LRUCache = new LRUCache(cachingLimit);
                    this._isCachingModule = true;
                };
                private _webSocket: WebSocket;
                private _LRUCache: LRUCache;
                private _isCachingModule: boolean;
                private _checkTypeString = (str: string) => {
                    if(typeof str !== 'string') {
                        throw new Error('key is only a string.');
                    }
                }
                private _checkTypeFunction = (func: Function | null) => {
                    if (func && typeof func !== 'function') {
                        throw new Error('Please enter only the function.');
                    }
                }
                private _checkWebSocketConnection = (): number => {
                    if (this._webSocket.readyState === WebSocket.OPEN) {
                        return 1;
                    } else if (this._webSocket.readyState === WebSocket.CONNECTING) {
                        return 0;
                    } else {
                        return -1;
                    }
                };
                /**
                 * **Checks whether this instance is a valid caching module.**
                 *
                 * This method returns a boolean flag indicating whether the current instance 
                 * is recognized as a `CachingModule`. This is useful for validating whether 
                 * an instance supports caching functionalities.
                 *
                 * ### **Return Value**
                 * - `true` if this instance is a caching module.
                 * - `false` if caching is not enabled.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * console.log(cachingModule.getIsCachingModule()); // true
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_isCachingModule`** *(boolean)* - Stores the module's caching capability status.
                 *
                 * @returns {boolean} `true` if this instance is a caching module.
                 */
                getIsCachingModule = (): boolean => {
                    return this._isCachingModule;
                };
                /**
                 * **Checks if the cache contains a specific key.**
                 *
                 * This method verifies if the specified `key` exists in the LRU cache. It ensures 
                 * that the key is a valid string and then delegates the check to the underlying 
                 * `LRUCache` instance.
                 *
                 * ### **Parameters**
                 * - `key` *(string)* - The key to check in the cache.
                 *
                 * ### **Return Value**
                 * - `true` if the cache contains the specified key.
                 * - `false` if the key is not found in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * console.log(cachingModule.hasKey("user123")); // true
                 * console.log(cachingModule.hasKey("user456")); // false
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`_checkTypeString(key)`** - Ensures the key is a valid string before performing the cache check.
                 * - **`_LRUCache.hasKey(key)`** - The internal method that checks the existence of the key in the cache.
                 *
                 * @param {string} key - The key to check in the cache.
                 * @returns {boolean} `true` if the cache contains the key, otherwise `false`.
                 */
                hasKey = (key: string): boolean => {
                    this._checkTypeString(key);
                    return this._LRUCache.hasKey(key);
                };
                /**
                 * **Retrieves cached data for a given key.**
                 *
                 * Fetches the cached API response associated with `key`, returning a promise.
                 * If the key does not exist in the cache, `null` is returned.
                 *
                 * ### **Parameters**
                 * - `key` *(string)* - The cache key to retrieve.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(T)* - The cached API response.
                 *   - `response` *(Response)* - The original HTTP response.
                 * - Returns `null` if the key does not exist.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Store API response in the cache
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * 
                 * // Retrieve cached data
                 * cachingModule.get("user123").then(data => console.log(data));
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`hasKey(key)`** - Checks if a key exists in the cache.
                 * - **`remove(key)`** - Removes a key from the cache.
                 *
                 * @param {string} key - The cache key to retrieve.
                 * @returns {Promise<{ data: T; response: Response }>} | null
                 */
                get = <T = any>(key: string): Promise<{ data: T; response: Response; }> | null => {
                    this._checkTypeString(key);
                    return this._LRUCache.get(key);
                };
                /**
                 * **Stores API response data in the cache.**
                 *
                 * This method saves the provided `value` (API response) in the cache with the specified `key`.
                 * Before storing the data, it validates that the `key` is a string.
                 *
                 * ### **Parameters**
                 * - `key` *(string)* - The cache key under which the response will be stored.
                 * - `value` *(Promise<{ data: any; response: Response }>)*
                 *   - A promise resolving to an object containing:
                 *     - `data` *(any)* - The API response data.
                 *     - `response` *(Response)* - The original HTTP response object.
                 *
                 * ### **Behavior**
                 * - If the `key` already exists, the old value is **replaced** with the new one.
                 * - If the cache reaches its limit, the **least recently used (LRU) entry is removed**.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Store an API response in the cache
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`hasKey(key)`** - Checks if a key exists in the cache.
                 * - **`remove(key)`** - Removes a specific key from the cache.
                 *
                 * @param {string} key - The cache key under which the response will be stored.
                 * @param {Promise<{ data: any; response: Response }>} value - The API response to be cached.
                 */
                put = (key: string, value: Promise<{ data: any; response: Response; }>) => {
                    this._checkTypeString(key);
                    this._LRUCache.put(key, value);
                };
                /**
                 * **Removes a key from the cache and returns its value.**
                 *
                 * Retrieves the cached response for `key` before deleting it.  
                 * If the key does not exist, returns `null`.
                 *
                 * ### **Parameters**
                 * - `key` *(string)* - The cache key to remove.
                 *
                 * ### **Behavior**
                 * - Ensures `key` is a valid string before proceeding.
                 * - Fetches the cached data for `key`, if available.
                 * - Deletes the key from the cache.
                 * - Returns the cached data before deletion, or `null` if not found.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Store an API response in the cache
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * 
                 * // Remove and retrieve cached data
                 * cachingModule.remove("user123").then(data => console.log(data));
                 * 
                 * // Verify key removal
                 * console.log(cachingModule.hasKey("user123")); // false
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`clear()`** - Removes all cached entries.
                 *
                 * @param {string} key - The cache key to remove.
                 * @returns {Promise<{ data: T; response: Response; }> | null} The cached response before removal, or `null` if not found.
                 */
                remove = <T = any>(key: string): Promise<{ data: T; response: Response; }> | null => {
                    this._checkTypeString(key);
                    const result = this._LRUCache.get(key);
                    this._LRUCache.remove(key);
                    return result;
                };
                /**
                 * **Retrieves all cached data as a key-value object.**
                 *
                 * Returns the entire cache as a `Record<string, Promise<{ data: T; response: Response }>>`,  
                 * where each key corresponds to a cached API response.
                 *
                 * ### **Return Value**
                 * - A `Record<string, Promise<{ data: T; response: Response }>>`, where:
                 *   - `key` *(string)* - The cache key.
                 *   - `value` *(Promise<{ data: T; response: Response }>>)* - A promise resolving to:
                 *     - `data` *(T)* - The API response data.
                 *     - `response` *(Response)* - The original HTTP response object.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Store multiple API responses in the cache
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * cachingModule.put("posts", fetch("/api/posts").then(response => response.json()));
                 * 
                 * // Retrieve all cached data
                 * console.log(cachingModule.getAll());
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`getKeys()`** - Retrieves all cache keys.
                 * - **`clear()`** - Removes all cached entries.
                 *
                 * @returns {Record<string, Promise<{ data: T; response: Response }>>} An object containing all cached responses.
                 */
                getAll = <T = any>(): Record<string, Promise<{ data: T; response: Response; }>>  => {
                    return this._LRUCache.getAll();
                };
                /**
                 * **Retrieves all cache keys.**
                 *
                 * This method returns an array of all keys currently stored in the cache.
                 *
                 * ### **Return Value**
                 * - An array of strings representing the cache keys.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Store multiple API responses in the cache
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * cachingModule.put("posts", fetch("/api/posts").then(response => response.json()));
                 * 
                 * // Retrieve all cache keys
                 * console.log(cachingModule.getKeys()); // ["user123", "posts"]
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`getAll()`** - Retrieves all cached data as a key-value object.
                 * - **`clear()`** - Removes all cached entries.
                 *
                 * @returns {string[]} An array of cache keys.
                 */
                getKeys = (): string[] => {
                    return this._LRUCache.getKeys();
                };
                /**
                 * **Clears all cached data.**
                 *
                 * This method removes all entries from the cache, resetting it to an empty state.
                 *
                 * ### **Behavior**
                 * - All cached responses are permanently deleted.
                 * - The cache size is reset to zero.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Store multiple API responses in the cache
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * cachingModule.put("posts", fetch("/api/posts").then(response => response.json()));
                 * 
                 * // Clear all cached data
                 * cachingModule.clear();
                 * 
                 * // Verify that the cache is empty
                 * console.log(cachingModule.getKeys()); // []
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`getAll()`** - Retrieves all cached data as a key-value object.
                 * - **`getKeys()`** - Retrieves all cache keys.
                 *
                 * @returns {void}
                 */
                clear = () => {
                    this._LRUCache.clear();
                };
                /**
                 * **Registers an event handler for the WebSocket `open` event.**
                 *
                 * This method assigns a custom event handler to be executed when the WebSocket connection is successfully opened.
                 *
                 * ### **Parameters**
                 * - `func` *(function | null)* - A callback function to handle the WebSocket `open` event.
                 *   - If `null` is provided, the event handler is cleared.
                 *
                 * ### **Behavior**
                 * - Ensures that the provided function is valid before assigning it as the event handler.
                 * - When the WebSocket connection is established, the specified function is invoked.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Register a WebSocket open event handler
                 * cachingModule.onopen = (event) => {
                 *     console.log("WebSocket connected:", event);
                 * };
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`onmessage(func)`** - Registers a handler for incoming WebSocket messages.
                 * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
                 * - **`onerror(func)`** - Registers a handler for WebSocket error events.
                 *
                 * @param {(this: WebSocket, ev: Event) => any | null} func - The event handler function for the WebSocket `open` event.
                 */
                onopen = (func: ((this: WebSocket, ev: Event) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onopen = func;
                };
                /**
                 * **Registers an event handler for the WebSocket `message` event.**
                 *
                 * This method assigns a custom event handler to be executed whenever a message is received 
                 * through the WebSocket connection.
                 *
                 * ### **Parameters**
                 * - `func` *(function | null)* - A callback function to handle incoming WebSocket messages.
                 *   - If `null` is provided, the event handler is cleared.
                 *
                 * ### **Behavior**
                 * - Ensures that the provided function is valid before assigning it as the event handler.
                 * - When a message is received, the specified function is invoked with the event data.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Register a WebSocket message event handler
                 * cachingModule.onmessage = (event) => {
                 *     console.log("Received WebSocket message:", event.data);
                 * };
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
                 * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
                 * - **`onerror(func)`** - Registers a handler for WebSocket error events.
                 *
                 * @param {(this: WebSocket, ev: MessageEvent) => any | null} func - The event handler function for WebSocket messages.
                 */
                onmessage = (func: ((this: WebSocket, ev: MessageEvent) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onmessage = func;
                };
                /**
                 * **Registers an event handler for the WebSocket `close` event.**
                 *
                 * This method assigns a custom event handler to be executed when the WebSocket connection is closed.
                 *
                 * ### **Parameters**
                 * - `func` *(function | null)* - A callback function to handle the WebSocket `close` event.
                 *   - If `null` is provided, the event handler is cleared.
                 *
                 * ### **Behavior**
                 * - Ensures that the provided function is valid before assigning it as the event handler.
                 * - When the WebSocket connection is closed, the specified function is invoked with the event data.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Register a WebSocket close event handler
                 * cachingModule.onclose = (event) => {
                 *     console.log("WebSocket closed:", event);
                 * };
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
                 * - **`onmessage(func)`** - Registers a handler for incoming WebSocket messages.
                 * - **`onerror(func)`** - Registers a handler for WebSocket error events.
                 *
                 * @param {(this: WebSocket, ev: CloseEvent) => any | null} func - The event handler function for WebSocket disconnection.
                 */
                onclose = (func: ((this: WebSocket, ev: CloseEvent) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onclose = func;
                };
                /**
                 * **Registers an event handler for the WebSocket `error` event.**
                 *
                 * This method assigns a custom event handler to be executed when a WebSocket error occurs.
                 *
                 * ### **Parameters**
                 * - `func` *(function | null)* - A callback function to handle WebSocket errors.
                 *   - If `null` is provided, the event handler is cleared.
                 *
                 * ### **Behavior**
                 * - Ensures that the provided function is valid before assigning it as the event handler.
                 * - When an error occurs in the WebSocket connection, the specified function is invoked with the event data.
                 * - **Note:** The implementation currently assigns the function to `onclose` instead of `onerror`,
                 *   which may require correction.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Register a WebSocket error event handler
                 * cachingModule.onerror = (event) => {
                 *     console.error("WebSocket error:", event);
                 * };
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
                 * - **`onmessage(func)`** - Registers a handler for incoming WebSocket messages.
                 * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
                 *
                 * @param {(this: WebSocket, ev: Event) => any | null} func - The event handler function for WebSocket errors.
                 */
                onerror = (func: ((this: WebSocket, ev: Event) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onclose = func;
                };
                /**
                 * **Checks the current state of the WebSocket connection.**
                 *
                 * This method returns an integer representing the current status of the WebSocket connection.
                 *
                 * ### **Return Value**
                 * - `1` → The WebSocket connection is open.
                 * - `0` → The WebSocket connection is in the process of connecting.
                 * - `-1` → The WebSocket connection is closed or unavailable.
                 *
                 * ### **Behavior**
                 * - Internally calls `_checkWebSocketConnection()` to determine the WebSocket state.
                 * - Useful for monitoring connection status and handling reconnection logic if needed.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Check WebSocket connection status
                 * const status = cachingModule.isWebSocketConnection();
                 * console.log(status); // Output: 1 (open), 0 (connecting), or -1 (closed)
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
                 * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
                 * - **`onerror(func)`** - Registers a handler for WebSocket error events.
                 *
                 * @returns {number} The WebSocket connection status (`1`: open, `0`: connecting, `-1`: closed).
                 */
                isWebSocketConnection = (): number => {
                    return this._checkWebSocketConnection();
                };
            },
            /**
             * **`ApiGet<T>` - A generic class for handling HTTP GET requests within the `hison.link` module.**
             *
             * The `ApiGet<T>` class is responsible for sending HTTP GET requests to a specified API resource.
             * It allows defining a **custom response type** using the generic parameter `T`, providing strong typing for API responses.
             * 
             * ### **Key Features**
             * - **Executes HTTP GET requests** using `ApiLink`.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows defining the expected response type** via the generic parameter `T` (default: `InterfaceDataWrapper`).
             *
             * ### **How It Works**
             * - When instantiated, `ApiGet<T>` stores the API resource path and an optional `CachingModule` instance.
             * - The `call()` method triggers a GET request and returns a `Promise<{ data: T; response: Response }>`.
             * - If caching is enabled, previously stored responses may be returned instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ### **Example Usage**
             * ```typescript
             * // Default usage (response type: InterfaceDataWrapper)
             * const apiGet = new hison.link.ApiGet("/users");
             * apiGet.call().then(response => {
             *     console.log(response?.data); // Type: InterfaceDataWrapper
             * });
             *
             * // Specifying a custom response type (User[])
             * interface User {
             *     id: number;
             *     name: string;
             * }
             * const apiGetUsers = new hison.link.ApiGet<User[]>("/users");
             * apiGetUsers.call().then(response => {
             *     console.log(response?.data); // Type: User[]
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiGet = new hison.link.ApiGet<User[]>("/users", cachingModule);
             * 
             * // Handling request events
             * cachedApiGet.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("GET request completed!", data);
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-based request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Return Value**
             * - This class returns an instance of `ApiGet<T>`, which provides methods for executing GET requests and managing request events.
             *
             * ### **Typical Use Cases**
             * - **Fetching data from a REST API** with strong type support.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             *
             * @template T - The expected response data type (default: `InterfaceDataWrapper`).
             */
            ApiGet: class<T = InterfaceDataWrapper> implements InterfaceApiGet<T> {
                /**
                 * **Creates an instance of `ApiGet`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making GET requests to a specified resource path.
                 *
                 * ### **Parameters**
                 * - `resourcePath` *(optional, string)* - The API resource path for the GET request.
                 *   - **Default:** `''` (empty string)
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 2. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 3. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 4. **Stores the API resource path.**
                 *    - Defines the endpoint for the GET request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiGet instance without caching
                 * const apiGet = new hison.link.ApiGet("/users");
                 * 
                 * // Creating an ApiGet instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiGet = new hison.link.ApiGet("/users", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_resourcePath`** *(string)* - Stores the API resource path.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} [resourcePath=''] - The API resource path.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 */
                constructor(resourcePath: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._resourcePath = resourcePath;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _resourcePath: string;
                /**
                 * **Executes an HTTP GET request to the specified resource path.**
                 *
                 * This method sends a GET request using `ApiLink`, optionally applying caching if a `CachingModule` is provided.
                 * It **invokes a pre-request hook** (`hison.setBeforeGetRequest`) and **emits a request-start event**
                 * (`"requestStarted_GET"`) before execution.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or query parameters.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **`hison.setBeforeGetRequest((resourcePath, options) => {})`**
                 *   - A customizable hook executed **before sending the GET request**.
                 *   - If it returns `false`, the request is **prevented from execution**.
                 *   - **Use Case:** Validating request parameters or implementing conditional request logic.
                 *
                 * ### **Event Emission**
                 * - **`"requestStarted_GET"` Event**
                 *   - This event is emitted **before the GET request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(T)* - The API response data, **typed according to the generic parameter `T`**.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ### **Behavior**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If the data is not cached, it makes an HTTP GET request to `_resourcePath`.
                 * - Before executing the request:
                 *   - The **before-request hook (`beforeGetRequest`)** is checked.
                 *   - The **event `"requestStarted_GET"`** is emitted.
                 * - Once the request is completed, the response is returned and optionally stored in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Default usage (response type: InterfaceDataWrapper)
                 * const apiGet = new hison.link.ApiGet("/users");
                 * apiGet.call().then(response => {
                 *     console.log(response?.data); // Type: InterfaceDataWrapper
                 * });
                 * 
                 * // Specifying a custom response type (User[])
                 * interface User {
                 *     id: number;
                 *     name: string;
                 * }
                 * const apiGetUsers = new hison.link.ApiGet<User[]>("/users");
                 * apiGetUsers.call().then(response => {
                 *     console.log(response?.data); // Type: User[]
                 * });
                 *
                 * // Handling request events
                 * apiGetUsers.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("GET request completed!", data);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @template T - The expected response data type.
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
                 */
                call = (options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.get(this._resourcePath, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified resource path.**
                 *
                 * This method retrieves only the headers from the specified resource without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - The method delegates the request execution to `ApiLink.head()`.
                 * - The response body is **not** included in the result, only headers are returned.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiGet = new hison.link.ApiGet("/users");
                 * 
                 * // Sending a HEAD request
                 * apiGet.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiGet.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(options)`** - Sends a GET request to retrieve full response data.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(this._resourcePath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified resource path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified resource 
                 * without performing an actual data operation.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - The method delegates the request execution to `ApiLink.options()`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiGet = new hison.link.ApiGet("/users");
                 * 
                 * // Sending an OPTIONS request
                 * apiGet.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiGet.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(options)`** - Sends a GET request to retrieve full response data.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._resourcePath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a GET request.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string)* - The name of the event to listen for.
                 * - `eventFunc` *(function)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_GET"` - Triggered when a GET request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiGet = new hison.link.ApiGet("/users");
                 * 
                 * // Register an event listener for when the request completes
                 * apiGet.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("GET request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiGet.onEventEmit("requestError", (error) => {
                 *     console.error("GET request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(options)`** - Sends a GET request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('GET', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPost<T>` - A class for handling HTTP POST requests within the `hison.link` module.**
             *
             * The `ApiPost<T>` class is responsible for sending HTTP POST requests to a specified service command.
             * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
             * The response type can be customized using the generic parameter `T`, with a default type of `InterfaceDataWrapper`.
             *
             * ### **Key Features**
             * - **Executes HTTP POST requests** using `ApiLink`.
             * - **Encapsulates request data in `DataWrapper`**, ensuring structured payloads with a `cmd` field for service routing.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** to monitor request execution.
             * - **Flexible response typing** via **`T`**, allowing the user to define the expected response data structure.
             *
             * ### **How It Works**
             * - When instantiated, `ApiPost<T>` requires a `serviceCmd` that specifies the business logic endpoint.
             * - The `call()` method sends a POST request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ### **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPost (default response type: InterfaceDataWrapper)
             * const apiPost = new hison.link.ApiPost("UserService.createUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a POST request
             * apiPost.call(requestData).then(response => {
             *     console.log(response.data); // Type: InterfaceDataWrapper
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPost = new hison.link.ApiPost("UserService.createUser", cachingModule);
             *
             * // Specifying a custom response type
             * interface CreateUserResponse {
             *     userId: number;
             *     username: string;
             * }
             * const apiPostTyped = new hison.link.ApiPost<CreateUserResponse>("UserService.createUser");
             *
             * apiPostTyped.call(requestData).then(response => {
             *     console.log(response.data.userId); // Type: number
             *     console.log(response.data.username); // Type: string
             * });
             *
             * // Handling request events
             * cachedApiPost.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("POST request completed!", data);
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Return Value**
             * - This class returns an instance of `ApiPost<T>`, which provides methods for executing POST requests and managing request events.
             * - The response type **defaults to `InterfaceDataWrapper`** but can be customized by specifying a different type `T`.
             *
             * ### **Typical Use Cases**
             * - **Sending data to a REST API** with structured payloads.
             * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             *
             * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
             */
            ApiPost: class<T = InterfaceDataWrapper> implements InterfaceApiPost<T> {
                /**
                 * **Creates an instance of `ApiPost`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making POST requests to a specified service command.
                 *
                 * ### **Parameters**
                 * - `serviceCmd` *(string, required)* - The **service command** that determines the target business logic on the server.
                 *   - **Example:** `"UserService.createUser"`
                 *   - If no `serviceCmd` is provided, an error is thrown.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 2. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 3. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 4. **Stores the `serviceCmd`.**
                 *    - Defines the service endpoint for the POST request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiPost instance without caching
                 * const apiPost = new hison.link.ApiPost("UserService.createUser");
                 *
                 * // Creating an ApiPost instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPost = new hison.link.ApiPost("UserService.createUser", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_serviceCmd`** *(string)* - Stores the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} serviceCmd - The service command defining the target API action.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `serviceCmd` is not provided.
                 */
                constructor(serviceCmd: string | null = null, cachingModule: InterfaceCachingModule | null = null) {
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                /**
                 * **Executes an HTTP POST request to the specified service command.**
                 *
                 * This method sends a POST request using `ApiLink`, encapsulating request data in a `DataWrapper`
                 * and invoking necessary pre-request hooks and event emissions.
                 *
                 * ### **Parameters**
                 * - `requestData` *(T | InterfaceDataWrapper, required)* - The data to be sent in the request.
                 *   - If it is a `DataWrapper`, it is sent as-is.
                 *   - If it is a standard object matching `T`, it is automatically processed as JSON.
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **`hison.setBeforePostRequest((requestData, options) => {})`**
                 *   - A customizable hook executed **before sending the POST request**.
                 *   - If it returns `false`, the request is **prevented from execution**.
                 *   - **Use Case:** Validating request parameters, modifying request data dynamically.
                 *
                 * ### **Event Emission**
                 * - **`"requestStarted_POST"` Event**
                 *   - This event is emitted **before the POST request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(T)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ### **Behavior**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If the data is not cached, it makes an HTTP POST request to `_serviceCmd`.
                 * - Before executing the request:
                 *   - The **before-request hook (`beforePostRequest`)** is checked.
                 *   - The **event `"requestStarted_POST"`** is emitted.
                 * - Once the request is completed, the response is returned and optionally stored in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Defining a custom response type
                 * interface CreateUserResponse {
                 *     userId: number;
                 *     username: string;
                 * }
                 * 
                 * // Creating an instance of ApiPost with a custom response type
                 * const apiPost = new hison.link.ApiPost<CreateUserResponse>("UserService.createUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Customizing the before-request hook to modify data before sending
                 * customOption.link.beforePostRequest = (requestData, options) => {
                 *     requestData.putString("timestamp", Date.now().toString());
                 *     return true;
                 * };
                 * 
                 * // Listening to the "requestStarted_POST" event
                 * apiPost.onEventEmit("requestStarted_POST", (requestData, options) => {
                 *     console.log("POST request started with data:", requestData);
                 * });
                 * 
                 * // Sending a POST request
                 * apiPost.call(requestData).then(response => {
                 *     console.log(response.data.userId); // Type: number
                 *     console.log(response.data.username); // Type: string
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
                 * @param {T | InterfaceDataWrapper} requestData - The data to be sent in the request.
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
                 */
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.post(requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the API controller path.**
                 *
                 * This method retrieves only the headers from the API without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
                 * - The response body is **not** included in the result; only headers are returned.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPost = new hison.link.ApiPost("UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPost.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPost.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(customOption.link.controllerPath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the API controller path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
                 * It is useful for checking which HTTP methods are permitted for a specific endpoint.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPost = new hison.link.ApiPost("UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPost.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPost.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(customOption.link.controllerPath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a POST request.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_POST"` - Triggered when a POST request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPost = new hison.link.ApiPost("UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPost.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("POST request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPost.onEventEmit("requestError", (error) => {
                 *     console.error("POST request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('POST', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPut<T>` - A class for handling HTTP PUT requests within the `hison.link` module.**
             *
             * The `ApiPut` class is responsible for sending HTTP PUT requests to a specified service command.
             * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
             *
             * ### **Key Features**
             * - **Executes HTTP PUT requests** using `ApiLink`.
             * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             * - **Supports generic response types (`T`)** to enable type-safe API responses.
             *
             * ### **How It Works**
             * - When instantiated, `ApiPut<T>` requires a `serviceCmd` that specifies the business logic endpoint.
             * - The `call()` method sends a PUT request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ### **Example Usage**
             * ```typescript
             * // Defining a custom response type
             * interface UpdateUserResponse {
             *     success: boolean;
             *     updatedUserId: number;
             * }
             *
             * // Creating an instance of ApiPut with a custom response type
             * const apiPut = new hison.link.ApiPut<UpdateUserResponse>("UserService.updateUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a PUT request
             * apiPut.call(requestData).then(response => {
             *     console.log(response.data.success); // Type: boolean
             *     console.log(response.data.updatedUserId); // Type: number
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPut = new hison.link.ApiPut<UpdateUserResponse>("UserService.updateUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPut.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("PUT request completed!", data);
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Return Value**
             * - This class returns an instance of `ApiPut<T>`, providing methods for executing PUT requests and managing request events.
             * - The `T` type parameter allows users to define the expected response structure.
             *
             * ### **Typical Use Cases**
             * - **Sending data to a REST API** with structured payloads.
             * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             *
             * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
             */
            ApiPut: class<T = InterfaceDataWrapper> implements InterfaceApiPut<T> {
                /**
                 * **Creates an instance of `ApiPut`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making PUT requests to a specified service command.
                 *
                 * ### **Parameters**
                 * - `serviceCmd` *(string, required)* - The **service command** that determines the target business logic on the server.
                 *   - **Example:** `"UserService.createUser"`
                 *   - If no `serviceCmd` is provided, an error is thrown.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 2. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 3. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 4. **Stores the `serviceCmd`.**
                 *    - Defines the service endpoint for the PUT request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiPut instance without caching
                 * const apiPut = new hison.link.ApiPut("UserService.createUser");
                 *
                 * // Creating an ApiPut instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPut = new hison.link.ApiPut("UserService.createUser", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_serviceCmd`** *(string)* - Stores the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} serviceCmd - The service command defining the target API action.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `serviceCmd` is not provided.
                 */
                constructor(serviceCmd: string | null = null, cachingModule: InterfaceCachingModule | null = null) {
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                /**
                 * **Executes an HTTP PUT request to the specified service command with a generic response type.**
                 *
                 * This method sends a PUT request using `ApiLink`, encapsulating request data in a `DataWrapper`
                 * and invoking necessary pre-request hooks and event emissions.
                 *
                 * ### **Parameters**
                 * - `requestData` *(any, required)* - The data to be sent in the request.
                 *   - If it is a `DataWrapper`, it is sent as-is.
                 *   - If it is a standard object, it is converted to a JSON payload.
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **`hison.setBeforePutRequest((requestData, options) => {})`**
                 *   - A customizable hook executed **before sending the PUT request**.
                 *   - If it returns `false`, the request is **prevented from execution**.
                 *   - **Use Case:** Validating request parameters, modifying request data dynamically.
                 *
                 * ### **Event Emission**
                 * - **`"requestStarted_PUT"` Event**
                 *   - This event is emitted **before the PUT request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(T)* - The API response data, strongly typed based on the generic `T`.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ### **Behavior**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If the data is not cached, it makes an HTTP PUT request to `_serviceCmd`.
                 * - Before executing the request:
                 *   - The **before-request hook (`beforePutRequest`)** is checked.
                 *   - The **event `"requestStarted_PUT"`** is emitted.
                 * - Once the request is completed, the response is returned and optionally stored in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Defining a custom response type
                 * interface UpdateUserResponse {
                 *     success: boolean;
                 *     updatedUserId: number;
                 * }
                 *
                 * // Creating an instance of ApiPut with a custom response type
                 * const apiPut = new hison.link.ApiPut<UpdateUserResponse>("UserService.updateUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Customizing the before-request hook to modify data before sending
                 * customOption.link.beforePutRequest = (requestData, options) => {
                 *     requestData.putString("timestamp", Date.now().toString());
                 *     return true;
                 * };
                 * 
                 * // Listening to the "requestStarted_PUT" event
                 * apiPut.onEventEmit("requestStarted_PUT", (requestData, options) => {
                 *     console.log("PUT request started with data:", requestData);
                 * });
                 * 
                 * // Sending a PUT request with a typed response
                 * apiPut.call(requestData).then(response => {
                 *     console.log(response.data.success); // Type: boolean
                 *     console.log(response.data.updatedUserId); // Type: number
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
                 * @param {any} requestData - The data to be sent in the request.
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
                 */
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.put(requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the API controller path.**
                 *
                 * This method retrieves only the headers from the API without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
                 * - The response body is **not** included in the result; only headers are returned.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPut = new hison.link.ApiPut("UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPut.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPut.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(customOption.link.controllerPath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the API controller path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
                 * It is useful for checking which HTTP methods are permitted for a specific endpoint.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PUT", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPut = new hison.link.ApiPut("UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPut.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "PUT", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPut.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(customOption.link.controllerPath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a PUT request.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_PUT"` - Triggered when a PUT request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PUT"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPut = new hison.link.ApiPut("UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPut.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("PUT request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPut.onEventEmit("requestError", (error) => {
                 *     console.error("PUT request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PUT', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPatch` - A class for handling HTTP PATCH requests within the `hison.link` module.**
             *
             * The `ApiPatch` class is responsible for sending HTTP PATCH requests to a specified service command.
             * It supports **strongly typed responses** using generics (`T`), allowing precise response data handling.
             *
             * ### **Key Features**
             * - **Executes HTTP PATCH requests** using `ApiLink`.
             * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             * - **Utilizes generics (`T`)** to enable type-safe response handling.
             *
             * ### **How It Works**
             * - When instantiated, `ApiPatch` requires a `serviceCmd` that specifies the business logic endpoint.
             * - The `call<T>()` method sends a PATCH request and expects a response of type `T`.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ### **Example Usage**
             * ```typescript
             * // Defining a custom response type
             * interface UpdateUserResponse {
             *     success: boolean;
             *     updatedFields: string[];
             * }
             *
             * // Creating an instance of ApiPatch with a custom response type
             * const apiPatch = new hison.link.ApiPatch<UpdateUserResponse>("UserService.updateUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a PATCH request with a typed response
             * apiPatch.call(requestData).then(response => {
             *     console.log(response.data.success); // Type: boolean
             *     console.log(response.data.updatedFields); // Type: string[]
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPatch = new hison.link.ApiPatch("UserService.updateUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("PATCH request completed!", data);
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Return Value**
             * - This class returns an instance of `ApiPatch<T>`, providing methods for executing PATCH requests and managing request events.
             *
             * ### **Typical Use Cases**
             * - **Applying partial updates** to a REST API.
             * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             *
             * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
             */
            ApiPatch: class<T = InterfaceDataWrapper> implements InterfaceApiPatch<T> {
                /**
                 * **Creates an instance of `ApiPatch`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making PATCH requests to a specified service command.
                 *
                 * ### **Parameters**
                 * - `serviceCmd` *(string, required)* - The **service command** that determines the target business logic on the server.
                 *   - **Example:** `"UserService.createUser"`
                 *   - If no `serviceCmd` is provided, an error is thrown.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 2. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 3. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 4. **Stores the `serviceCmd`.**
                 *    - Defines the service endpoint for the PATCH request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiPatch instance without caching
                 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
                 *
                 * // Creating an ApiPatch instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPatch = new hison.link.ApiPatch("UserService.createUser", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_serviceCmd`** *(string)* - Stores the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} serviceCmd - The service command defining the target API action.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `serviceCmd` is not provided.
                 */
                constructor(serviceCmd: string | null = null, cachingModule: InterfaceCachingModule | null = null) {
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                /**
                 * **Executes an HTTP PATCH request to the specified service command.**
                 *
                 * This method sends a PATCH request using `ApiLink`, encapsulating request data in a `DataWrapper`
                 * and invoking necessary pre-request hooks and event emissions. The response type is determined by
                 * the **generic type `T`**, allowing for precise response handling.
                 *
                 * ### **Parameters**
                 * - `requestData` *(T, required)* - The data to be sent in the request.
                 *   - If it is a `DataWrapper`, it is sent as-is.
                 *   - If it is a standard object, it is converted to a JSON payload.
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **`hison.setBeforePatchRequest((requestData, options) => {})`**
                 *   - A customizable hook executed **before sending the PATCH request**.
                 *   - If it returns `false`, the request is **prevented from execution**.
                 *   - **Use Case:** Validating request parameters, modifying request data dynamically.
                 *
                 * ### **Event Emission**
                 * - **`"requestStarted_PATCH"` Event**
                 *   - This event is emitted **before the PATCH request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(T)* - The API response data, strongly typed based on the generic type.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ### **Behavior**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If the data is not cached, it makes an HTTP PATCH request to `_serviceCmd`.
                 * - Before executing the request:
                 *   - The **before-request hook (`beforePatchRequest`)** is checked.
                 *   - The **event `"requestStarted_PATCH"`** is emitted.
                 * - Once the request is completed, the response is returned and optionally stored in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Define a response type
                 * interface UpdateUserResponse {
                 *     success: boolean;
                 *     updatedFields: string[];
                 * }
                 *
                 * // Creating an ApiPatch instance with a typed response
                 * const apiPatch = new hison.link.ApiPatch<UpdateUserResponse>("UserService.updateUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Customizing the before-request hook to modify data before sending
                 * customOption.link.beforePatchRequest = (requestData, options) => {
                 *     requestData.putString("timestamp", Date.now().toString());
                 *     return true;
                 * };
                 * 
                 * // Listening to the "requestStarted_PATCH" event
                 * apiPatch.onEventEmit("requestStarted_PATCH", (requestData, options) => {
                 *     console.log("PATCH request started with data:", requestData);
                 * });
                 * 
                 * // Sending a PATCH request with a typed response
                 * apiPatch.call(requestData).then(response => {
                 *     console.log(response.data.success); // Type: boolean
                 *     console.log(response.data.updatedFields); // Type: string[]
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
                 * @param {T} requestData - The data to be sent in the request.
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
                 */
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.patch(requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the API controller path.**
                 *
                 * This method retrieves only the headers from the API without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
                 * - The response body is **not** included in the result; only headers are returned.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPatch.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPatch.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(customOption.link.controllerPath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the API controller path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
                 * It is useful for checking which HTTP methods are permitted for a specific endpoint.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPatch.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "PATCH", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPatch.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(customOption.link.controllerPath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a PATCH request.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("PATCH request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPatch.onEventEmit("requestError", (error) => {
                 *     console.error("PATCH request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PATCH', eventName, eventFunc);
                };
            },
            /**
             * **`ApiDelete<T>` - A class for handling HTTP DELETE requests within the `hison.link` module.**
             *
             * The `ApiDelete` class is responsible for sending HTTP DELETE requests to a specified service command.
             * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
             *
             * ### **Key Features**
             * - **Executes HTTP DELETE requests** using `ApiLink`.
             * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             * - **Supports generic response types (`T`)**, allowing for **strongly typed responses**.
             *
             * ### **How It Works**
             * - When instantiated, `ApiDelete<T>` requires a `serviceCmd` that specifies the business logic endpoint.
             * - The `call()` method sends a DELETE request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             * - The **generic type `T` defines the response data structure**, ensuring **type safety**.
             *
             * ### **Example Usage**
             * ```typescript
             * // Define a response type
             * interface DeleteUserResponse {
             *     success: boolean;
             *     deletedId: string;
             * }
             *
             * // Creating an instance of ApiDelete with a typed response
             * const apiDelete = new hison.link.ApiDelete<DeleteUserResponse>("UserService.deleteUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("userId", "12345");
             * 
             * // Sending a DELETE request
             * apiDelete.call(requestData).then(response => {
             *     console.log(response.data.success); // Type: boolean
             *     console.log(response.data.deletedId); // Type: string
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiDelete = new hison.link.ApiDelete("UserService.deleteUser", cachingModule);
             *
             * // Handling request events
             * cachedApiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("DELETE request completed!", data);
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Return Value**
             * - This class returns an instance of `ApiDelete<T>`, providing methods for executing DELETE requests and managing request events.
             *
             * ### **Typical Use Cases**
             * - **Deleting data from a REST API** in a structured and type-safe way.
             * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             *
             * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
             */
            ApiDelete: class<T = InterfaceDataWrapper> implements InterfaceApiDelete<T> {
                /**
                 * **Creates an instance of `ApiDelete`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making DELETE requests to a specified service command.
                 *
                 * ### **Parameters**
                 * - `serviceCmd` *(string, required)* - The **service command** that determines the target business logic on the server.
                 *   - **Example:** `"UserService.createUser"`
                 *   - If no `serviceCmd` is provided, an error is thrown.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 2. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 3. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 4. **Stores the `serviceCmd`.**
                 *    - Defines the service endpoint for the DELETE request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiDelete instance without caching
                 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
                 *
                 * // Creating an ApiDelete instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiDelete = new hison.link.ApiDelete("UserService.createUser", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_serviceCmd`** *(string)* - Stores the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} serviceCmd - The service command defining the target API action.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `serviceCmd` is not provided.
                 */
                constructor(serviceCmd: string | null = null, cachingModule: InterfaceCachingModule | null = null) {
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                /**
                 * **Executes an HTTP DELETE request to the specified service command.**
                 *
                 * This method sends a DELETE request using `ApiLink`, encapsulating request data in a `DataWrapper`
                 * and invoking necessary pre-request hooks and event emissions.
                 *
                 * ### **Parameters**
                 * - `requestData` *(any, required)* - The data to be sent in the request.
                 *   - If it is a `DataWrapper`, it is sent as-is.
                 *   - If it is a standard object, it is converted to a JSON payload.
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **`hison.setBeforeDeleteRequest((requestData, options) => {})`**
                 *   - A customizable hook executed **before sending the DELETE request**.
                 *   - If it returns `false`, the request is **prevented from execution**.
                 *   - **Use Case:** Validating request parameters, modifying request data dynamically.
                 *
                 * ### **Event Emission**
                 * - **`"requestStarted_DELETE"` Event**
                 *   - This event is emitted **before the DELETE request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(`T`)* - The API response data, **strongly typed based on `T`**.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ### **Behavior**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If the data is not cached, it makes an HTTP DELETE request to `_serviceCmd`.
                 * - Before executing the request:
                 *   - The **before-request hook (`beforeDeleteRequest`)** is checked.
                 *   - The **event `"requestStarted_DELETE"`** is emitted.
                 * - Once the request is completed, the response is returned and optionally stored in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * interface DeleteUserResponse {
                 *     success: boolean;
                 *     deletedId: string;
                 * }
                 *
                 * const apiDelete = new hison.link.ApiDelete<DeleteUserResponse>("UserService.deleteUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("userId", "12345");
                 * 
                 * // Customizing the before-request hook to modify data before sending
                 * customOption.link.beforeDeleteRequest = (requestData, options) => {
                 *     requestData.putString("timestamp", Date.now().toString());
                 *     return true;
                 * };
                 * 
                 * // Listening to the "requestStarted_DELETE" event
                 * apiDelete.onEventEmit("requestStarted_DELETE", (requestData, options) => {
                 *     console.log("DELETE request started with data:", requestData);
                 * });
                 * 
                 * // Sending a DELETE request
                 * apiDelete.call(requestData).then(response => {
                 *     console.log(response.data.success); // Type: boolean
                 *     console.log(response.data.deletedId); // Type: string
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @param {any} requestData - The data to be sent in the request.
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
                 */
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.delete(requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the API controller path.**
                 *
                 * This method retrieves only the headers from the API without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
                 * - The response body is **not** included in the result; only headers are returned.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiDelete.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiDelete.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(customOption.link.controllerPath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the API controller path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
                 * It is useful for checking which HTTP methods are permitted for a specific endpoint.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiDelete.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "DELETE", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiDelete.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(customOption.link.controllerPath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a DELETE request.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("DELETE request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiDelete.onEventEmit("requestError", (error) => {
                 *     console.error("DELETE request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('DELETE', eventName, eventFunc);
                };
            },
            /**
             * **`ApiGetUrl` - A class for handling HTTP GET requests to a specified URL.**
             *
             * The `ApiGetUrl` class is responsible for sending HTTP GET requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             *
             * ### **Key Features**
             * - **Executes HTTP GET requests** using `ApiLink`.
             * - **Accepts a direct URL** instead of using a predefined API resource path.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             * - **Supports generic response types (`T`)** with a default value of `any` to accommodate diverse API responses.
             *
             * ### **How It Works**
             * - When instantiated, `ApiGetUrl` requires a valid URL.
             * - The `call()` method triggers a GET request to the specified URL.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             * - The response data type can be explicitly defined using `T` (default: `any`).
             *
             * ### **Example Usage**
             * ```typescript
             * // Creating an instance of ApiGetUrl without caching
             * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
             * 
             * // Sending a GET request
             * apiGetUrl.call().then(response => {
             *     console.log(response.data); // Response data (any type by default)
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users", cachingModule);
             * 
             * // Handling request events
             * cachedApiGetUrl.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("GET request completed!", data);
             * });
             * 
             * // Defining a specific response type using generics
             * interface UserResponse {
             *     id: number;
             *     name: string;
             *     email: string;
             * }
             * const typedApiGetUrl = new hison.link.ApiGetUrl<UserResponse>("https://api.example.com/user/1");
             * 
             * typedApiGetUrl.call().then(response => {
             *     console.log(response.data.name); // `name` is inferred as a string
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Return Value**
             * - This class returns an instance of `ApiGetUrl`, which provides methods for executing GET requests to a specific URL.
             * - The response type is determined by the generic parameter `T` (default: `any`).
             *
             * ### **Typical Use Cases**
             * - **Fetching data from an external API** by specifying a full URL.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             * - **Explicitly defining the response structure** using TypeScript generics.
             */
            ApiGetUrl: class<T = any> implements InterfaceApiGetUrl<T> {
                /**
                 * **Creates an instance of `ApiGetUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making GET requests to a specified URL.
                 *
                 * ### **Parameters**
                 * - `url` *(string, required)* - The full URL to which the GET request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url`.**
                 *    - Defines the endpoint for the GET request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiGetUrl instance without caching
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Creating an ApiGetUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the GET request.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _url: string;
                /**
                 * **Executes an HTTP GET request to the specified URL.**
                 *
                 * This method sends a GET request using `ApiLink.getURL()`, optionally applying caching if a `CachingModule` is provided.
                 * It also **emits a request-start event** (`"requestStarted_GET"`) before execution.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, `Record<string, any>`)* - Additional request options such as headers or query parameters.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **Event Emission: `"requestStarted_GET"`**
                 *   - This event is emitted **before the GET request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ### **Caching Mechanism**
                 * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new GET request is executed, and the response may be stored in the cache.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - **`data: T`** - The API response data, where `T` is a generic type (default: `any`).
                 *   - **`response: Response`** - The original HTTP response object.
                 *   - Returns `null` if the request fails or is prevented by an event hook.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.getURL(this._url, options)`, which:
                 *   - Emits `"requestStarted_GET"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP GET request to `_url`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Listening to the "requestStarted_GET" event
                 * apiGetUrl.onEventEmit("requestStarted_GET", (url, options) => {
                 *     console.log(`GET request started for: ${url}`);
                 * });
                 * 
                 * // Sending a GET request with inferred response type (`any` by default)
                 * apiGetUrl.call().then(response => {
                 *     console.log(response.data); // Response data
                 * });
                 * 
                 * // Defining a specific response type
                 * interface User {
                 *     id: number;
                 *     name: string;
                 *     email: string;
                 * }
                 * const typedApiGetUrl = new hison.link.ApiGetUrl<User>("https://api.example.com/user/1");
                 * 
                 * typedApiGetUrl.call().then(response => {
                 *     console.log(response.data.name); // `name` is inferred as a string
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
                 */
                call = (options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.getURL(this._url, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.head(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Sending a HEAD request
                 * apiGetUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiGetUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(options)`** - Sends a GET request to retrieve full response data.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Sending an OPTIONS request
                 * apiGetUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiGetUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(options)`** - Sends a GET request to retrieve full response data.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a GET request to a specified URL.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_GET"` - Triggered when a GET request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"GET"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Register an event listener for when the request completes
                 * apiGetUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("GET request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiGetUrl.onEventEmit("requestError", (error) => {
                 *     console.error("GET request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(options)`** - Sends a GET request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('GET', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPostUrl` - A class for handling HTTP POST requests to a specified URL.**
             *
             * The `ApiPostUrl` class is responsible for sending HTTP POST requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             *
             * ### **Key Features**
             * - **Executes HTTP POST requests** using `ApiLink`.
             * - **Accepts a direct URL** instead of using a predefined service command.
             * - **Supports an optional `serviceCmd` parameter**, allowing structured routing on the server.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             * - **Uses a generic type `T` (default: `any`)** to specify the expected response data format.
             *
             * ### **How It Works**
             * - When instantiated, `ApiPostUrl` requires a valid URL and an optional `serviceCmd`.
             * - The `call()` method sends a POST request with the provided request data.
             * - If caching is enabled, previously stored responses may be returned instead of making a new request.
             * - Event listeners can be attached to track request execution and completion.
             *
             * ### **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPostUrl for a direct POST request
             * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a POST request
             * apiPostUrl.call(requestData).then(response => {
             *     console.log(response.data); // Response data
             * });
             *
             * // Creating an instance with a service command for structured routing
             * const apiPostUrlWithCmd = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
             * 
             * // Sending a POST request with service command
             * apiPostUrlWithCmd.call(requestData).then(response => {
             *     console.log(response.data);
             * });
             * 
             * // Creating an instance with caching enabled
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("POST request completed!", data);
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Return Value**
             * - This class returns an instance of `ApiPostUrl`, providing methods for executing POST requests to a specific URL.
             * - The response data type is determined by `T`, with a default of `any`.
             *
             * ### **Typical Use Cases**
             * - **Sending data to an external API** using a full URL.
             * - **Passing a `serviceCmd` for structured request routing**.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             *
             * ### **Type-Safe Example**
             * ```typescript
             * interface UserResponse {
             *     id: number;
             *     name: string;
             *     email: string;
             * }
             * 
             * const typedApiPostUrl = new hison.link.ApiPostUrl<UserResponse>("https://api.example.com/users");
             * 
             * typedApiPostUrl.call(requestData).then(response => {
             *     console.log(response.data.name); // `name` is inferred as a string
             * });
             * ```
             */
            ApiPostUrl: class<T = any> implements InterfaceApiPostUrl<T> {
                /**
                 * **Creates an instance of `ApiPostUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making POST requests to a specified URL.
                 *
                 * ### **Parameters**
                 * - `url` *(string, required)* - The full URL to which the POST request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `serviceCmd` *(optional, string)* - A **service command** that can be used to specify 
                 *   business logic on the server.
                 *   - **Default:** `''` (empty string)
                 *   - If provided, this is included in the request payload for structured routing.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url` and `serviceCmd`.**
                 *    - Defines the endpoint and optional service command for the POST request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiPostUrl instance without caching
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 *
                 * // Creating an ApiPostUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the POST request.
                 * @param {string} [serviceCmd=''] - An optional service command for structured request routing.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                /**
                 * **Executes an HTTP POST request to the specified URL with an optional service command.**
                 *
                 * This method sends a POST request using `ApiLink.postURL()`, encapsulating request data and invoking
                 * necessary pre-request hooks and event emissions. The response type is determined by the generic `T` (default: `any`).
                 *
                 * ### **Parameters**
                 * - `requestData` *(any, required)* - The data to be sent in the request.
                 *   - If it is a `DataWrapper`, it is sent as-is.
                 *   - If it is a standard object, it is converted to a JSON payload.
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **`"requestStarted_POST"` Event**
                 *   - This event is emitted **before the POST request is executed**.
                 *   - It includes the `serviceCmd`, request options, and request data.
                 *   - Useful for logging, request tracking, or debugging.
                 *
                 * ### **Caching Mechanism**
                 * - If a `CachingModule` is provided, it checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new POST request is executed, and the response may be stored in the cache.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
                 *   - `response` *(Response)* - The original HTTP response object.
                 * - If an error occurs, it returns `null`.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
                 *   - Emits `"requestStarted_POST"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP POST request to `_url` with the provided `serviceCmd`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an instance of ApiPostUrl with a service command
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Listening to the "requestStarted_POST" event
                 * apiPostUrl.onEventEmit("requestStarted_POST", (serviceCmd, options, requestData) => {
                 *     console.log(`POST request started for service: ${serviceCmd}`, requestData);
                 * });
                 * 
                 * // Sending a POST request
                 * apiPostUrl.call(requestData).then(response => {
                 *     console.log(response.data); // Response data
                 * });
                 * ```
                 *
                 * ### **Type-Safe Example**
                 * ```typescript
                 * interface UserResponse {
                 *     id: number;
                 *     name: string;
                 *     email: string;
                 * }
                 * 
                 * const apiPostUrl = new hison.link.ApiPostUrl<UserResponse>("https://api.example.com/users");
                 * 
                 * apiPostUrl.call(requestData).then(response => {
                 *     if (response) {
                 *         console.log(response.data.name); // `name` is inferred as a string
                 *     }
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @param {any} requestData - The data to be sent in the request.
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response; }>} A promise resolving to the API response.
                 */
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.postURL(this._url, requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.headURL(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPostUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPostUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPostUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPostUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a POST request to a specified URL.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_POST"` - Triggered when a POST request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("POST request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPostUrl.onEventEmit("requestError", (error) => {
                 *     console.error("POST request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('POST', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPutUrl` - A class for handling HTTP PUT requests to a specified URL.**
             *
             * The `ApiPutUrl` class is responsible for sending HTTP PUT requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             * This class supports a generic type `T`, allowing users to define the expected response type.
             *
             * ### **Key Features**
             * - **Executes HTTP PUT requests** using `ApiLink.putURL()`.
             * - **Accepts a direct URL** instead of using a predefined service command.
             * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             * - **Provides type safety for response data** using a generic `T` (default: `any`).
             *
             * ### **How It Works**
             * - When instantiated, `ApiPutUrl` requires a valid URL and an optional `serviceCmd`.
             * - The `call()` method sends a PUT request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ### **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPutUrl
             * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.updateUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a PUT request
             * apiPutUrl.call(requestData).then(response => {
             *     console.log(response.data); // Response data
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.updateUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPutUrl.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("PUT request completed!", data);
             * });
             * ```
             *
             * ### **Type-Safe Example**
             * ```typescript
             * interface UpdateUserResponse {
             *     success: boolean;
             *     message: string;
             * }
             *
             * const apiPutUrl = new hison.link.ApiPutUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
             * 
             * apiPutUrl.call(requestData).then(response => {
             *     if (response) {
             *         console.log(response.data.message); // `message` is inferred as a string
             *     }
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Return Value**
             * - A `Promise` resolving to an object containing:
             *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
             *   - `response` *(Response)* - The original HTTP response object.
             * - If an error occurs, it returns `null`.
             *
             * ### **Typical Use Cases**
             * - **Sending data to an external API** using a full URL.
             * - **Passing a `serviceCmd` for structured request routing**.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiPutUrl: class<T = any> implements InterfaceApiPutUrl {
                /**
                 * **Creates an instance of `ApiPutUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making PUT requests to a specified URL.
                 *
                 * ### **Parameters**
                 * - `url` *(string, required)* - The full URL to which the PUT request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `serviceCmd` *(optional, string)* - A **service command** that can be used to specify 
                 *   business logic on the server.
                 *   - **Default:** `''` (empty string)
                 *   - If provided, this is included in the request payload for structured routing.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url` and `serviceCmd`.**
                 *    - Defines the endpoint and optional service command for the PUT request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiPutUrl instance without caching
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
                 *
                 * // Creating an ApiPutUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the PUT request.
                 * @param {string} [serviceCmd=''] - An optional service command for structured request routing.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                /**
                 * **Executes an HTTP PUT request to the specified URL with an optional service command.**
                 *
                 * This method sends a PUT request using `ApiLink.putURL()`, encapsulating request data in a `DataWrapper`
                 * and invoking necessary pre-request hooks and event emissions.
                 *
                 * ### **Parameters**
                 * - `requestData` *(any, required)* - The data to be sent in the request.
                 *   - If it is a `DataWrapper`, it is sent as-is.
                 *   - If it is a standard object, it is converted to a JSON payload.
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers, timeout settings, etc.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **`"requestStarted_PUT"` Event**
                 *   - This event is emitted **before the PUT request is executed**.
                 *   - Includes the `serviceCmd`, request options, and request data.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ### **Caching Mechanism**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new PUT request is executed, and the response may be stored in the cache.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
                 *   - `response` *(Response)* - The original HTTP response object.
                 * - If an error occurs, it returns `null`.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.putURL(this._url, requestData, this._serviceCmd, options)`, which:
                 *   - Emits `"requestStarted_PUT"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP PUT request to `_url` with the provided `serviceCmd`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.updateUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Listening to the "requestStarted_PUT" event
                 * apiPutUrl.onEventEmit("requestStarted_PUT", (serviceCmd, options, requestData) => {
                 *     console.log(`PUT request started for service: ${serviceCmd}`, requestData);
                 * });
                 * 
                 * // Sending a PUT request
                 * apiPutUrl.call(requestData).then(response => {
                 *     if (response) {
                 *         console.log(response.data); // Response data
                 *     }
                 * });
                 * ```
                 *
                 * ### **Type-Safe Example**
                 * ```typescript
                 * interface UpdateUserResponse {
                 *     success: boolean;
                 *     message: string;
                 * }
                 *
                 * const apiPutUrl = new hison.link.ApiPutUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
                 * 
                 * apiPutUrl.call(requestData).then(response => {
                 *     if (response) {
                 *         console.log(response.data.message); // `message` is inferred as a string
                 *     }
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @param {any} requestData - The data to be sent in the request.
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
                 */
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.putURL(this._url, requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.headURL(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPutUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPutUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PUT", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPutUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "PUT", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPutUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a PUT request to a specified URL.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_PUT"` - Triggered when a PUT request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PUT"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPutUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("PUT request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPutUrl.onEventEmit("requestError", (error) => {
                 *     console.error("PUT request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PUT', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPatchUrl` - A class for handling HTTP PATCH requests to a specified URL.**
             *
             * The `ApiPatchUrl` class is responsible for sending HTTP PATCH requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             *
             * ### **Key Features**
             * - **Executes HTTP PATCH requests** using `ApiLink`.
             * - **Accepts a direct URL** instead of using a predefined service command.
             * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ### **How It Works**
             * - When instantiated, `ApiPatchUrl` requires a valid URL and an optional `serviceCmd`.
             * - The `call()` method sends a PATCH request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ### **Return Value**
             * - A `Promise` resolving to an object containing:
             *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
             *   - `response` *(Response)* - The original HTTP response object.
             * - If an error occurs, it returns `null`.
             *
             * ### **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPatchUrl
             * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.updateUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a PATCH request
             * apiPatchUrl.call(requestData).then(response => {
             *     if (response) {
             *         console.log(response.data); // Response data
             *     }
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.updateUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("PATCH request completed!", data);
             * });
             * ```
             *
             * ### **Type-Safe Example**
             * ```typescript
             * interface UpdateUserResponse {
             *     success: boolean;
             *     message: string;
             * }
             *
             * const apiPatchUrl = new hison.link.ApiPatchUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
             * 
             * apiPatchUrl.call(requestData).then(response => {
             *     if (response) {
             *         console.log(response.data.message); // `message` is inferred as a string
             *     }
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Typical Use Cases**
             * - **Sending data to an external API** using a full URL.
             * - **Passing a `serviceCmd` for structured request routing**.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiPatchUrl: class<T = any> implements InterfaceApiPatchUrl<T> {
                /**
                 * **Creates an instance of `ApiPatchUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making PATCH requests to a specified URL.
                 *
                 * ### **Parameters**
                 * - `url` *(string, required)* - The full URL to which the PATCH request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `serviceCmd` *(optional, string)* - A **service command** that can be used to specify 
                 *   business logic on the server.
                 *   - **Default:** `''` (empty string)
                 *   - If provided, this is included in the request payload for structured routing.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url` and `serviceCmd`.**
                 *    - Defines the endpoint and optional service command for the PATCH request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiPatchUrl instance without caching
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
                 *
                 * // Creating an ApiPatchUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the PATCH request.
                 * @param {string} [serviceCmd=''] - An optional service command for structured request routing.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                /**
                 * **Executes an HTTP PATCH request to the specified URL with an optional service command.**
                 *
                 * This method sends a PATCH request using `ApiLink.patchURL()`, encapsulating request data in a `DataWrapper`
                 * and invoking necessary pre-request hooks and event emissions.
                 *
                 * ### **Parameters**
                 * - `requestData` *(any, required)* - The data to be sent in the request.
                 *   - If it is a `DataWrapper`, it is sent as-is.
                 *   - If it is a standard object, it is converted to a JSON payload.
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **`"requestStarted_PATCH"` Event**
                 *   - This event is emitted **before the PATCH request is executed**.
                 *   - It includes the `serviceCmd`, request options, and request data.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ### **Caching Mechanism**
                 * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new PATCH request is executed, and the response may be stored in the cache.
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(T)* - The API response data, typed based on the provided generic `T` (default: `any`).
                 *   - `response` *(Response)* - The original HTTP response object.
                 * - If an error occurs, it returns `null`.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.patchURL(this._url, requestData, this._serviceCmd, options)`, which:
                 *   - Emits `"requestStarted_PATCH"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP PATCH request to `_url` with the provided `serviceCmd`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.updateUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Listening to the "requestStarted_PATCH" event
                 * apiPatchUrl.onEventEmit("requestStarted_PATCH", (serviceCmd, options, requestData) => {
                 *     console.log(`PATCH request started for service: ${serviceCmd}`, requestData);
                 * });
                 * 
                 * // Sending a PATCH request
                 * apiPatchUrl.call(requestData).then(response => {
                 *     if (response) {
                 *         console.log(response.data); // Response data
                 *     }
                 * });
                 * ```
                 *
                 * ### **Type-Safe Example**
                 * ```typescript
                 * interface UpdateUserResponse {
                 *     success: boolean;
                 *     message: string;
                 * }
                 *
                 * const apiPatchUrl = new hison.link.ApiPatchUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
                 * 
                 * apiPatchUrl.call(requestData).then(response => {
                 *     if (response) {
                 *         console.log(response.data.message); // `message` is inferred as a string
                 *     }
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @param {any} requestData - The data to be sent in the request.
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response; }>} A promise resolving to the API response.
                 */
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.patchURL(this._url, requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.headURL(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPatchUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPatchUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPatchUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "PATCH", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPatchUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a PATCH request to a specified URL.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("PATCH request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPatchUrl.onEventEmit("requestError", (error) => {
                 *     console.error("PATCH request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PATCH', eventName, eventFunc);
                };
            },
            /**
             * **`ApiDeleteUrl` - A class for handling HTTP DELETE requests to a specified URL.**
             *
             * The `ApiDeleteUrl` class is responsible for sending HTTP DELETE requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             *
             * ### **Key Features**
             * - **Executes HTTP DELETE requests** using `ApiLink`.
             * - **Accepts a direct URL** instead of using a predefined service command.
             * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             * - **Supports generic response types** for type-safe API responses.
             *
             * ### **How It Works**
             * - When instantiated, `ApiDeleteUrl` requires a valid URL and an optional `serviceCmd`.
             * - The `call()` method sends a DELETE request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ### **Example Usage**
             * ```typescript
             * // Creating an instance of ApiDeleteUrl
             * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.deleteUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a DELETE request
             * apiDeleteUrl.call(requestData).then(response => {
             *     if (response) {
             *         console.log(response.data); // Response data
             *     }
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.deleteUser", cachingModule);
             *
             * // Handling request events
             * cachedApiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("DELETE request completed!", data);
             * });
             * ```
             *
             * ### **Type-Safe Example**
             * ```typescript
             * interface DeleteResponse {
             *     success: boolean;
             *     message: string;
             * }
             *
             * const apiDeleteUrl = new hison.link.ApiDeleteUrl<DeleteResponse>("https://api.example.com/users", "UserService.deleteUser");
             * 
             * apiDeleteUrl.call(requestData).then(response => {
             *     if (response) {
             *         console.log(response.data.message); // `message` is inferred as a string
             *     }
             * });
             * ```
             *
             * ### **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ### **Return Value**
             * - **A `Promise` resolving to an object with the following properties:**
             *   - `data` *(T)* - The API response data, where `T` is the specified generic type (default: `any`).
             *   - `response` *(Response)* - The original HTTP response object.
             * - If an error occurs, it returns `null`.
             *
             * ### **Typical Use Cases**
             * - **Sending data to an external API** using a full URL.
             * - **Passing a `serviceCmd` for structured request routing**.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiDeleteUrl: class<T = any> implements InterfaceApiDeleteUrl<T> {
                /**
                 * **Creates an instance of `ApiDeleteUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making DELETE requests to a specified URL.
                 *
                 * ### **Parameters**
                 * - `url` *(string, required)* - The full URL to which the DELETE request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `serviceCmd` *(optional, string)* - A **service command** that can be used to specify 
                 *   business logic on the server.
                 *   - **Default:** `''` (empty string)
                 *   - If provided, this is included in the request payload for structured routing.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ### **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url` and `serviceCmd`.**
                 *    - Defines the endpoint and optional service command for the DELETE request.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * // Creating an ApiDeleteUrl instance without caching
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
                 *
                 * // Creating an ApiDeleteUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
                 * ```
                 *
                 * ### **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the DELETE request.
                 * @param {string} [serviceCmd=''] - An optional service command for structured request routing.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                /**
                 * **Executes an HTTP DELETE request to the specified URL with an optional service command.**
                 *
                 * This method sends a DELETE request using `ApiLink.deleteURL()`, encapsulating request data in a `DataWrapper`
                 * and invoking necessary pre-request hooks and event emissions.
                 *
                 * ### **Parameters**
                 * - `requestData` *(any, required)* - The data to be sent in the request.
                 *   - If it is a `DataWrapper`, it is sent as-is.
                 *   - If it is a standard object, it is converted to a JSON payload.
                 * - `options` *(optional, `Record<string, any>`)* - Additional request options such as headers or timeout settings.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Pre-Request Handling**
                 * - **`"requestStarted_DELETE"` Event**
                 *   - This event is emitted **before the DELETE request is executed**.
                 *   - It includes the `serviceCmd`, request options, and request data.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ### **Caching Mechanism**
                 * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new DELETE request is executed, and the response may be stored in the cache.
                 *
                 * ### **Return Value**
                 * - **A `Promise` resolving to an object with the following properties:**
                 *   - `data` *(T)* - The API response data, where `T` is the specified generic type (default: `any`).
                 *   - `response` *(Response)* - The original HTTP response object.
                 * - If an error occurs, it returns `null`.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.deleteURL(this._url, requestData, this._serviceCmd, options)`, which:
                 *   - Emits `"requestStarted_DELETE"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP DELETE request to `_url` with the provided `serviceCmd`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.deleteUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Listening to the "requestStarted_DELETE" event
                 * apiDeleteUrl.onEventEmit("requestStarted_DELETE", (serviceCmd, options, requestData) => {
                 *     console.log(`DELETE request started for service: ${serviceCmd}`, requestData);
                 * });
                 * 
                 * // Sending a DELETE request
                 * apiDeleteUrl.call(requestData).then(response => {
                 *     if (response) {
                 *         console.log(response.data); // Response data
                 *     }
                 * });
                 * ```
                 *
                 * ### **Type-Safe Example**
                 * ```typescript
                 * interface DeleteResponse {
                 *     success: boolean;
                 *     message: string;
                 * }
                 *
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl<DeleteResponse>("https://api.example.com/users", "UserService.deleteUser");
                 * 
                 * apiDeleteUrl.call(requestData).then(response => {
                 *     if (response) {
                 *         console.log(response.data.message); // `message` is inferred as a string
                 *     }
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @param {any} requestData - The data to be sent in the request.
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: T; response: Response; }>} A promise resolving to the API response.
                 */
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
                    return this._apiLink.deleteURL(this._url, requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.headURL(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiDeleteUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiDeleteUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ### **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ### **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
                 *
                 * ### **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiDeleteUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "DELETE", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiDeleteUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a DELETE request to a specified URL.
                 *
                 * ### **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ### **Supported Events**
                 * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ### **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ### **Example Usage**
                 * ```typescript
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("DELETE request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiDeleteUrl.onEventEmit("requestError", (error) => {
                 *     console.error("DELETE request failed:", error);
                 * });
                 * ```
                 *
                 * ### **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('DELETE', eventName, eventFunc);
                };
            },
        };
    };
    
    return {
        setDateFormat(str: string) {customOption.utils.dateFormat = str;},
        setTimeFormat(str: string) {customOption.utils.timeFormat = str;},
        setDatetimeFormat(str: string) {customOption.utils.datetimeFormat = str;},
        setYearFormat(str: string) {customOption.utils.yearFormat = str;},
        setMonthFormat(str: string) {customOption.utils.monthFormat = str;},
        setMonthNameFormat(str: string) {customOption.utils.monthNameFormat = str;},
        setYearMonthFormat(str: string) {customOption.utils.yearMonthFormat = str;},
        setDayFormat(str: string) {customOption.utils.dayFormat = str;},
        setDayOfWeekFormat(str: string) {customOption.utils.dayOfWeekFormat = str;},
        setHourFormat(str: string) {customOption.utils.hourFormat = str;},
        setHourMinuteFormat(str: string) {customOption.utils.hourMinuteFormat = str;},
        setMinuteFormat(str: string) {customOption.utils.minuteFormat = str;},
        setSecondFormat(str: string) {customOption.utils.secondFormat = str;},
        setNumberFormat(str: string) {customOption.utils.numberFormat = str;},
        setCharByteLess2047(num: number) {customOption.utils.LESSOREQ_0X7FF_BYTE = num;},
        setCharByteLess65535(num: number) {customOption.utils.LESSOREQ_0XFFFF_BYTE = num;},
        setCharByteGreater65535(num: number) {customOption.utils.GREATER_0XFFFF_BYTE = num;},
        getDateFormat(): string {return customOption.utils.dateFormat;},
        getTimeFormat(): string {return customOption.utils.timeFormat;},
        getDatetimeFormat(): string {return customOption.utils.datetimeFormat;},
        getYearFormat(): string {return customOption.utils.yearFormat;},
        getMonthFormat(): string {return customOption.utils.monthFormat;},
        getMonthNameFormat(): string {return customOption.utils.monthNameFormat;},
        getYearMonthFormat(): string {return customOption.utils.yearMonthFormat;},
        getDayFormat(): string {return customOption.utils.dayFormat;},
        getDayOfWeekFormat(): string {return customOption.utils.dayOfWeekFormat;},
        getHourFormat(): string {return customOption.utils.hourFormat;},
        getHourMinuteFormat(): string {return customOption.utils.hourMinuteFormat;},
        getMinuteFormat(): string {return customOption.utils.minuteFormat;},
        getSecondFormat(): string {return customOption.utils.secondFormat;},
        getNumberFormat(): string {return customOption.utils.numberFormat;},
        getCharByteLess2047(): number {return customOption.utils.LESSOREQ_0X7FF_BYTE;},
        getCharByteLess65535(): number {return customOption.utils.LESSOREQ_0XFFFF_BYTE;},
        getCharByteGreater65535(): number {return customOption.utils.GREATER_0XFFFF_BYTE;},
        setShieldURL(str: string) {customOption.shield.shieldURL = str;},
        setExposeIpList(arr: string[]) {customOption.shield.exposeIpList = arr;},
        setIsFreeze(bool: boolean) {customOption.shield.isFreeze = bool;},
        setIsPossibleGoBack(bool: boolean) {customOption.shield.isPossibleGoBack = bool;},
        setIsPossibleOpenDevTool(bool: boolean) {customOption.shield.isPossibleOpenDevTool = bool;},
        getShieldURL(): string {return customOption.shield.shieldURL;},
        getExposeIpList(): string[] {return customOption.shield.exposeIpList;},
        getIsFreeze(): boolean {return customOption.shield.isFreeze;},
        getIsPossibleGoBack(): boolean {return customOption.shield.isPossibleGoBack;},
        getIsPossibleOpenDevTool(): boolean {return customOption.shield.isPossibleOpenDevTool;},
        setConvertValue(func: (value: any) => any) {customOption.data.convertValue = func;},
        setProtocol(str: string) {customOption.link.protocol = str;},
        setDomain(str: string) {customOption.link.domain = str;},
        setControllerPath(str: string) {customOption.link.controllerPath = str;},
        setTimeout(num: number) {customOption.link.timeout = num;},
        setWebSocketProtocol(str: string) {customOption.link.webSocketProtocol = str;},
        setWebSocketEndPoint(str: string) {customOption.link.webSocketEndPoint = str;},
        setCachingLimit(num: number) {customOption.link.cachingLimit = num;},
        getProtocol(): string {return customOption.link.protocol;},
        getDomain(): string {return customOption.link.domain;},
        getControllerPath(): string {return customOption.link.controllerPath;},
        getTimeout(): number {return customOption.link.timeout;},
        getWebSocketProtocol(): string {return customOption.link.webSocketProtocol;},
        getWebSocketEndPoint(): string {return customOption.link.webSocketEndPoint;},
        getCachingLimit(): number {return customOption.link.cachingLimit;},
        setBeforeGetRequest(func: (resourcePath?: string, options?: Record<string, any>) => boolean | void) {customOption.link.beforeGetRequest = func;},
        setBeforePostRequest(func: <T = InterfaceDataWrapper>(requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePostRequest = func},
        setBeforePutRequest(func: <T = InterfaceDataWrapper>(requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePutRequest = func},
        setBeforePatchRequest(func: <T = InterfaceDataWrapper>(requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePatchRequest = func},
        setBeforeDeleteRequest(func: <T = InterfaceDataWrapper>(requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforeDeleteRequest = func},
        setAfterGetRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterGetRequest = func;},
        setAfterPostRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPostRequest = func},
        setAfterPutRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPutRequest = func},
        setAfterPatchRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPatchRequest = func},
        setAfterDeleteRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterDeleteRequest = func},
        setBeforeGetUrlRequest(func: (url?: string, options?: Record<string, any>) => boolean | void) {customOption.link.beforeGetUrlRequest = func;},
        setBeforePostUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePostUrlRequest = func},
        setBeforePutUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePutUrlRequest = func},
        setBeforePatchUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePatchUrlRequest = func},
        setBeforeDeleteUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforeDeleteUrlRequest = func},
        setAfterGetUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterGetUrlRequest = func;},
        setAfterPostUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPostUrlRequest = func},
        setAfterPutUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPutUrlRequest = func},
        setAfterPatchUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPatchUrlRequest = func},
        setAfterDeleteUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterDeleteUrlRequest = func},
        setInterceptApiResult(func: (result: any | undefined, response: Response) => boolean | void) {customOption.link.interceptApiResult = func},
        setInterceptApiError(func: (error: any) => boolean | void) {customOption.link.interceptApiError = func},
        utils : {
            isAlpha(str: string): boolean { return hison.utils.isAlpha(str) },
            isAlphaNumber(str: string): boolean { return hison.utils.isAlphaNumber(str) },
            isNumber(str: string): boolean { return hison.utils.isNumber(str) },
            isNumberSymbols(str: string): boolean { return hison.utils.isNumberSymbols(str) },
            isIncludeSymbols(str: string): boolean { return hison.utils.isIncludeSymbols(str) },
            isLowerAlpha(str: string): boolean { return hison.utils.isLowerAlpha(str) },
            isLowerAlphaAndNumber(str: string): boolean { return hison.utils.isLowerAlphaAndNumber(str) },
            isUpperAlpha(str: string): boolean { return hison.utils.isUpperAlpha(str) },
            isUpperAlphaNumber(str: string): boolean { return hison.utils.isUpperAlphaNumber(str) },
            isNumeric(num: any): boolean { return hison.utils.isNumeric(num) },
            isInteger(num: any): boolean { return hison.utils.isInteger(num) },
            isPositiveInteger(num: any): boolean { return hison.utils.isPositiveInteger(num) },
            isNegativeInteger(num: any): boolean { return hison.utils.isNegativeInteger(num) },
            isArray(arr: any): boolean { return hison.utils.isArray(arr) },
            isObject(obj: any): boolean { return hison.utils.isObject(obj) },
            isDate(date: DateObject | string): boolean { return hison.utils.isDate(date) },
            isTime(time: TimeObject | string): boolean { return hison.utils.isTime(time) },
            isDatetime(datetime: DateTimeObject | string): boolean { return hison.utils.isDatetime(datetime) },
            isEmail(str: string): boolean { return hison.utils.isEmail(str) },
            isURL(str: string): boolean { return hison.utils.isURL(str) },
            isValidMask(str: string, mask: string): boolean { return hison.utils.isValidMask(str, mask) },
            getDateObject(date: Date | string): DateObject { return hison.utils.getDateObject(date) },
            getTimeObject(time: Date | string): TimeObject { return hison.utils.getTimeObject(time) },
            getDatetimeObject(datetime: Date | string): DateTimeObject | null { return hison.utils.getDatetimeObject(datetime) },
            addDate(datetime: DateTimeObject | DateObject | string, addValue?: string | number, addType?: string, format?: string): DateTimeObject | string { return hison.utils.addDate(datetime, addValue, addType, format) },
            getDateDiff(datetime1: DateTimeObject | DateObject | string, datetime2: DateTimeObject | DateObject | string, diffType?: string): number { return hison.utils.getDateDiff(datetime1, datetime2, diffType) },
            getMonthName(month: number | string, isFullName?: boolean): string { return hison.utils.getMonthName(month, isFullName) },
            getDateWithFormat(datetime: DateTimeObject | DateObject | string, format?: string): string { return hison.utils.getDateWithFormat(datetime, format) },
            getDayOfWeek(date: DateObject | string, dayType?: string): string { return hison.utils.getDayOfWeek(date, dayType) },
            getLastDay(date: DateObject | string): number { return hison.utils.getLastDay(date) },
            getSysYear(format?: string): string { return hison.utils.getSysYear(format) },
            getSysMonth(format?: string): string { return hison.utils.getSysMonth(format) },
            getSysYearMonth(format?: string): string { return hison.utils.getSysYearMonth(format) },
            getSysDay(format?: string): string { return hison.utils.getSysDay(format) },
            getSysDayOfWeek(format?: string): string { return hison.utils.getSysDayOfWeek(format) },
            getSysHour(format?: string): string { return hison.utils.getSysHour(format) },
            getSysHourMinute(format?: string): string { return hison.utils.getSysHourMinute(format) },
            getSysMinute(format?: string): string { return hison.utils.getSysMinute(format) },
            getSysSecond(format?: string): string { return hison.utils.getSysSecond(format) },
            getSysTime(format?: string): string { return hison.utils.getSysTime(format) },
            getSysDate(format?: string): string { return hison.utils.getSysDate(format) },
            getCeil(num: number, precision?: number): number { return hison.utils.getCeil(num, precision) },
            getFloor(num: number, precision?: number): number { return hison.utils.getFloor(num, precision) },
            getRound(num: number, precision?: number): number { return hison.utils.getRound(num, precision) },
            getTrunc(num: number, precision?: number): number { return hison.utils.getTrunc(num, precision) },
            getByteLength(str: string): number { return hison.utils.getByteLength(str) },
            getCutByteLength(str: string, cutByte: number): string { return hison.utils.getCutByteLength(str, cutByte) },
            getStringLenForm(str: string, length: number): string { return hison.utils.getStringLenForm(str, length) },
            getLpad(str: string, padStr: string, length: number): string { return hison.utils.getLpad(str, padStr, length) },
            getRpad(str: string, padStr: string, length: number): string { return hison.utils.getRpad(str, padStr, length) },
            getTrim(str: string): string { return hison.utils.getTrim(str, ) },
            getReplaceAll(str: string, targetStr: string, replaceStr?: string): string { return hison.utils.getReplaceAll(str, targetStr, replaceStr) },
            getNumberFormat(value: number, format?: string): string { return hison.utils.getNumberFormat(value, format) },
            getRemoveExceptNumbers(str: string): string { return hison.utils.getRemoveExceptNumbers(str) },
            getRemoveNumbers(str: string): string { return hison.utils.getRemoveNumbers(str) },
            getReverse(str: string): string { return hison.utils.getReverse(str) },
            getToBoolean(value: any): boolean { return hison.utils.getToBoolean(value) },
            getToNumber(value: any, impossibleValue?: number): number { return hison.utils.getToNumber(value, impossibleValue) },
            getToFloat(value: any, impossibleValue?: number): number { return hison.utils.getToFloat(value, impossibleValue) },
            getToInteger(value: any, impossibleValue?: number): number { return hison.utils.getToInteger(value, impossibleValue) },
            getToString(str: any, impossibleValue?: string): string { return hison.utils.getToString(str, impossibleValue) },
            nvl(val: any, defaultValue: any): any { return hison.utils.nvl(val, defaultValue) },
            getFileExtension(str: string): string { return hison.utils.getFileExtension(str) },
            getFileName(str: string): string { return hison.utils.getFileName(str) },
            getDecodeBase64(str: string): string { return hison.utils.getDecodeBase64(str) },
            getEncodeBase64(str: string): string { return hison.utils.getEncodeBase64(str) },
            deepCopyObject(object: any, visited?: { source: any, copy: any }[]): any { return hison.utils.deepCopyObject(object, visited) },
        },
        shield : {
            isHison: true,
            excute(hison: Hison) { hison.shield.excute(hison) },
        },
        data: hison.data,
        link: hison.link,
    }
}

export default createHison();
