import { Utils } from "./utilities/utils";

export class Constants {
    public static readonly REGION = `${process.env.REGION}`;
    public static readonly STAGE = `${process.env.STAGE}`;
    public static readonly SERVICE_NAME = `${process.env.SERVICE_NAME}`;
    public static readonly DOMAIN_NAME = `${process.env.DOMAIN_NAME}`;
    public static readonly LOGGER_MODE = `${process.env.LOGGER_MODE}`;
    public static readonly APP_NAME = `${process.env.APP_NAME}`;
    public static readonly AWS_DYNAMODB = {
        DYNDB_TOKEN_TBL: `${process.env.DYNDB_TOKEN_TBL}`,
        DYNDB_SCAN_NUM_SEGMET: Number(`${process.env.DYNDB_SCAN_NUM_SEGMET}`),
        DYNDB_SCAN_TOTAL_SEGMET: Number(`${process.env.DYNDB_SCAN_TOTAL_SEGMET}`),
        DYNDB_SCAN_IS_SEGMENT: Utils.anyToJson(process.env.DYNDB_SCAN_IS_SEGMENT),
        DYNDB_SCAN_IS_PARALLEL: Utils.anyToJson(process.env.DYNDB_SCAN_IS_PARALLEL),
    };
    public static readonly JWT = {
        SECRET_VALUE: `${process.env.JTW_SECRET_VALUE}`,
        TOKEN_LIFE: `${process.env.JWT_TOKEN_LIFE}`,
    };
    public static readonly STATUS_USER = {
        ACTIVE: 1,
        INACTIVE: 2,
        PENDING_ACTIVATION: 3
    }
}
