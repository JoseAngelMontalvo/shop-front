import React, {FC} from 'react'
import {bind} from '../../utils/bind'
import styles from './main-template.module.css'
import {Header} from "../header/header";
import {Footer} from "../footer/ui/footer";


const cx = bind(styles)

export const MainTemplate: React.FC=({children})=>{
    return(
                <div className={cx("main-template-content")}>
                    <Header/>
                    {children}
                    <Footer/>
                </div>
    )
}

