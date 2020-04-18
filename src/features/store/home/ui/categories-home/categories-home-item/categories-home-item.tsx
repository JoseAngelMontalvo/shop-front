import React from 'react'
import {bind} from '../../../../../../core/utils/bind'
import styles from './categories-home-item.module.css'
import {Icon} from "../../../../../../core/components/icons/icon";
import { Category as CategoryModel } from '../../../domain/category'

const cx = bind(styles)

interface Props {
    category: CategoryModel
}
export const CategoriesHomeItem: React.FunctionComponent<Props> = ({
    category

                                                            }) => {
    return(
        <li className={cx("categories-item")} key={category.id}>
            <a href={category.link} target="_self">
                <Icon type={category.type} content={category.content}/>
                <p>{category.text}</p>
            </a>
        </li>
    )
}