import { SET_MATTERS, SET_USERS } from "./constants"
const initState = {
    users: [],
    matters: []
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
        default:
            throw new Error('Invalid action')
    }
}
export { initState }
export default reducer