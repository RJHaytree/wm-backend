/**
 * A function to format error codes in a more meaningful/readable manner.
 * @param {*} res 
 * @param {*} code 
 * @param {*} message 
 * @returns 
 */
function formatErrorResponse(res, code, message) {
    const err = {
        error: {
            status: code,
            message: message,
        },
    };

    return res.status(code).send(err);
}

module.exports = {formatErrorResponse};