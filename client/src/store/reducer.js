import { SET_MATTER, SET_MATTERS, SET_QUOTES, SET_SERVICES, SET_TYPE_SERVICES, SET_USERS } from "./constants"
const initState = {
    users: [],
    matters: [],
    matter: null,
    type_services: [],
    services: [],
    quotes: [],
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
        case SET_MATTER:
            return {
                ...state,
                matter: action.payload
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
        default:
            throw new Error('Invalid action')
    }
}
export { initState }
export default reducer