import { SET_MATTERS, SET_QUOTES, SET_QUOTE_BY_ID, SET_SERVICES, SET_TIME_PAY, SET_TYPE_SERVICES, SET_USERS } from "./constants"
const initState = {
    users: [],
    matters: [],
    type_services: [],
    services: [],
    quotes: [],
    quoteOne: {},
    timePay: {}
}

function reducer(state, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_MATTERS:
            return {
                ...state,
                matters: action.payload
            }
        case SET_TYPE_SERVICES:
            return {
                ...state,
                type_services: action.payload
            }
        case SET_SERVICES:
            return {
                ...state,
                services: action.payload
            }
        case SET_QUOTES:
            return {
                ...state,
                quotes: action.payload
            }
        case SET_QUOTE_BY_ID:
            return {
                quoteOne: action.payload
            }
        case SET_TIME_PAY:
            return {
                timePay: action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}
export { initState }
export default reducer