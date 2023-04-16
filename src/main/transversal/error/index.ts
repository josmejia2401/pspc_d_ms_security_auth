import { HttpResponseEvent } from "../http";

export class CustomError extends Error {

    private readonly code: string;
    private readonly statusCode: number;
    private isPrintValue: boolean = true;

    constructor(message: any, code: string, statusCode: number) {
        super(message)
        this.message = message;
        this.name = this.constructor.name || "CustomError";
        this.code = code;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    setPrint() {
        this.isPrintValue = false;
    }
    isPrint() {
        return this.isPrintValue;
    }
    toJSON(): HttpResponseEvent {
        return {
            "statusCode": this.statusCode,
            "headers": {},
            "body": JSON.stringify({
                "code": this.code,
                "message": this.message
            }),
        }
    }
}