import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";
import { RefreshUseCase } from "../../../domain/usecases/refresh-token";

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
