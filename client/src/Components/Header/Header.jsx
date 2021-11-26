import React from 'react';
import styles from './Header.module.css';
import Searchbar from '../SearchBar/SearchBar.jsx';

export default function Header() {
    return (
        <nav>
            <div>
                <h1 className={styles.title}> <b>Welcome to Dogeland!</b></h1>
                <span className='searchbar'><Searchbar /></span>
            </div>
        </nav>
    )
}