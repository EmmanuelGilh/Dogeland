import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs } from '../../Redux/Actions/Actions.js'
import Card from './Card.jsx'
import Footer from '../Footer/Footer';
import styles from './Collection.module.css';
import loadingGIFDogs from '../../Media/loadingGIFDogs.gif'

export default function Collection() {
    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState([]);
    const [page, setPage] = useState(1);
    const [cardsPerPage] = useState(8);
    const [filtered, setFiltered] = useState([]);
    const [paginado, setPaginado] = useState([]);

    const dispatch = useDispatch()
    const allDogs = useSelector(state => state?.allDogs)
    const searchResults = useSelector(state => state?.searchResults)
    const filters = useSelector(state => state?.filters)


    useEffect(() => {
        if (!allDogs?.length) dispatch(getAllDogs())
    },[])

    useEffect(() => {
        if (searchResults?.length) setDisplay(searchResults) 
        else if (allDogs?.length) setDisplay(allDogs)                
    },[allDogs, searchResults])

    let index = 0

    const paginate = (pageNumber) => setPage(pageNumber)
    
    useEffect(() => {
        const indexOfLastPost = page * cardsPerPage
        const indexOfFirstPost = indexOfLastPost - cardsPerPage
        if (searchResults && searchResults?.length) {
            setDisplay(searchResults?.slice(indexOfFirstPost, indexOfLastPost))
            setPaginado(searchResults)
        }
        // if (!filtered) setDisplay(filtered?.slice(indexOfFirstPost, indexOfLastPost))
        else if (allDogs && allDogs.length) {
            setDisplay(allDogs?.slice(indexOfFirstPost, indexOfLastPost))
            setPaginado(allDogs)}
        }, [filtered, allDogs, page, searchResults])

    useEffect(() => {
        if (display?.length) setLoading(false) 
    },[display])

    
    return (
        <div>
            {
            loading ? (
                <img src={loadingGIFDogs}
                alt='gif carga'/>
            ) : (
                Array.isArray(display) ? (
                    <>
                        <div className={styles.cards}>
                            {
                                display.map(dog => <Card 
                                    key={index++}
                                    id={dog.id}
                                    name={dog.name}
                                    image={dog.image}
                                    temperament={dog.temperament}
                                />)
                            }
                        </div>
                        <Footer
                            cardsPerPage={cardsPerPage}
                            totalPosts={paginado?.length}
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
