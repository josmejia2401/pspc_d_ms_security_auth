import { SignOutUseCase } from "../../../domain/usecases/user-sign-out";
import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";

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