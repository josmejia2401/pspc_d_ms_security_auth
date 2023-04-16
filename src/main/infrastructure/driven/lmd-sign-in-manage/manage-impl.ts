import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { LambdaUtil } from "../../../transversal/utilities/lambda";
import { Constants } from "../../../transversal/constants";
import { Utils } from "../../../transversal/utilities/utils";
import { SignInDTO, SignInResponseDTO } from "../../../domain/models/lmd-sign-in";
import { SignInAuthManage } from "./manage";
import { CustomError } from "../../../transversal/error";

export class SignInAuthManageImpl implements SignInAuthManage {

    private readonly logger: any;
    private readonly fnName: string;
    private readonly lambdaClient: LambdaClient;

    constructor(logger: any) {
        this.logger = logger;
        this.fnName = `${Constants.STAGE}-${Constants.APP_NAME}-clients-users-get-user-by-username-and-pass`;
        this.lambdaClient = new LambdaClient({ region: Constants.REGION });
    }

    async execute(req: SignInDTO): Promise<SignInResponseDTO> {
        try {
            const params = {
                FunctionName: this.fnName,
                InvocationType: 'RequestResponse',
                LogType: 'None',
                Payload: Buffer.from(JSON.stringify({
                    lambdaFunction: true,
                    method: "POST",
                    headers: {
                        origin: "0.0.0.0",
                    },
                    body: JSON.stringify(req)
                })),
            };
            const command = new InvokeCommand(params);
            const response = await this.lambdaClient.send(command);
            const payloadBuffer = Utils.Uint8ArrayToString(response.Payload!);
            const payload = Utils.anyToJson(payloadBuffer);
            this.logger.debug(payload);
            return LambdaUtil.getResponseFromPayload(payload);
        } catch (error) {
            this.logger.error(error);
            if (error.name === CustomError.name && error.toJSON().statusCode === 404) {
                //https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
                throw new CustomError("Login failed; Invalid user ID or password.", "UNAUTHORIZED", 401);
            }
            throw error;
        }
    }
}
