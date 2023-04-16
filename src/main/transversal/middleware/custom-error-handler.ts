import { CustomError } from "../error";
import { Utils } from "../utilities/utils";

function isAxiosError(error: any) {
    if (error.response && error.response.status) {
        return true;
    }
    return false;
}

export async function customErrorHandler(customError: CustomError | Error | any): Promise<any> {
    if (isAxiosError(customError)) {
        const errorData = customError.response.data;
        const statusCode = customError.response.status || 500;
        if (Utils.isEmpty(errorData)) {
            return {
                statusCode: statusCode,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(errorData),
            };
        } else {
            return {
                statusCode: statusCode,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: "INTERNAL_ERROR",
                    message: "An internal server error occurred"
                }),
            };
        }
    } else if (customError.name === CustomError.name) {
        return (customError as CustomError).toJSON();
    } else {
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: "INTERNAL_ERROR",
                message: customError.message || "An internal server error occurred"
            }),
        };
    }
}