import { TokenDTO } from "../../../domain/models/token";

export interface TokenManage {
    getById(id: string): Promise<TokenDTO>;
    create(payload: TokenDTO): Promise<any>;
    update(id: string, payload: TokenDTO): Promise<any>;
    delete(id: string, userId: string): Promise<any>
    getByUsername(username: string): Promise<TokenDTO[]>;
}