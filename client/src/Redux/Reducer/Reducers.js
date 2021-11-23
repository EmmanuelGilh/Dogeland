import { GET_DOGS, GET_SEARCH } from '../Actions/Actions.js'

const initialState = {
    dogsLoaded: [],
    detailDogs: {},
    searchResults: [],
}

function dogsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload
            }
        case GET_SEARCH:
            return{
                ...state,
                searchResults: action.payload
            }
        default:
        break;
    }
}

export default dogsReducer