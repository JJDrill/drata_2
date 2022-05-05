// Requires authentication error
const error_401  = {
    code: 401,
    message: "Requires authentication"
}

// Forbidden error
const error_403 = {
    code: 403,
    message: "Forbidden"
}

// Resource not found error
const error_404 = {
    code: 404,
    message: "Resource not found"
}

// Validation failed error
const error_422 = {
    code: 422,
    message: "Validation failed"
}

module.exports = { error_401, error_403, error_404, error_422 };
