import {normalizeResponseErrors} from './utils';
import {API_BASE_URL} from '../config';



export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    alert(err.message)
                    // new SubmissionError({
                    //     [location]: message
                    // })
                );
            }
        });
};
