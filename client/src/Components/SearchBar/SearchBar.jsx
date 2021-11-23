import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SearchBar.module.css';
import { getSearch } from '../../Redux/Actions/Actions.js';

export default function SearchBar() {
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    function handleChange(e){        
        setSearch(e.target.value)
    }
    function handleClear(){
        setSearch('')
        dispatch(getSearch())
    }

    return (
        <div>
            <input type="text" placeholder="Search Dog" value={search} onChange={e => handleChange(e)} />
            <button type="button" className="botonBuscar" onClick={() => dispatch(getSearch(search))}>Search</button>
            <button type="button" className="clearButton" onClick={() => handleClear()}>Clear</button>
        </div>
    )
}
