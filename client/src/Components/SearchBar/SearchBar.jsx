import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBar.module.css';
import { getSearch, saveSearch } from '../../Redux/Actions/Actions.js';
import { Link } from 'react-router-dom'

export default function SearchBar() {
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()
    const searchResults = useSelector(state => state?.searchResults)

    useEffect(() => {
        if(typeof searchResults === 'string') return alert('No Results.')
    },[searchResults])

    function handleChange(e){        
        setSearch(e.target.value)
    }
    function handleClear(){
        setSearch('')
        dispatch(getSearch())
        dispatch(saveSearch())
    }

    return (
        <div className={styles.searchBar}>
            <input type="text" placeholder="Search Dog" value={search} onChange={e => handleChange(e)} />
            <button type="button" className="botonBuscar" onClick={() => {
                dispatch(getSearch(search))
                dispatch(saveSearch(search))
                }}>Search</button>
            <button type="button" className="clearButton" onClick={() => handleClear()}>Clear</button>
            <span>&nbsp;
                    <Link to="/dogcreator">
                        <button className='button' > Create A New Breed! </button>
                    </Link>
            </span>
        </div>
    )
}
