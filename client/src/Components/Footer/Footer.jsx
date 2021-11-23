import React from 'react';
import styles from './Footer.module.css';


export default function Footer({ cardsPerPage, totalPosts, paginate }) {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil( totalPosts / cardsPerPage); i++){
            pageNumbers.push(i);
        }

    return (
        <div>
            <div>
                {pageNumbers.map( number => (
                    <span className={styles.pagination}
                        key={number}
                        onClick={ () => paginate(number)}
                    >
                        &nbsp;{number}&nbsp; 
                    </span>)
                    )
                }
            </div>
        </div>
    )
}
