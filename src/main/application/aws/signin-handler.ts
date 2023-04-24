import Joi from "joi";
import {
    signInAdapter,
} from "../../infrastructure/driving/aws/signin-adapter";
import { instrumentLambda } from "../../transversal/http";

export async function signInHandler(event: any, _context: any) {
    return instrumentLambda(signInAdapter(), event, {
        bodySchema: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(8).required(),
        }).required()
    });
}
