import React from 'react'
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import placeholder from '../../Media/dog_creationIMG.jpg'

export default function Card({ id, name, image, temperament, weight }) {

    return (
        <div className={styles.dogCard}>
        <Link to={{
                pathname: '/dogs',
                state: {id}
    }}>
        {
            <img className={styles.image} src={image === 'img' ? placeholder : image} alt={name}/>
        }
        </Link>

            <h2>
                Breed: {name}
            </h2>                
            <h3>
                Temperament: {
                    Array.isArray(temperament) ? temperament.map(temp => (
                    <span>{temp === temperament[temperament.length-1] ? temp+'' : temp+', '}</span>)) 
                    : temperament
                }
            </h3>   
            <h3>
                Weight in KG: {weight}
            </h3>   
    </div>
)

}

