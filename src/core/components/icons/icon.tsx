import React from 'react'
import {bind} from '../../utils/bind'
import styles from './icon.module.css'

const cx =bind(styles)

interface Props{
    title?:string
    type:'material-icons' | 'comercio-chino-icons'
    content:string
}
export const Icon: React.FunctionComponent<Props> = ({type,
    content,
    title,
                                                       }
)=>{
    return(
        <i className={cx(type, type==='comercio-chino-icons'? content : undefined)} title={title}>{type==='material-icons'? content : undefined}</i>
    )

}