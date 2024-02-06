import axios from 'axios'
import {config} from '../../Constants'
import {parseJwt} from './Helpers'

export const orderApi = {
    authenticate,
    signup,
    getQuestions,
    getQuestion,
    saveQuestions
}

function authenticate(username, password) {
    const email = username;
    return instance.post('/rest/auth/login', {email, password}, {
        headers: {'Content-type': 'application/json'}
    })
}

function signup(user) {
    return instance.post('/auth/signup', user, {
        headers: {'Content-type': 'application/json'}
    })
}

function getQuestions(user) {
    const url = '/questions';
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function getQuestion(user, idx) {
    const url = `/questions/${idx}`;
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    });
}

function saveQuestions(question, user) {
    return instance.post('/questions', question, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)
        if (Date.now() > data.exp * 1000) {
            window.location.href = "/login"
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

// -- Helper functions
function bearerAuth(user) {
    return `Bearer ${user.accessToken}`
}
