import {
    SET_USERS,
    SET_MATTERS
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