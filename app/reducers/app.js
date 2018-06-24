import * as TYPE from '../const';

const initState = {
    profile: {},
};

function main(state = initState, action) {
    switch (action.type) {
        case TYPE.SET_PROFILE:
            return Object.assign({}, state, {
                profile: action.value
            });
        default:
            return state;
    }
}

export default main;