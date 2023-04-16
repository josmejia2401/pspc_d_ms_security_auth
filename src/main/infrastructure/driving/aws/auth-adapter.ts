import { SignInUseCase } from "../../../domain/usecases/user-sign-in";
import { SignOutUseCase } from "../../../domain/usecases/user-sign-out";
import { AuthorizerUseCase } from "../../../domain/usecases/authorizer";
import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";
import { RefreshUseCase } from "../../../domain/usecases/refresh-token";
import { allowPolicy } from "../../../transversal/policy";

export function signInAdapter(): Fn {
    return async function (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new SignInUseCase(logger).execute({
                password: event.body["password"],
                username: event.body["username"],
            }, options);
            return {
                "headers": { },
                "body": output,
                "statusCode": 200,
            };
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

export function signOutAdapter(): Fn {
    return async function (_event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new SignOutUseCase(logger).execute(options);
            return {
                "headers": {},
                "body": output,
                "statusCode": 200,
            };
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

export function authorizerAdapter(): Fn {
    return async function (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<any> {
        const { logger } = d;
        try {
            logger.debug("request");
            const output = await new AuthorizerUseCase(logger).execute(options);
            const response = allowPolicy(output.principalId, event.method, output);
            logger.debug("response", JSON.stringify(response));
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

export function refreshAdapter(): Fn {
    return async function (_event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new RefreshUseCase(logger).execute(options);
            return {
                "headers": {},
                "body": output,
                "statusCode": 200,
            };
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
