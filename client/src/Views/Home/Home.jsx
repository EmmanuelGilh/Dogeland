import React from 'react'
import Header from '../../Components/Header/Header.jsx';
import Filters from '../../Components/Filters/Filters.jsx';
import Collection from '../../Components/Collection/Collection.jsx';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className= {styles.wrapper}>
            <Header/>
            <Filters/>
            <Collection/>
        </div>
    )
}
