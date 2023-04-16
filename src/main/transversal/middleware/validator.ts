import { ObjectSchema, ArraySchema, ValidationError, ValidationErrorItem } from "joi";
import { ILogger } from "../logger/index";
import { Utils } from "../utilities/utils";
import { CustomError } from "../error";
import { HttpRequestEvent } from "../http";

export interface ValidatorOptions {
    pathSchema?: ObjectSchema;
    querySchema?: ObjectSchema;
    bodySchema?: ObjectSchema | ArraySchema;
    headerSchema?: ObjectSchema;
}

function buildErrors(error: ValidationError | Error) {
    const errors = [];
    try {
        (error as ValidationError).details.forEach((detail: ValidationErrorItem) => detail.path.forEach(p => { errors.push({ [p]: detail.message }) }));
    } catch (error) {
        console.log(error);
    }
    if (errors.length === 0) {
        errors.push(error.message);
    }
    return errors;
}

export function validator(options: ValidatorOptions, event: HttpRequestEvent, logger: ILogger) {
    try {
        if (Utils.isEmpty(options.bodySchema) === false) {
            const { error } = options.bodySchema!.validate(event.body || {});
            if (error) {
                throw error;
            }
        }
        if (Utils.isEmpty(options.headerSchema) === false) {
            const { error } = options.headerSchema!.validate(event.headers || {});
            if (error) {
                throw error;
            }
        }
        if (Utils.isEmpty(options.querySchema) === false) {
            const { error } = options.querySchema!.validate(event.query || {});
            if (error) {
                throw error;
            }
        }
        if (Utils.isEmpty(options.pathSchema) === false) {
            const { error } = options.pathSchema!.validate(event.params || {});
            if (error) {
                throw error;
            }
        }
    } catch (error) {
        logger.error("@validator", "internal error", error);
        const errors = buildErrors(error);
        throw new CustomError(errors, "BAD_REQUEST", 400);
    }
}