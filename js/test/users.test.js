const { Octokit, App } = require("octokit");
const mock_data = require('./mock_data/users');
const g = require('../globals');

beforeEach(() => {
    octokit = new Octokit({ auth: g.github_auth })
})

describe('When getting the list of users', () => {

    test('the list is returned successfully', () => {
        const mock = jest.fn().mockReturnValue(mock_data.users)
        octokit.request = mock
        const response = octokit.request('GET /users');

        expect(response).toBe(mock_data.users)
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
    })
})
