import { SignInUseCase } from "../../../domain/usecases/user-sign-in";
import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";

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
