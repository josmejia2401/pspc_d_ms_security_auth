import { AuthorizerUseCase } from "../../../domain/usecases/authorizer";
import { Fn, HttpRequestEvent, OptionsHttp } from "../../../transversal/http";
import { allowPolicy } from "../../../transversal/policy";

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
