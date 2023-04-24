import {
    authorizerAdapter,
} from "../../infrastructure/driving/aws/authorizer-adapter";
import { HttpRequestEvent } from "../../transversal/http";
import { Utils } from "../../transversal/utilities/utils";
import { buildLogger } from "../../transversal/logger";
import { Constants } from "../../transversal/constants";


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