class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
        // allows us to test for errors without getting traceback
        if (process.env.NODE_ENV !== 'test') console.log(this.stack);
    }
}

class NotFoundError extends ExpressError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}

module.exports = { ExpressError, NotFoundError };