export class HttpUtil {

    static buildCorsHeader(headers: any, methods: string[] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]) {
        let origin: string = "*";
        if (headers && headers["origin"]) {
            origin = headers["origin"];
        }
        if (headers && headers["Origin"]) {
            origin = headers["Origin"];
        }
        const headersResponse: any = {
            "Access-Control-Allow-Origin": origin,
            'Access-Control-Allow-Methods': methods.join(","),
            'Access-Control-Allow-Headers': '*',
        };
        return headersResponse;
    }

    static getMethodFromEvent(event: any) {
        if (event && event["httpMethod"]) {
            return String(event["httpMethod"]).toUpperCase();
        }
        if (event && event["requestContext"] && event["requestContext"]["httpMethod"]) {
            return String(event["requestContext"]["httpMethod"]).toUpperCase();
        }
        return "";
    }
}