import React, {createContext, useState} from 'react'
import {bind} from '../../utils/bind'
import styles from './main-content-theme.module.css'


const cx = bind(styles)



export const ThemeContext = createContext<{
    theme: string
    icon:string
    setTheme: (theme: string) => void
}>({ theme: "", icon:"", setTheme: () => {} })

export const MainContentTheme: React.FC=({children})=>{
    const [contentIcon,setcontentIcon]= useState("wb_sunny")
    const [stateTheme, setStateTheme] = useState("dark")
    return(
        <ThemeContext.Provider
            value={{
                theme: stateTheme,
                icon: contentIcon,
                setTheme: (theme) => {
                    if (theme === "light") {
                        setStateTheme("dark")
                        setcontentIcon("wb_sunny")
                    } else {
                        setStateTheme("light")
                        setcontentIcon("brightness_3")
                    }
                }
            }}>
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div className={cx("main-content-theme", `${theme}`)}>
                        {children}
                    </div>
                )}
            </ThemeContext.Consumer>
            </ThemeContext.Provider>
    )
}
