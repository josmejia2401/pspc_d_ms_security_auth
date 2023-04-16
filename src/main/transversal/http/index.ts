import { Constants } from "../constants";
import { buildLogger } from "../logger";
import { customErrorHandler } from "../middleware/custom-error-handler";
import { ValidatorOptions, validator } from "../middleware/validator";
import { JWT } from "../token";
import { HttpUtil } from "../utilities/http";
import { Utils } from "../utilities/utils";
import { JwtPayload } from "jsonwebtoken";

export interface HttpRequestEvent {
    params?: any;
    query?: any;
    url?: string;
    method: string;
    body?: any;
    headers: any;
}
export interface HttpResponseEvent {
    url?: string;
    method?: string;
    body?: any;
    headers?: any;
    statusCode?: number;
};
export interface OptionsHttp {
    authorization: string;
    origin: string;
    decodedToken?: JwtPayload;
}


export type Fn = (input: HttpRequestEvent, d: any, options?: OptionsHttp) => Promise<HttpResponseEvent | any>;

export async function instrumentLambda(fn: Fn, event: any, validatorOptions?: ValidatorOptions) {
    const response: HttpResponseEvent = {};
    try {
        const logger = buildLogger(event, Constants.LOGGER_MODE);
        const requestEvent: HttpRequestEvent = {
            method: HttpUtil.getMethodFromEvent(event),
            body: Utils.anyToJson(event["body"]),
            headers: Utils.anyToJson(event["headers"]),
            params: Utils.anyToJson(event["pathParameters"]),
            query: Utils.anyToJson(event["queryStringParameters"]),
        };
        const authorization: string = requestEvent.headers["authorization"] || requestEvent.headers["Authorization"];
        const origin: string = requestEvent.headers["origin"] || requestEvent.headers["Origin"] || "0.0.0.0";
        let decodedToken: any = null;
        if (Utils.isEmpty(authorization) === false) {
            const newtoken = authorization.replace("Bearer ", "").replace("bearer ", "");
            JWT.validateToken(newtoken);
            decodedToken = JWT.decodeToken(newtoken);
        }
        if (Utils.isEmpty(validatorOptions) === false) {
            validator(validatorOptions!, requestEvent, logger);
        }
        const output = await fn(requestEvent, { logger }, { authorization, origin, decodedToken });
        response.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            ...output.headers
        };
        response.body = JSON.stringify(output.body);
        response.statusCode = output.statusCode;
        return response;
    } catch (error) {
        return customErrorHandler(error);
    }
}
