import React, {useState, useContext, createContext} from 'react'
import {bind} from '../../utils/bind'
import styles from './switch-theme.module.css'
import {Button} from "../buttons/button";
import {Icon} from "../icons/icon";
import { ThemeContext } from '../main-content-theme/main-content-theme';


const cx = bind(styles)



export const SwitchTheme: React.FC = ()=>{


//const iconContent = <Icon type="material-icons" content={icon} title="Light theme" />

    return(

            <ThemeContext.Consumer>
                {({ theme,icon, setTheme }) => (
                        <Button onClick={()=>setTheme(theme)} theme={'only-icon'} icon={<Icon type="material-icons" content={icon} title="Change theme" />} />
                )}
            </ThemeContext.Consumer>




    )
}