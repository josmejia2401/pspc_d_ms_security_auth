import Joi from "joi";
import {
    signInAdapter,
    authorizerAdapter,
    signOutAdapter,
    refreshAdapter
} from "../../infrastructure/driving/aws/auth-adapter";
import { HttpRequestEvent, instrumentLambda } from "../../transversal/http";
import { Utils } from "../../transversal/utilities/utils";
import { buildLogger } from "../../transversal/logger";
import { Constants } from "../../transversal/constants";

export async function signInHandler(event: any, _context: any) {
    return instrumentLambda(signInAdapter(), event, {
        bodySchema: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(8).required(),
        }).required()
    });
}

export async function signOutHandler(event: any, _context: any) {
    return instrumentLambda(signOutAdapter(), event);
}

export async function refreshTokenHandler(event: any, _context: any) {
    return instrumentLambda(refreshAdapter(), event);
}

export async function authorizerHandler(event: any, _context: any) {
    const logger = buildLogger(event, Constants.LOGGER_MODE);
    const requestEvent: HttpRequestEvent = {
        method: event["methodArn"],
        body: Utils.anyToJson(event["body"]),
        headers: Utils.anyToJson(event["headers"]),
        params: Utils.anyToJson(event["pathParameters"]),
        query: Utils.anyToJson(event["queryStringParameters"]),
    };
    const authorization: string = event["authorizationToken"] || requestEvent.headers["Authorization"] || requestEvent.headers["authorization"];
    const origin: string = requestEvent.headers["origin"] || requestEvent.headers["Origin"] || "0.0.0.0";
    const adapter = authorizerAdapter();
    return await adapter(requestEvent, { logger }, {
        authorization: authorization,
        origin: origin,
    });
}