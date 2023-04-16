import { Utils } from "../../transversal/utilities/utils";
import { CustomError } from "../../transversal/error";
import { CacheUtils } from "../../transversal/cache";
import { OptionsHttp } from "../../transversal/http";
import { JWT } from "../../transversal/token";
import { TokenManage } from "../../infrastructure/driven/dyn-token-manage/manage";
import { TokenManageImpl } from "../../infrastructure/driven/dyn-token-manage/manage-impl";

export class RefreshUseCase {

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
            let decodedToken = JWT.decodeToken(options.authorization);
            let tokenResult: any = this.cacheUtils.get(decodedToken?.jti!);
            if (Utils.isEmpty(tokenResult)) {
                tokenResult = await this.tokenManage.getById(decodedToken?.jti!);
                if (Utils.isEmpty(tokenResult)) {
                    throw new CustomError("Token is not valid", "BAD_REQUEST", 401);
                }
            }
            await this.tokenManage.delete(decodedToken?.jti!, decodedToken?.sub!);
            const accessToken = JWT.refreshToken(options.authorization);
            decodedToken = JWT.decodeToken(accessToken);
            this.cacheUtils.set(decodedToken!.jti!, tokenResult);
            return {
                "refreshToken": accessToken,
            }
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}