const { Octokit, App } = require("octokit");
const mock_data = require('./mock_data/user');
const mock_errors = require('./mock_data/errors');
const g = require('../globals');

describe('When updating a user', () => {
    
    beforeEach(() => {
        octokit = new Octokit({ auth: g.github_auth })
    })

    test('the authenticated user data is returned successfully', () => {
        const my_user = mock_data.user;
        const updated_name = 'Updated Name'
        const updated_company = 'Updated Company'
        const my_updated_user = my_user
        my_updated_user.name = updated_name;
        my_updated_user.company = updated_company;

        const mock = jest.fn().mockReturnValue(my_updated_user)
        octokit.request = mock
        const response = octokit.request('PATCH /user', {
            name: updated_name,
            company: updated_company
        })

        expect(response.id).toBe(my_user.id)
        expect(response.name).toBe(updated_name)
        expect(response.company).toBe(updated_company)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })
})

describe('When the call is not successful', () => {

    test('a 401 is resturned when the user is not autenticated', () => {
        const my_error = mock_errors.error_401;

        const mock = jest.fn().mockReturnValue(my_error)
        octokit.request = mock
        const response = octokit.request('PATCH /user', {
            name: 'Updated Name',
            company: 'Updated Company'
        })

        expect(response.code).toBe(my_error.code)
        expect(response.message).toBe(my_error.message)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })

    test('a 403 is resturned when the user is forbidden', () => {
        octokit = new Octokit({ auth: 'unknown_github_account' })
        const my_error = mock_errors.error_403;

        const mock = jest.fn().mockReturnValue(my_error)
        octokit.request = mock
        const response = octokit.request('PATCH /user', {
            name: 'Updated Name',
            company: 'Updated Company'
        })

        expect(response.code).toBe(my_error.code)
        expect(response.message).toBe(my_error.message)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })

    test('a 404 is resturned when the user is not found', () => {
        octokit = new Octokit({ auth: 'unknown_account' })
        const my_error = mock_errors.error_404;

        const mock = jest.fn().mockReturnValue(my_error)
        octokit.request = mock
        const response = octokit.request('PATCH /user', {
            name: 'Updated Name',
            company: 'Updated Company'
        })

        expect(response.code).toBe(my_error.code)
        expect(response.message).toBe(my_error.message)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })

    test('a 422 is resturned when the validation fails', () => {
        octokit = new Octokit({ auth: g.github_auth })
        const my_error = mock_errors.error_422;

        const mock = jest.fn().mockReturnValue(my_error)
        octokit.request = mock
        const response = octokit.request('PATCH /user', {
            name: 'Updated Name',
            company: 'Updated Company'
        })
        
        expect(response.code).toBe(my_error.code)
        expect(response.message).toBe(my_error.message)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })
})