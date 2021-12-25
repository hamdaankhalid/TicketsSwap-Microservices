import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor(){
        super('Error connecting to DB'); // For logging purposes

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    public serializeErrors() {
        return [
            {
                message: this.reason
            }
        ];
    }
}