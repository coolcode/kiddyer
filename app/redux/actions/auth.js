export const login = (username, password) => {
    return {
        type: 'LOGIN',
        username: username,
        password: password
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const signup = (username, password) => {
    return (dispatch) => {
    };
};

const defaultState = {
    isLoggedIn: false,
    username: '',
    password: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: true,
                username: action.username,
                password: action.password
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                isLoggedIn: false,
                username: '',
                password: ''
            });
        default:
            return state;
    }
}
