import {
    refreshAdapter
} from "../../infrastructure/driving/aws/refresh-adapter";
import { instrumentLambda } from "../../transversal/http";

export async function refreshTokenHandler(event: any, _context: any) {
    return instrumentLambda(refreshAdapter(), event);
}