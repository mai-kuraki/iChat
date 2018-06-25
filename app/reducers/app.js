import * as TYPE from '../const';

const initState = {
    profile: {},
    webtoken: '',
};

function main(state = initState, action) {
    switch (action.type) {
        case TYPE.SET_PROFILE:
            return Object.assign({}, state, {
                profile: action.value
            });
        case TYPE.SET_WEBTOKEN:
            return Object.assign({}, state, {
                webtoken: action.value
            });
        default:
            return state;
    }
}

export default main;