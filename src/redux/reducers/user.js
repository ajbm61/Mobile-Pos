import { ADD_ACTIVE_PRODUK } from '../actionTypes'

const initialState = {
    activeProduk: {
        data: []
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ACTIVE_PRODUK: {
            const { content } = action.payload
            return {
                ...state,
                activeProduk: [...state.data, content],
            }
        }
        default:
            return state
    }
}