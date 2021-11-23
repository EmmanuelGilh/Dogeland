import axios from 'axios'

export const GET_DOGS = 'GET_DOGS'
export const GET_SEARCH = 'GET_SEARCH'

export  function getAllDogs() {
    return async dispatch => {
        const request = await axios.get('http://localhost:3001/dogs')
        dispatch({type: "GET_DOGS", payload: request.data})
    }
}

export  function getSearch(string) {
    return async dispatch => {
        const request = await axios.get(`http://localhost:3001/dogs`)
        let result = [];
        if(string){
            result = request.data.filter(country => country.name.toLowerCase().includes(string.toLowerCase()))
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