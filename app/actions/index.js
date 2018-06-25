import * as TYPE from '../const';

export function setProfile(value) {
    return {
        type: TYPE.SET_PROFILE,
        value: value
    }
}

export function setWebtoken(value) {
    return {
        type: TYPE.SET_WEBTOKEN,
        value: value
    }
}