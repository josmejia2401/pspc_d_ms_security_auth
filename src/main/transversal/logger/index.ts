import { CustomError } from "../error";

export interface ILogger {
    info(...params: any[]): any | never;
    error(...params: any[]): any | never;
    debug(...params: any[]): any | never;
    warn(...params: any[]): any | never;
}
class Logger implements ILogger {
    private readonly event: any;
    private readonly mode: string;
    constructor(event: any, mode = "ALL") {
        this.event = event;
        this.mode = mode;
    }
    isPrint(...params: any[]) {
        for (const param of params) {
            if (param[0]?.name === CustomError.name) {
                if (param[0].isPrint() === false) {
                    return false;
                } else {
                    param[0].setPrint();
                    break;
                }
            }
        }
        return true;
    }
    info(...params: any[]): any | never {
        if (this.mode === "ALL" || this.mode === "INFO") {
            if (this.isPrint(params)) {
                console.info({ "event": this.event }, ...params);
            }
        }
    }
    error(...params: any[]): any | never {
        if (this.mode === "ALL" || this.mode === "ERROR" || this.mode === "DEBUG" || this.mode === "INFO") {
            if (this.isPrint(params)) {
                console.error({ "event": this.event }, ...params);
            }
        }
    }
    debug(...params: any[]): any | never {
        if (this.mode === "ALL" || this.mode === "DEBUG") {
            if (this.isPrint(params)) {
                console.debug({ "event": this.event }, ...params);
            }
        }
    }
    warn(...params: any[]): any | never {
        if (this.mode === "ALL" || this.mode === "WARN") {
            if (this.isPrint(params)) {
                console.warn({ "event": this.event }, ...params);
            }
        }
    }
}
export const buildLogger = (event: any, mode: string): ILogger => new Logger(event, mode);
