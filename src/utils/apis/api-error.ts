export class ApiError extends Error {
    statusCode: number;
    success: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
        };
    }
}
