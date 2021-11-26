import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './DogCreator.module.css';
import dancing_doge from '../../Media/dancing_doge.gif'
import { fetchAndMapTemperaments } from '../../Redux/Actions/Actions.js';
import axios from 'axios'

export default function DogCreator() {
    const [editing, setEditing] = useState(true)
    const [errors, setErrors] = useState({})
    const [temps, setTemps] = useState([])
    const [input, setInput] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        image: 'img',
        temperament: []
    })
    const dispatch = useDispatch()
    const temperamentsDB = useSelector(state => state?.temperamentsFromDB)

    useEffect(() => {
        dispatch(fetchAndMapTemperaments())
        setEditing(true)
        setTemps([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

function handleInputChange(e){
    console.log(e.target.value)
    if (temperamentsDB.includes(e.target.value)){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    // if (e.target.parentNode.id === 'platforms') {
    //     if (e.target.checked) {
    //         setInput(prevState => ({
    //             ...prevState,
    //             platforms: input.platforms.concat(e.target.name + ' ')
    //         }))
    //     } else {
    //         setInput(prevState => ({
    //             ...prevState,
    //             platforms: input.platforms.filter(x => e.target.name !== x)
    //         }))
    //     }
    // }
    else {
        setInput({
        ...input,
        [e.target.name]: e.target.value
        });
    
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
        }));
    }
    
}

function validate(input){
    let errors = {};

    if (input.name){
    if (!(/^[a-zA-Z]+$/).test(input.name)) {
        errors.name = 'Name must contain only letters.';
    }}

    if (input.minHeight){
    if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.minHeight)) {
        errors.minHeight = 'Minimum height must contain only numbers (with or without periods).';
    }}

    if (input.maxHeight){
    if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.maxHeight)) {
        errors.maxHeight = 'Maximum height must contain only numbers (with or without periods).';
    }}

    if (input.minWeight){
    if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.minWeight)) {
        errors.minWeight = 'Minimum weight must contain only numbers (with or without periods).';
    }}

    if (input.maxWeight){
    if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.maxWeight)) {
        errors.maxWeight = 'Maximum weight must contain only numbers (with or without periods).';
    }}

    if (input.life_span){
    if (!(/^[0-9]*$/).test(input.life_span)) {
        errors.life_span = 'Life-span must contain only numbers.';
    }}

return errors;
}

function createNew(e){
    e.preventDefault();
    setEditing(true)
}
function addTemperament(e){
    e.preventDefault();
    let select = document.getElementById('temperament')
    let value = select.options[select.selectedIndex].value;
    setTemps([...temps, value])
}
function submitForm(e){
    e.preventDefault();
    // si todos los estados y name no se repite en la BD entonces mandar post
    if (input.name.length && input.minHeight.length && input.maxHeight.length 
        && input.minWeight.length && input.maxWeight.length && input.life_span.length && temps.length) {
        setEditing(false)
        axios.post('http://localhost:3001/creator', input)
        setTemps([])
        setInput({
            name: '',
            minHeight: '',
            maxHeight: '',
            minWeight: '',
            maxWeight: '',
            life_span: '',
            image: 'img',
            temperament: ""
        })
    }
    else alert('All fields are required.')
        
}


    let id = 0
    return (
            (editing) ? (
                <div className={styles.mainstudio}>
                    <h3 className='creation-title'>Dog Creation Studio</h3>
                    <p className='alert'>**All fields are required.</p>
                    <form className='form'>
                    <br />
                        
                        <div>
                            <label className='element'>Name:</label>
                            <input className='field' type="text" size='10' name="name" placeholder='Doggo' autoComplete='off' onChange={e => handleInputChange(e)} />
                            
                        </div>
                        <br />
                        
                        <div>
                            <label className='element'>Minimum height:</label>
                            <input className='field' type="text" size='10' name="minHeight" placeholder='30' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label className='label'> centimeters.</label>

                        </div>
                        <br />
                        <div>
                            <label className='element'>Maximum height:</label>
                            <input className='field' type="text" size='10' name="maxHeight" placeholder='50' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label className='label'> centimeters.</label>
                        </div>
                        <br />
                        <div>
                            <label className='element'>Minimum weight:</label>
                            <input className='field' type="text" size='10' name="minWeight" placeholder='5' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label className='label'> kilogram(s).</label>


                        </div>
                        <br />
                        <div>
                            <label className='element'>Maximum weight:</label>
                            <input className='field' type="text" size='10' name="maxWeight" placeholder='8.4' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label className='label'> kilogram(s).</label>

                        </div>
                        <br />
                        <div>
                            <label className='element'>Life-span:</label>
                            <input className='field' type="text" size='10' name="life_span" placeholder='10' autoComplete='off' onChange={e => handleInputChange(e)} />

                            {/* <label> - </label>
                            <input type="text" name="maxLifeSpan" placeholder='15' autoComplete='off' onChange={e => handleInputChange(e)} /> */}
                            <label> years.</label>
                            {/* {errors.username && (
                                <p className="danger">{errors.maxLifeSpan}</p>
                            )} */}
                        </div>
                        <div>
                            <label className='element'>Temperament:</label>
                            <select className='temps' name="temperament" id="temperament" onChange={e => handleInputChange(e)}>
                                {
                                    temperamentsDB?.map( temp => <option key={id++} value={temp}>{temp}</option>)
                                }
                            </select>
                                <button className='add' onClick={e => addTemperament(e)}>Add</button>
                                <div> 
                                    <p className='selected'>Selected temperaments:</p> 
                                    <div className='grid-container'>
                                        {   
                                            temps.map(temp => <span className='temperaments' key={temp}> {temp} </span>)
                                        }
                                    </div>
                                </div>
                        </div>
                        <div className={styles.dangerContainer}>
                        {errors.name && (<p className="danger">{errors.name}</p>)}
                        {errors.minHeight && (<p className="danger">{errors.minHeight}</p>)}
                        {errors.maxHeight && (<p className="danger">{errors.maxHeight}</p>)}
                        {errors.minWeight && (<p className="danger">{errors.minWeight}</p>)}
                        {errors.maxWeight && (<p className="danger">{errors.maxWeight}</p>)}
                        {errors.life_span && (<p className="danger">{errors.life_span}</p>)}
                        </div>
                        
                    </form>
                        <button className='button create-btn' onClick={e => submitForm(e)}>Create!</button>
                        <Link to='/home'>
                            <button className='button'> Back To Home </button>
                        </Link>
                </div>
            ) : (
                <div className='success'>
                    <h1>Success!</h1>
                    <img className='successGif' src={dancing_doge} alt="successGif" />
                    <div className='buttonContainer'>
                    <Link to='/home'>
                        <button className='button'> Back To Home </button>
                    </Link>
                    <button className='button'onClick={e => createNew(e)}> Create Another Breed! </button>
                    </div>
                </div>
            )

        
    )

}