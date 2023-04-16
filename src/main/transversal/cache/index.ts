const NodeCache = require("node-cache");

/**
 * https://www.npmjs.com/package/node-cache
 */
export class CacheUtils {
    private readonly cacheClient: any;
    constructor() {
        this.cacheClient = new NodeCache({ stdTTL: 100, checkperiod: 120 });
    }
    get(key: string) {
        return this.cacheClient.get(key);
    }
    set(key: string, value: any) {
        return this.cacheClient.set(key, value);
    }
    has(key: string) {
        return this.cacheClient.has(key);
    }
    delete(key: string) {
        return this.cacheClient.del(key);
    }
    take(key: string) {
        return this.cacheClient.take(key);
    }
}