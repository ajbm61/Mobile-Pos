import {
    ADD_ACTIVE_PRODUK
} from './actionTypes'

export const addActiveProduct = content => ({
    type: ADD_ACTIVE_PRODUK,
    payload: {
        content
    }
})