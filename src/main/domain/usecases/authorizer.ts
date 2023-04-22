import { Utils } from "../../transversal/utilities/utils";
import { CustomError } from "../../transversal/error";
import { CacheUtils } from "../../transversal/cache";
import { SignOutUseCase } from "./user-sign-out";
import { OptionsHttp } from "../../transversal/http";
import { JWT } from "../../transversal/token";
import { TokenManage } from "../../infrastructure/driven/dyn-token-manage/manage";
import { TokenManageImpl } from "../../infrastructure/driven/dyn-token-manage/manage-impl";

export class AuthorizerUseCase {

    private logger: any;
    private tokenManage: TokenManage;
    private cacheUtils: CacheUtils;

    constructor(logger: any) {
        this.logger = logger;
        this.tokenManage = new TokenManageImpl(logger);
        this.cacheUtils = new CacheUtils();
    }

    async execute(options: OptionsHttp) {
        try {
            JWT.validateToken(options.authorization);
            const decodedToken = JWT.decodeToken(options.authorization);
            let tokenResult: any = this.cacheUtils.get(decodedToken.jti!);
            if (Utils.isEmpty(tokenResult)) {
                tokenResult = await this.tokenManage.getById(decodedToken.jti!);
                if (Utils.isEmpty(tokenResult)) {
                    throw new CustomError("Unauthorized", "Unauthorized", 401);
                }
                this.cacheUtils.set(decodedToken!.jti!, tokenResult);
            }
            if (tokenResult.token !== Utils.getOnlyToken(options.authorization)) {
                throw new CustomError("Token does not match", "Unauthorized", 401);
            }
            const isValid = JWT.isValidToken(tokenResult.token);
            if (isValid === false) {
                await new SignOutUseCase(this.logger).execute(options);
                throw new CustomError("The token has expired", "Unauthorized", 401);
            }
            return {
                principalId: tokenResult.username,
            };
        } catch (error) {
            this.logger.error(error);
            throw new CustomError("Unauthorized", "Unauthorized", 401);
        }
    }
}