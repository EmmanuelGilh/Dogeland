import axios from 'axios'

export const GET_DOGS = 'GET_DOGS'
export const GET_SEARCH = 'GET_SEARCH'
export const GET_DB = "GET_DB"
export const GET_DETAILS = 'GET_DETAILS'
export const FETCH_TEMPERAMENTS = 'FETCH_TEMPERAMENTS'
export const SET_OPTIONS = "SET_OPTIONS"
export const SET_SOURCES = "SET_SOURCES"
export const SAVE_SEARCH = 'SAVE_SEARCH'


export  function getAllDogs() {
    return async dispatch => {
        const request = await axios.get('http://localhost:3001/dogs')
        dispatch({type: "GET_DOGS", payload: request.data})
    }
}

export function fetchDB() {
    return async function (dispatch) {
        const request = await axios.get('http://localhost:3001/dogsDB')
        dispatch({type: "GET_DB", payload: request.data})
    }
}

export  function getDetails(id) {
    return async dispatch => {
        const request = await axios.get(`http://localhost:3001/dogs/${id}`)
        dispatch({type: 'GET_DETAILS', payload: request.data})
    }
}

export  function getSearch(string) {
    return async dispatch => {
        const request = await axios.get(`http://localhost:3001/dogs`)
        let result = [];
        if(string){
            result = request.data.filter(dog => dog.name.toLowerCase().includes(string.toLowerCase()))
                if(result.length){
                    dispatch({type: 'GET_SEARCH', payload: result})
                }
                else {
                    result = 'No results.'
                    dispatch({type: 'GET_SEARCH', payload: result})                    
                }
        }
        else{                       
            dispatch({type: 'GET_SEARCH', payload: result})
        }
    }
}

//FILTERS

export function fetchAndMapTemperaments(){
    return async dispatch => { 
        const request = await axios.get('http://localhost:3001/Temperament')
    
        let array = request.data.map((temperament) => temperament.name).sort((a, b) => 
            a.localeCompare(b)).filter(filter => filter !== 'undefined')
        dispatch({ type: "FETCH_TEMPERAMENTS", payload: array})
    };
}

export function setSources(API, DB){
    return function(dispatch){
        let obj = {}
        return ( 
                obj = {API, DB},
                dispatch({ type: "SET_SOURCES", payload: obj}))
            
    }
}

export function setOptionsSelected(temperament, order, weight){
    return function(dispatch){
        let obj = {}
        return ( 
                obj = {temperament: temperament,
                    order: order,
                    weight: weight},
                dispatch({ type: "SET_OPTIONS", payload: obj}))
            
    }}

export function saveSearch(search){
    return function(dispatch){
        let searchString = ''
        return (
            searchString = search,
            dispatch({ type: "SAVE_SEARCH", payload: searchString})
        )
    }
}