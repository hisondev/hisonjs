import { DataModelFillter, DataModelFormatter, DataModelValidator } from "./data";

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
export interface InterfaceDataModel<T extends Record<string, any> = Record<string, any>> {
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
    getIsDataModel(): boolean;
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
    clone(): InterfaceDataModel<T>;
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
    clear(): InterfaceDataModel<T>;
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
    getSerialized(): string;
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
    isDeclare(): boolean;
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
    getColumns(): string[];
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
    getColumnValues<K extends keyof T>(column: K): T[K][];
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
    addColumn(column: string): InterfaceDataModel<T>;
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
    addColumns(columns: string[]): InterfaceDataModel<T>;
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
    setColumnSameValue<K extends keyof T>(column: K, value: T[K]): InterfaceDataModel<T>;
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
    setColumnSameFormat<K extends keyof T>(column: K, formatter: DataModelFormatter): InterfaceDataModel<T>;
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
    getRow(rowIndex: number): T;
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
    getRowAsDataModel(rowIndex: number): InterfaceDataModel<T>;
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
    addRow(rowIndexOrRow?: number | T, row?: T): InterfaceDataModel<T>;
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
     * @param {number | null} [endRow=null] The ending index of the row range (inclusive).
     * @returns {T[]} An array of deep-copied rows, preserving type safety.
     * @throws {Error} If `startRow` or `endRow` is out of bounds.
     */
    getRows(startRow?: number, endRow?: number | null): T[];
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
     * @param {number | null} [endRow=null] The ending index of the row range (inclusive).
     * @returns {InterfaceDataModel<T>} A new `DataModel` instance containing the selected rows.
     * @throws {Error} If `startRow` or `endRow` is out of bounds.
     */
    getRowsAsDataModel(startRow?: number, endRow?: number | null): InterfaceDataModel<T>;
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
    addRows(rows: T[]): InterfaceDataModel<T>;
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
     * @returns {{ cols: (keyof T)[], rows: T[], colCount: number, rowCount: number, isDeclare: boolean }}
     *          A structured object representing the `DataModel` structure.
     */
    getObject(): { cols: (keyof T)[]; rows: T[]; colCount: number; rowCount: number; isDeclare: boolean; };
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
    getValue<K extends keyof T>(rowIndex: number, column: K): T[K];
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
    setValue<K extends keyof T>(rowIndex: number, column: K, value: T[K]): InterfaceDataModel<T>;
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
    removeColumn<K extends keyof T>(column: K): InterfaceDataModel<T>;
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
    removeColumns<K extends keyof T>(columns: K[]): InterfaceDataModel<T>;
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
    removeRow(rowIndex?: number): T;
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
    getColumnCount(): number;
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
    getRowCount(): number;
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
    hasColumn<K extends keyof T>(column: K): boolean;
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
    setValidColumns<K extends keyof T>(columns: K[]): InterfaceDataModel<T>;
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
    isNotNullColumn<K extends keyof T>(column: K): boolean;
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
    findFirstRowNullColumn<K extends keyof T>(column: K): T | null;
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
    isNotDuplColumn<K extends keyof T>(column: K): boolean;
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
    findFirstRowDuplColumn<K extends keyof T>(column: K): T | null;
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
    isValidValue<K extends keyof T>(column: K, vaildator: DataModelValidator): boolean;
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
    findFirstRowInvalidValue<K extends keyof T>(column: K, vaildator: DataModelValidator): T | null;
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
    searchRowIndexes<K extends keyof T>(condition: Record<K, T[K]>, isNegative?: boolean): number[];
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
    searchRows<K extends keyof T>(condition: Record<K, T[K]>, isNegative?: boolean): T[];
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
    searchRowsAsDataModel<K extends keyof T>(condition: Record<K, T[K]>, isNegative?: boolean): InterfaceDataModel<T>;
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
    searchAndModify<K extends keyof T>(condition: Record<K, T[K]>, isNegative?: boolean): InterfaceDataModel<T>;
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
    filterRowIndexes(filter: DataModelFillter): number[];
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
    filterRows(filter: DataModelFillter): T[];
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
    filterRowsAsDataModel(filter: DataModelFillter): InterfaceDataModel<T>;
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
    filterAndModify(filter: DataModelFillter): InterfaceDataModel<T>;
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
    setColumnSorting<K extends keyof T>(columns: K[]): InterfaceDataModel<T>;
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
    sortColumnAscending(): InterfaceDataModel<T>;
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
    sortColumnDescending(): InterfaceDataModel<T>;
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
    sortColumnReverse(): InterfaceDataModel<T>;
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
    sortRowAscending<K extends keyof T>(column: K, isIntegerOrder?: boolean): InterfaceDataModel<T>;
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
    sortRowDescending<K extends keyof T>(column: K, isIntegerOrder?: boolean): InterfaceDataModel<T>;
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
    sortRowReverse(): InterfaceDataModel<T>;
};
