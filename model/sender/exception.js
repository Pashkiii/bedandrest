export class SenderError extends Error {
    cause = null;

    constructor(message, cause) {
        super(message);

        this.cause = cause;
    }
}
