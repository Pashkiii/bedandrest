export class DBError extends Error {
    cause = null;

    constructor(message, cause = null) {
        super(message);
        this.cause = cause;
    }
}

export class DBResponseError extends DBErrorError {
    error = '';
    status = 0;

    constructor(message, error, status) {
        super(message)

        this.error = error;
        this.status = status;
    }
}
