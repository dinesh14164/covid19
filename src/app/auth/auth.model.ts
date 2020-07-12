export interface IUser {
    email: string;
    password: string
}
export interface IMessage {
    status: string;
    message: string;
    token?: string;
    email?:  string;
}