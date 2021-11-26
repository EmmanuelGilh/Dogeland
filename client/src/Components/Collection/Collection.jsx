import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, fetchDB } from '../../Redux/Actions/Actions.js'
import Card from './Card.jsx'
import Footer from '../Footer/Footer';
import styles from './Collection.module.css';
import loadingGIFDogs from '../../Media/loadingGIFDogs.gif'

export default function Collection() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]) // backup
    const [display, setDisplay] = useState([]) // display filtrado
    const [finalDisplay, setFinalDisplay] = useState([]) // display cortado
    const [page, setPage] = useState(1);
    const [cardsPerPage] = useState(8);
    // const [filtered, setFiltered] = useState([]);
    // const [paginado, setPaginado] = useState([]);

    const dispatch = useDispatch()
    const allDogs = useSelector(state => state?.allDogs)
    const dogsDB = useSelector(state => state?.dogsDB)
    const searchResults = useSelector(state => state?.searchResults)
    const srcs = useSelector(state => state?.sources)
    const options = useSelector(state => state?.optionsSelected)
    const searchString = useSelector(state => state?.search)
    console.log(dogsDB)

    useEffect(() => {
        if (!allDogs?.length) dispatch(getAllDogs())
        if (!dogsDB?.length) dispatch(fetchDB())
    },[])

    // When data from redux is stored, concats data if there are multiple sources
    useEffect(() => {
        if (allDogs?.length && dogsDB?.length) setData(dogsDB.concat(allDogs))
        else if (allDogs?.length && !dogsDB?.length) setData(allDogs)
    },[allDogs, dogsDB])

    // useEffect(() => {
    //     // if (searchResults?.length) setDisplay(searchResults)
    //     // else if (allDogs?.length && dogsDB?.length) setDisplay(dogsDB.concat(allDogs))
    //     // else if (allDogs?.length && !dogsDB?.length) setDisplay(allDogs) 
    //     else if (allDogs?.length) setDisplay(allDogs)                
    // },[allDogs, searchResults, dogsDB])



    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// Sources and Filter functions ////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    function filterAPI(array){
        if (srcs?.API === false){
            return array.filter(dog => !allDogs.includes(dog))
        }
        else return array
    }
    function filertAPISearch(array){
        if (srcs?.API === false){
            return array.filter(dog => dogsDB.includes(dog))
        }
        else return array
    }
    function filterDB(array){
        if (srcs?.DB === false){
            return array.filter(dog => !dogsDB.includes(dog))
        }
        else return array
    }
    function filterByTemperament(array){
        if (array.length && options?.temperament !== 'All'){
            return array.filter(dog => dog.temperament? dog.temperament.toString().split(',').map(word => word.trim().replace(',', '')).includes(options.temperament) : null)
        } 
        else {
            return array
        }
    }
    function filterAlphabetically(array){
        if (options?.order === 'asc'){
            let asc = [...array]
            asc.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            return asc;
        }
        else if (options?.order === 'desc'){
            let desc = [...array]
            desc.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
            return desc;
        }
        else return array 
    }
    function findAvg(value){
        if (typeof value === 'string'){
            let arr = value.split('-') 
            return arr[0].trim()
        }
    }
    function filterByWeight(array){
        if (options?.weight === "Lightest-first"){
            let lf = [...array]
            lf.sort((a, b) => findAvg(a.weight) - findAvg(b.weight));
            return lf
        }
        else if (options?.weight === "Heaviest-first"){
            let hf = [...array]
            hf.sort((a, b) => findAvg(b.weight) - findAvg(a.weight));
            return hf
        }
        else return array
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    

    useEffect(() => {
        if (Array.isArray(searchResults) && searchResults.length) {
            if (dogsDB?.length) {
                console.log('si')
                let filtered = dogsDB.filter(dog => dog.name.toLowerCase().includes(searchString?.toLowerCase()))
                let array = searchResults.concat(filtered)
                array = filertAPISearch(array)
                array = filterDB(array)
                array = filterByTemperament(array)
                array = filterAlphabetically(array)
                array = filterByWeight(array)
                setDisplay(array)
            }
        }
        else {
            console.log("no")
                let array = data
                array = filterAPI(array)
                array = filterDB(array)
                array = filterByTemperament(array)
                array = filterAlphabetically(array)
                array = filterByWeight(array)
                setDisplay(array) 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, searchResults, dogsDB, srcs, options, searchString])
    

    // useEffect(() => {
    //     // const indexOfLastPost = page * cardsPerPage
    //     // const indexOfFirstPost = indexOfLastPost - cardsPerPage
    //     if (Array.isArray(searchResults) && searchResults.length) {
    //         if (dogsDB.length) {
    //             let array = searchResults
    //             array = filertAPISearch(array)
    //             array = filterDB(array)
    //             array = filterByTemperament(array)
    //             array = filterAlphabetically(array)
    //             array = filterByWeight(array)
    //             // let filtered = dogsDB.filter(dog => dog.name.toLowerCase().includes(searchString.toLowerCase()))
    //             // let array = searchResults.concat(filtered)
    //             setDisplay(array?.slice(indexOfFirstPost, indexOfLastPost))
    //             setPaginado(array)
    //         }
    //         // setDisplay(array?.slice(indexOfFirstPost, indexOfLastPost))
    //         // setPaginado(array)
    //     }
    //     // if (!filtered) setDisplay(filtered?.slice(indexOfFirstPost, indexOfLastPost))
    //     else if (allDogs && allDogs.length) {
    //         let array = allDogs
    //         array = filterAPI(array)
    //         array = filterDB(array)
    //         array = filterByTemperament(array)
    //         array = filterAlphabetically(array)
    //         array = filterByWeight(array) 
    //         setDisplay(array?.slice(indexOfFirstPost, indexOfLastPost))
    //         setPaginado(array)}
    //     }, [allDogs, page, searchResults, srcs, options])

    // Paginado
    let index = 0
    const paginate = (pageNumber) => setPage(pageNumber)
    useEffect(() => {
        const indexOfLastPost = page * cardsPerPage
        const indexOfFirstPost = indexOfLastPost - cardsPerPage
        setFinalDisplay(display.slice(indexOfFirstPost, indexOfLastPost))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[display, page])

    useEffect(() => {
        if (finalDisplay.length) setLoading(false)
    },[finalDisplay, srcs, options])

    // useEffect(() => {
    //     if (display?.length) setLoading(false) 
    // },[display])

    function chooseId(idAPI, idDB){
        if (idDB) return idDB
        else return idAPI
    }
    
    return (
        <div>
            {
            loading ? (
                <img src={loadingGIFDogs}
                alt='gif carga'/>
            ) : (
                typeof finalDisplay[0] === 'object' ? (
                    <>
                        <div className={styles.cards}>
                            {
                                finalDisplay.map(dog => <Card 
                                    key={index++}
                                    id={chooseId(dog.id, dog.idDB)}
                                    name={dog.name}
                                    image={dog.image}
                                    temperament={dog.temperament}
                                    weight={dog.weight}
                                />)
                            }
                        </div>
                        <Footer
                            cardsPerPage={cardsPerPage}
                            totalPosts={display?.length}
                            paginate={paginate}
                        />
                    </>
                    ) : ( 
                        <p> No Results.</p>
                    )
                )
            }
        </div>
    )
}
