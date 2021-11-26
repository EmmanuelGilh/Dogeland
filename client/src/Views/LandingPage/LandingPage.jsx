import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className= {styles.wrapper}>
            <div className= {styles.welcomeDiv}>
                <span className= {styles.welcome_text}> <b>"DOGELAND"</b> is a single-page <b>Full-stack</b> web application about <b>Dogs</b> made by <b>Emmanuel Gil</b>. It was made employing the following 
                    technologies: <b>React, Redux, Express, Sequelize and Postgres</b>.</span>
            </div>
                <Link to='/home'>
                    <button className={styles.welcomeButton}><b>Much Dogs, Such Wow!</b></button>
                </Link>
        </div>
    )
}
