import type { InterfaceDataModel } from "./dataModel";
import type { InterfaceDataWrapper } from "./dataWrapper";

/**
 * Defines a function signature for formatting values in a `DataModel` column.
 * 
 * - This function takes a value as input and returns a transformed version of it.
 * - Used in `DataModel.setColumnSameFormat()` to apply consistent formatting across a column.
 * 
 * ### Example Usage
 * ```typescript
 * const formatCurrency: DataModelFormatter = (value) => `$${value.toFixed(2)}`;
 * console.log(formatCurrency(1000)); // "$1000.00"
 * ```
 * 
 * @callback DataModelFormatter
 * @param value The original value from the `DataModel` column.
 * @returns The formatted value.
 */
export interface DataModelFormatter{(value: any): any;};
/**
 * Defines a function signature for validating values in a `DataModel` column.
 * 
 * - This function takes a value as input and returns a boolean indicating validity.
 * - Used in `DataModel.isValidValue()` to check if all column values meet the validation criteria.
 * 
 * ### Example Usage
 * ```typescript
 * const isNumber: DataModelValidator = (value) => typeof value === "number";
 * console.log(isNumber(123)); // true
 * console.log(isNumber("text")); // false
 * ```
 * 
 * @callback DataModelValidator
 * @param value The value from the `DataModel` column to validate.
 * @returns `true` if the value is valid, otherwise `false`.
 */
export interface DataModelValidator{(value: any): boolean;};
/**
 * Defines a function signature for filtering rows in a `DataModel`.
 * 
 * - This function takes a row (as an object) and returns `true` if it should be included.
 * - Used in `DataModel.filterRowIndexes()` to filter row indexes based on the given condition.
 * 
 * ### Example Usage
 * ```typescript
 * const filterByAge: DataModelFillter = (row) => row.age > 25;
 * console.log(filterByAge({ age: 30 })); // true
 * console.log(filterByAge({ age: 22 })); // false
 * ```
 * 
 * @callback DataModelFillter
 * @param row A record representing a row in the `DataModel`.
 * @returns `true` if the row matches the filter criteria, otherwise `false`.
 */
export interface DataModelFillter{(row: Record<string, any>): boolean;};
/**
 * The `hison.data` module provides core data management structures within the `hisondev` ecosystem.
 * It includes:
 *
 * - **`DataWrapper`**: A key-value based data storage container.
 * - **`DataModel`**: A structured table-like data model for handling tabular data.
 *
 * These components enable **efficient data storage, retrieval, validation, and transformation** 
 * while maintaining type safety and structural consistency.
 *
 * ### Core Features
 *
 * ### **1. Structured Data Management**
 * - `DataWrapper` provides **key-value storage**, allowing easy organization of structured data.
 * - `DataModel` offers **tabular data management**, ensuring **column consistency** across rows.
 *
 * ### **2. Data Transformation & Validation**
 * - Supports **custom conversion logic** through `hison.setConvertValue()`, allowing pre-insertion transformations.
 * - Allows setting a **`DataModelValidator`** to validate column values.
 * - Supports **`DataModelFormatter`** for automatic column formatting.
 *
 * ### **3. Deep Copy & Serialization**
 * - Ensures **data immutability** using **deep cloning** (`clone()`).
 * - Supports **JSON serialization** for structured data transfer (`getSerialized()`).
 *
 * ### **4. Integration Between `DataWrapper` and `DataModel`**
 * - `DataWrapper` can **store and retrieve** `DataModel` instances seamlessly.
 * - Allows flexible conversion between **key-value storage** and **structured table data**.
 *
 * ### Example Usage
 *
 * ### **Using `DataWrapper` for Key-Value Storage**
 * ```typescript
 * const dataWrapper = new hison.data.DataWrapper({ username: "Alice", age: 30 });
 * console.log(dataWrapper.getString("username")); // Output: "Alice"
 * ```
 *
 * ### **Using `DataModel` for Tabular Data**
 * ```typescript
 * const dataModel = new hison.data.DataModel([
 *     { id: 1, name: "Alice", age: 25 },
 *     { id: 2, name: "Bob", age: 30 }
 * ]);
 *
 * // Formatting and validation
 * dataModel.setColumnSameFormat("age", (value) => `${value} years old`);
 * dataModel.isValidValue("age", value => typeof value === "number");
 * ```
 *
 * ### **Storing `DataModel` Inside `DataWrapper`**
 * ```typescript
 * const usersData = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
 * const dataWrapper = new hison.data.DataWrapper();
 * dataWrapper.putDataModel("users", usersData);
 * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
 * ```
 *
 * ### Related Functions
 * - **`hison.setConvertValue(func)`**: 
 *   - Allows defining a **custom value transformation function** for `DataModel`.
 *   - Useful for formatting **Date objects** or handling special types before insertion.
 *   - Example:
 *   ```typescript
 *   hison.setConvertValue((value) => value instanceof Date ? value.toISOString() : value);
 *   ```
 */
export interface Data {
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
    DataWrapper: new <T extends Record<string, any>>(keyOrObject?: Record<string, InterfaceDataModel<T> | string> | string, value?: InterfaceDataModel<T> | string) => InterfaceDataWrapper;
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
    DataModel: new <T extends Record<string, any> = Record<string, any>>(data?: T[] | T) => InterfaceDataModel<T>;
};
