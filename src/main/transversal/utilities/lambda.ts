import { CustomError } from "../error";
import { Utils } from "./utils";

export class LambdaUtil {
    static getResponseFromPayload(payload: any) {
        payload.body = Utils.anyToJson(payload.body);
        if (payload.statusCode !== 200 && payload.statusCode !== 201) {
            throw new CustomError(payload.body["message"], payload.body["code"], payload.statusCode);
        }
        return payload.body;
    }
}