declare namespace API {
    export interface Response<T = any> {
        code: number;
        data?: T;
        message?: string;
        statusCode: number;
    }
}