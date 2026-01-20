import type { DataModelFillter, DataModelFormatter, DataModelValidator, InterfaceDataModel, InterfaceDataWrapper } from "../types";
import { customOption, hisonCore } from "../core";

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
export class DataModel<T extends Record<string, any> = Record<string, any>> implements InterfaceDataModel<T> {
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
        return new hisonCore.data.DataModel<T>(this._rows);
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
        return new hisonCore.data.DataModel<T>(this._rows[this._getValidRowIndex(rowIndex)]);
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
     * - If the `DataModel` has no rows, returns an empty array immediately.
     * - Calls `_getValidRowIndex(startRow)` to validate the starting index.
     * - If `endRow` is `null`, retrieves rows from `startRow` to the last row.
     * - If `endRow` is not `null`, calls `_getValidRowIndex(endRow)` to validate the ending index.
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
        if (this._rows.length === 0) return [];

        const sRow = this._getValidRowIndex(startRow);
        if (sRow === 0 && endRow === null) return this._deepCopy(this._rows);
        const eRow = endRow !== null ? this._getValidRowIndex(endRow) : this._rows.length - 1;

        const result: T[] = [];
        for (let i = sRow; i <= eRow; i++) {
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
     * - If the `DataModel` has no rows, returns a new empty `DataModel` instance.
     * - Calls `_getValidRowIndex(startRow)` to validate the starting index.
     * - If `startRow` is `0` and `endRow` is `null`, returns a clone of the entire `DataModel`.
     * - If `endRow` is not `null`, calls `_getValidRowIndex(endRow)` to validate the ending index.
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
        if (this._rows.length === 0) return new hisonCore.data.DataModel<T>([]);

        const sRow = this._getValidRowIndex(startRow);
        if (sRow === 0 && endRow === null) return this.clone();
        const eRow = endRow !== null ? this._getValidRowIndex(endRow) : this._rows.length - 1;

        const result: T[] = [];
        for (let i = sRow; i <= eRow; i++) {
            result.push(this._deepCopy(this._rows[i]));
        }
        return new hisonCore.data.DataModel<T>(result);
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
        return new hisonCore.data.DataModel(matched);
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
        return new hisonCore.data.DataModel(matched);
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
        this._cols = newColumns as string[];
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
};
