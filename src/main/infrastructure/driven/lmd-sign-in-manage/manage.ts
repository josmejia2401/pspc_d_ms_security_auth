import { SignInDTO, SignInResponseDTO } from "../../../domain/models/lmd-sign-in";

export interface SignInAuthManage {
    execute(req: SignInDTO): Promise<SignInResponseDTO>;
}