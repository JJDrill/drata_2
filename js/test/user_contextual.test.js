const { Octokit, App } = require("octokit");
const mock_data = require('./mock_data/hovercard');
const mock_errors = require('./mock_data/errors');
const g = require('../globals');

describe('When getting a user contextual information', () => {

    beforeEach(() => {
        octokit = new Octokit({ auth: g.github_auth })
    })

    test('the user data is returned successfully', () => {
        const hovercard = mock_data.hovercard;

        const mock = jest.fn().mockReturnValue(hovercard)
        octokit.request = mock
        const response = octokit.request('GET /users/' + g.github_account+ '/hovercard', {
            username: 'Fake_User'
        })

        expect(response).toBe(hovercard)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })
})

describe('When the call is not successful', () => {

    test('a 404 is resturned when the user is not found', () => {
        octokit = new Octokit({ auth: g.github_auth })
        const my_error = mock_errors.error_404;

        const mock = jest.fn().mockReturnValue(my_error)
        octokit.request = mock
        const response = octokit.request('GET /users/' + g.github_account+ '/hovercard', {
            username: 'Fake_User'
        })

        expect(response.code).toBe(my_error.code)
        expect(response.message).toBe(my_error.message)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })

    test('a 422 is resturned when the user is forbidden', () => {
        const my_error = mock_errors.error_422;

        const mock = jest.fn().mockReturnValue(my_error)
        octokit.request = mock
        const response = octokit.request('GET /users/' + g.github_account+ '/hovercard', {
            username: 'Fake_User'
        })
        
        expect(response.code).toBe(my_error.code)
        expect(response.message).toBe(my_error.message)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })
})