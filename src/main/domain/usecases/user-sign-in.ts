import { SignInDTO } from "../models/lmd-sign-in";
import { Utils } from "../../transversal/utilities/utils";
import { JWT } from "../../transversal/token";
import { OptionsHttp } from "../../transversal/http";
import { TokenManage } from "../../infrastructure/driven/dyn-token-manage/manage";
import { TokenManageImpl } from "../../infrastructure/driven/dyn-token-manage/manage-impl";
import { SignInAuthManage } from "../../infrastructure/driven/lmd-sign-in-manage/manage";
import { SignInAuthManageImpl } from "../../infrastructure/driven/lmd-sign-in-manage/manage-impl";

export class SignInUseCase {

    private logger: any;
    private userManage: SignInAuthManage;
    private tokenManage: TokenManage;

    constructor(logger: any) {
        this.logger = logger;
        this.userManage = new SignInAuthManageImpl(logger);
        this.tokenManage = new TokenManageImpl(logger);
    }

    async execute(input: SignInDTO, _options: OptionsHttp) {
        try {
            const userInfo = await this.userManage.execute({ username: input.username, password: input.password });
            const tokenResults = await this.tokenManage.getByUsername(userInfo.username);
            if (!Utils.isEmpty(tokenResults)) {
                const availableToken = tokenResults.filter(p => JWT.isValidToken(p.token) === true);
                if (!Utils.isEmpty(availableToken)) {
                    return {
                        "accessToken": availableToken[0].token,
                    }
                }
            } 
            const accessToken = JWT.sign({ username: userInfo.id, name: userInfo.fullName });
            const decoded = JWT.decodeToken(accessToken);
            await this.tokenManage.create({
                createAt: new Date(decoded!.iat!).toISOString(),
                id: decoded!.jti!,
                token: accessToken,
                userId: userInfo.id,
                username: decoded!.sub!,
                audience: String(decoded!.aud!),
                expirationAt: new Date(decoded!.exp!).toISOString()
            });
            return {
                "accessToken": accessToken,
            }
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}