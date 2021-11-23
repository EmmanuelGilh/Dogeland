import React from 'react'
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ id, name, image, temperament, weight }) {
    return (
        <div className={styles.dogCard}>
        <Link to={{
                pathname: '/details',
                state: {id}
        }}>
            <img className={styles.image} src={image} alt={name}/>
        </Link>

                <h2>
            {name}
        </h2>                
        <h3>
            {temperament}
        </h3>   
        <h3>
            {weight}
        </h3>   
    </div>
)

}