import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './DetailsDogs.module.css';
import { getDetails } from '../../Redux/Actions/Actions.js';
import loadingGIFDogs from '../../Media/loadingGIFDogs.gif'
import placeholder from '../../Media/dog_creationIMG.jpg'


export default function DetailsDogs() {
    const [loading, setLoading] = useState(true)
    const [display, setDisplay] = useState({})

    const dispatch = useDispatch()
    const detailsDogs = useSelector(state => state?.detailsDogs)
    const dogsDB = useSelector(state => state?.dogsDB)

    const location = useLocation()
    const { id }  = location.state

    // useEffect(() =>{
    //     if (!detailsDogs?.length) dispatch(getDetails(id))
    // }, [])

    // Dispatches get from API, or sets dog if id type is from DB
    useEffect(() => {
        // if id doesn't match anything in API or DB return error
        if (typeof id !== 'string') dispatch(getDetails(id))
        else {
            let array = dogsDB
            array = array.filter(dog => dog.idDB === id)
            setDisplay(array[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // If dog is loaded from API, sets dog state using the API response
    useEffect(() => {
        if (Array.isArray(detailsDogs) && detailsDogs?.length > 0 && detailsDogs[0]?.id === id) setDisplay(detailsDogs[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[detailsDogs])

    // If information is ready to display, removes loading state
    useEffect(() => {
        if (display?.id === id || display?.idDB === id) setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[display])

    // useEffect(() => {
    //     if (detailsDogs) setDisplay(detailsDogs[0])
    // }, [detailsDogs])

    // useEffect(() => {
    //     if (display && display?.id === id) setLoading(false)
    // },[display, detailsDogs])

    return (
        <div>
            {
                loading ? (
                    <img src={loadingGIFDogs}
                    alt='gif carga'/>
                    
                ) : (
                    <div className= {styles.cardDetail}>
                            <img className={styles.image} src={display?.image === 'img' ? placeholder : display?.image} alt={display.name}/>
                            <h2>Breed: {display.name}</h2>
                            <h3>Temperament: {Array.isArray(display?.temperament) ? display?.temperament.map(temp => (
                                <span>{temp === display?.temperament[display?.temperament.length-1] ? temp+'' : temp+', '}</span>)) 
                            : display?.temperament}
                            </h3>
                            <h3>Height in CM: {display.height}</h3>
                            <h3>Weight in KG: {display.weight}</h3>
                            <h3>Life Span: {display.life_span}</h3>

                    </div>
                    
                )
                }
                    <div>
                        <Link to="/home">
                            <button className='button' > Back to Home </button>
                        </Link>
                    </div>
        </div>
    )
}
