import { v4 as uuidv4 } from "uuid";

export class Utils {
    static isEmpty(value: any): Boolean {
        if (value === undefined || value === null || value === "") {
            return true;
        }
        if (Array.isArray(value) === true) {
            return value.length === 0;
        }
        if (typeof value === 'object' && Object.keys(value).length === 0) {
            return true;
        }
        return false;
    }

    static anyToJson(payload: any) {
        try {
            if (Utils.isEmpty(payload)) {
                return {};
            }
            return JSON.parse(payload);
        } catch (_) {
            return payload;
        }
    }
    static decode(s: string) {
        return Buffer.from(s, 'base64').toString();
    }
    static encode(b: string) {
        return Buffer.from(b).toString('base64');;
    }

    static Uint8ArrayToString(value: any) {
        return Buffer.from(value).toString();
    }

    static generateOTP(): number {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return Number(OTP);
    }
    static buildUuid() {
        return uuidv4();
    }

    static getOnlyToken(token: string): string {
        return token.replace("Bearer ", "").replace("bearer ", "");
    }

}