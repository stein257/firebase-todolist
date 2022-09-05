import {atom} from 'recoil';

export const tasksState = atom({
    key: 'taskState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});