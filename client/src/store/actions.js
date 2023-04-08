import {
    SET_USERS,
    SET_MATTERS,
    SET_TYPE_SERVICES,
    SET_SERVICES,
    SET_QUOTES,
    SET_MATTER,
    SET_TASKS,
    SET_STEP,
    SET_STEPS,
} from './constants'

export const setUsers = payload => (
    {
        type: SET_USERS,
        payload
    }
)
export const setMatters = payload => (
    {
        type: SET_MATTERS,
        payload
    }
)
export const setTypeServices = payload => (
    {
        type: SET_TYPE_SERVICES,
        payload
    }
)
export const setServices = payload => (
    {
        type: SET_SERVICES,
        payload
    }
)
export const setQuotes = payload => (
    {
        type: SET_QUOTES,
        payload
    }
)
export const setMatter = payload => (
    {
        type: SET_MATTER,
        payload
    }
)
export const setTasks = payload => (
    {
        type: SET_TASKS,
        payload
    }
)
export const setStep = payload => (
    {
        type: SET_STEP,
        payload
    }
)
export const setSteps = payload => (
    {
        type: SET_STEPS,
        payload
    }
)