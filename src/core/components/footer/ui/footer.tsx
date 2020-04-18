import React from 'react'
import {bind} from '../../../utils/bind'
import styles from './footer.module.css'
import {SectionsFooter as SectionsFooterModel} from "../domain/interfaces/section-footer";
import {SectionFooter} from './section-footer/section-footer'


const cx = bind(styles)

export const Footer: React.FunctionComponent<{sections:SectionsFooterModel[]}> = ({sections}) => {
    return(
        <div className={cx("footer")}>
            <div className={cx("logo-footer")}>
                <img src="/img/neko_svg.svg" alt="Logotipo comercio chino"/>
                    <p>Comercio Chino</p>
                    <p className={cx("copyright")}>Copyright © 2020 comercio-chino © de sus respectivos propietarios</p>
            </div>
            {sections.map(section => (
                <SectionFooter key={section.id} section={section}/>
            ))}
        </div>
    )
}
