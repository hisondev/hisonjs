import { hisonCore } from "../core";

export class LRUCache {
    constructor(limit: number) {
        this._limit = limit;
        this._cache = {};
        this._keys = [];
    }
    private _limit: number;
    private _cache: Record<string, Promise<{ data: any; response: Response; }>>;
    private _keys: string[];
    private _removeKey = (key: string) => {
        const index = this._keys.indexOf(key);
        if (index > -1) {
            this._keys.splice(index, 1);
        }
    }
    hasKey = (key: string): boolean => {
        return this._cache.hasOwnProperty(key);
    }
    get = (key: string): Promise<{ data: any; response: Response; }> | null => {
        if(!this.hasKey(key)) return null;
        const value = hisonCore.utils.deepCopyObject(this._cache[key]);
        this._removeKey(key);
        this._keys.push(key);
        return value;
    };
    put = (key: string , value: Promise<{ data: any; response: Response; }>) => {
        if (this.hasKey(key)) {
            this.remove(key);
        } else if (this._keys.length == this._limit) {
            const oldestKey = this._keys.shift();
            if(oldestKey !== undefined) delete this._cache[oldestKey];
        }
        this._cache[key] = hisonCore.utils.deepCopyObject(value);
        this._keys.push(key);
    };
    remove = (key: string): Promise<{ data: any; response: Response; }> | null => {
        if(!this.hasKey(key)) return null;
        this._removeKey(key);
        const result = hisonCore.utils.deepCopyObject(this._cache[key])
        delete this._cache[key];
        return result;
    };
    getAll = (): Record<string, Promise<{ data: any; response: Response; }>> => {
        const result: Record<string, Promise<{ data: any; response: Response; }>> = {}
        Object.keys(this._cache).forEach((key) => {
            result[key] = hisonCore.utils.deepCopyObject(this._cache[key]);
        });
        return result;
    };
    getKeys = (): string[] => {
        const result: string[] = [];
        this._keys.forEach((key) => {
            result.push(key);
        })
        return result;
    };
    clear = () => {
        this._cache = {};
        this._keys = [];
    };
};
