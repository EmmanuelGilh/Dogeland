import { GET_DOGS, GET_SEARCH, GET_DETAILS, FETCH_TEMPERAMENTS, SET_SOURCES, SET_OPTIONS, GET_DB, SAVE_SEARCH } from '../Actions/Actions.js'

const initialState = {
    dogsLoaded: [],
    dogsDB: [],
    detailsDogs: {},
    searchResults: [],
    temperamentsFromDB: [],
    sources: {},
    optionsSelected: {},
    search: ''
}

function dogsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload
            }
        case GET_DB:
            return {
                ...state,
                dogsDB: action.payload
            }
        case GET_DETAILS:
            return{
                ...state,
                detailsDogs: action.payload
            }
        case GET_SEARCH:
            return{
                ...state,
                searchResults: action.payload
            }
        case FETCH_TEMPERAMENTS:
        return {
            ...state,
            temperamentsFromDB: action.payload
        }
        case SET_SOURCES:
            return {
                ...state,
                sources: action.payload
            }
        case SET_OPTIONS:
            return {
                ...state,
                optionsSelected: action.payload
            }
        case SAVE_SEARCH:
            return {
                ...state,
                search: action.payload
            }  
        default:
        break;
    }
}

export default dogsReducer