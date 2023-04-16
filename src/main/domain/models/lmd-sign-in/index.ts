export interface SignInDTO {
    username: string;
    password: string;
}

export interface SignInResponseDTO {
    id: string;
    username: string;
    fullName: string;
    email: string;
    telephone: string;
}