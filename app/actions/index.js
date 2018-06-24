import * as TYPE from '../const';

export function setProfile(value) {
    return {
        type: TYPE.SET_PROFILE,
        value: value
    }
}