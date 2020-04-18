import React from 'react'
import {bind} from '../../../../utils/bind'
import styles from './section-footer.module.css'
import {SectionsFooter as SectionsFooterModel} from "../../domain/interfaces/section-footer";

const cx = bind(styles)
interface Props {
    section:SectionsFooterModel
}
export const SectionFooter: React.FunctionComponent<Props>=({section})=>{
    return(
        <div className={cx("section-footer")}>
            <h4>{section.title}</h4>
            <ul>
                {section.links.map(link=>(
                    <li id={link.name}><a href={link.url} target="_self">{link.name}</a></li>
                ))}
            </ul>
        </div>
    )
}