import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError{
    statusCode = 400;

    constructor(public message: string){
        super(message); // For logging purposes

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    public serializeErrors() {
        return [
            {
                message: this.message,
            }
        ];
    }
}