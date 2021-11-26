import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOptionsSelected, setSources, fetchAndMapTemperaments } from '../../Redux/Actions/Actions.js'


export default function Filters() {
    const [API, setAPI] = useState(true)
    const [DB, setDB] = useState(true)
    const [temperament, setTemperament] = useState('All')
    const [order, setOrder] = useState('Default')
    const [weight, setWeight] = useState('All')
    const [allTemps, setAllTemps] = useState([])

    const dispatch = useDispatch()
    const temperamentsDB = useSelector(state => state?.temperamentsFromDB)

    useEffect(() => {
        dispatch(setSources(API, DB))
        dispatch(setOptionsSelected(temperament, order, weight))
        dispatch(fetchAndMapTemperaments())
    },[])

    useEffect(()=>{
        if (!temperamentsDB?.length) dispatch(fetchAndMapTemperaments())
    },[temperamentsDB])

    useEffect(() => {
        dispatch(setSources(API, DB))
    },[API, DB])

    useEffect(() => {
        dispatch(setOptionsSelected(temperament, order, weight))
    },[temperament, order, weight])

    useEffect(() => {
        setAllTemps(temperamentsDB)
    }, [temperamentsDB])

    let id = 0


    return (
        <div>
            <div className='buttons'>
                <span className="button-row">Results from: </span>
                    <input type="checkbox" defaultChecked={true} onChange={e => setAPI(!API)} id="vehicle1" name="vehicle1" value="Bike" />
                    <label>API</label>

                    <input type="checkbox" defaultChecked={true} onChange={e => setDB(!DB)} id="vehicle1" name="vehicle1" value="Bike" />
                    <label>DB</label>
                    <span className='mini-splitter'>&nbsp;</span>

                <span className="button-row">Sort by: </span>
                    <label>Temperament:</label>
                    <select name="Temperaments" id="Temperaments" onChange={e => setTemperament(e.target.value)}>
                        <option value="All">All</option>
                        {
                            allTemps?.map( temp => <option key={id++} value={temp}>{temp}</option>)
                        }
                    </select>
                    <span className='mini-splitter'>&nbsp;</span>

                    <label>Order:</label>
                    <select name="Order" id="Order" onChange={e => setOrder(e.target.value)}>
                        <option value="Default">Default</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>
                    <span className='mini-splitter'>&nbsp;</span>

                    <label>Weight:</label>
                    <select name="Weight" id="Weight" onChange={e => setWeight(e.target.value)}>
                        <option value="Default">Default</option>
                        <option value="Lightest-first">Lightest first</option>
                        <option value="Heaviest-first">Heaviest first</option>
                    </select>
                </div>
        </div>
    )
}
