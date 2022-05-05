const { Octokit, App } = require("octokit");
const mock_data = require('./mock_data/user');
const mock_errors = require('./mock_data/errors');
const g = require('../globals');

describe('When getting an authenticated user', () => {

    beforeEach(() => {
        octokit = new Octokit({ auth: g.github_auth })
    })

    test('the authenticated user data is returned successfully', () => {
        const my_user = mock_data.user;

        const mock = jest.fn().mockReturnValue(my_user)
        octokit.request = mock
        const response = octokit.request('GET /users/' + g.github_account, {})

        expect(response).toBe(my_user)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })
})

describe('When the call is not successful', () => {

    test('a 401 is resturned when the user is not autenticated', () => {
        const my_error = mock_errors.error_401;

        const mock = jest.fn().mockReturnValue(my_error)
        octokit.request = mock
        const response = octokit.request('GET /users/' + g.github_account, {})

        expect(response.code).toBe(my_error.code)
        expect(response.message).toBe(my_error.message)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })

    test('a 403 is resturned when the user is forbidden', () => {
        octokit = new Octokit({ auth: g.github_auth })
        const my_error = mock_errors.error_403;

        const mock = jest.fn().mockReturnValue(my_error)
        octokit.request = mock
        const response = octokit.request('GET /users/' + g.github_account, {})

        expect(response.code).toBe(my_error.code)
        expect(response.message).toBe(my_error.message)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })
})