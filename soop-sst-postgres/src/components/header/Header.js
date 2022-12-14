import React from 'react';
import styles from './Header.module.css'
import AppConstant from '../../common/Constant'
import imos_logo from './imos_logo.png'
import aodn_logo from './aodn_logo.png'

const Header = () => {

    const rootURL = window.location.href;

    return (
        <div className={styles.header__gridbg}>
            <div className={styles.header__container} />
            <a href={rootURL} className={styles.header__aodn_logo}>
                <img src={aodn_logo} alt={AppConstant.AODN_LONG_NAME} />
            </a>
            <div className={styles.header__title}>{AppConstant.APPLICATION_NAME}
                <div className={styles.header__imos_logo} >
                    <img src={imos_logo} alt={AppConstant.IMOS_LONG_NAME} />
                </div>
            </div>
        </div>
    );
}

export default Header