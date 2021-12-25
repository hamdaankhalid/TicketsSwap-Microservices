export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string){
        super(message);

        Object.setPrototypeOf(this.message, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[];
}

// this way we can ensure we always have other custom errors conforming
// to our style, as well as only have one instanceof check in 
// error-handler middleware