import { OptionsHttp } from "../../transversal/http";
import { CacheUtils } from "../../transversal/cache";
import { JWT } from "../../transversal/token";
import { TokenManage } from "../../infrastructure/driven/dyn-token-manage/manage";
import { TokenManageImpl } from "../../infrastructure/driven/dyn-token-manage/manage-impl";

export class SignOutUseCase {

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
            const decoded = JWT.decodeToken(options.authorization);
            this.cacheUtils.delete(decoded!.jti!);
            await this.tokenManage.delete(decoded?.jti!, decoded?.sub!);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}