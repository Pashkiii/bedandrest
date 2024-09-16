class ParseDataError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ParseDataError'
    }
}

module.exports = {
    ParseDataError
};
