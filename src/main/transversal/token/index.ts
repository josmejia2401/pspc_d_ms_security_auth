import { sign, decode, verify, JwtPayload } from "jsonwebtoken";
import { Utils } from "../utilities/utils";
import { Constants } from "../constants";

export class JWT {

    static refreshToken(token: string) {
        const newToken = Utils.getOnlyToken(token);
        const decodedPayload: any = verify(newToken, Constants.JWT.SECRET_VALUE, {
            audience: "barbapp",
            algorithms: ['HS256'],
        });
        const value = {
            username: decodedPayload.username,
            password: decodedPayload.password,
        };
        return this.sign(value);
    }


    static sign(value: any): string {
        const options: any = {
            expiresIn: Constants.JWT.TOKEN_LIFE,
            algorithm: 'HS256',
            audience: "barbapp",
            jwtid: Utils.buildUuid(),
            subject: value.username,
            keyid: "",
        };
        const accessToken = sign(value, Constants.JWT.SECRET_VALUE, options);
        return accessToken;
    }

    static validateToken(token: string) {
        const newToken = Utils.getOnlyToken(token);
        verify(newToken, Constants.JWT.SECRET_VALUE, {
            audience: "barbapp",
            algorithms: ['HS256'],
        });
    }

    static decodeToken(token: string): JwtPayload {
        const newToken = Utils.getOnlyToken(token);
        const dec: any = decode(newToken, {
            json: true
        });
        delete dec.username;
        delete dec.password;
        return dec;
    }

    static isValidToken(token: string): boolean {
        try {
            const newToken = Utils.getOnlyToken(token);
            JWT.validateToken(newToken);
            return true;
        } catch (_) {
            return false;
        }
    }
}