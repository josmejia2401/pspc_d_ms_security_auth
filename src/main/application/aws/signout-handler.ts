import {
    signOutAdapter
} from "../../infrastructure/driving/aws/signout-adapter";
import { instrumentLambda } from "../../transversal/http";
export async function signOutHandler(event: any, _context: any) {
    return instrumentLambda(signOutAdapter(), event);
}
