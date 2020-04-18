import React from 'react'
import {bind} from '../../utils/bind'
import styles from './input.module.css'

const cx = bind(styles)
interface Props {
    name: string
    htmlId: string
    type: string
    value: string
    ancho: "100" | "50" | "33" | "25" | "15"
    label?:boolean
}
export const Input:React.FC<Props>=({
    name,
    htmlId,
    type,
    value,
    ancho,
    label
                                    })=>{
    return(
        <div className={cx(`item-form-${ancho}`)}>
            {label && <label className={cx("label-form")} htmlFor={htmlId}>{name}</label>}
            <input className={cx("input-form")} type={type} name={htmlId} id={htmlId} value={value}/>
        </div>
    )
}