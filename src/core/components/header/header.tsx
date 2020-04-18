import React from 'react'
import {bind} from '../../utils/bind'
import styles from './header.module.css'
import {SearchHeader} from "./search-header/search-header";
import {HeaderTools} from "./header-tools/header-tools";

const cx = bind(styles)

export const Header: React.FunctionComponent=()=>{
    return(
        <div className={cx("header")}>
            <a className={cx("logo-ppal")} href="home.html" target="_self" title="Ir a la home"><i/></a>
            <SearchHeader></SearchHeader>
            <HeaderTools></HeaderTools>
        </div>
    )
}