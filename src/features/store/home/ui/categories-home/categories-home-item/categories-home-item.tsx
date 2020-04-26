import React, { useState } from 'react'
import { bind } from '../../../../../../core/utils/bind'
import styles from './categories-home-item.module.css'
import { Icon } from '../../../../../../core/components/icons/icon'
import { Category as CategoryModel } from '../../../domain/category'

import { QueryContext } from '../../../../../../core/components/main-template/main-template'

const cx = bind(styles)

interface Props {
  category: CategoryModel
  toogle(opened: string): any
}
export const CategoriesHomeItem: React.FunctionComponent<Props> = ({ category, toogle }) => {
  const opened: string = 'opened'
  return (
    <QueryContext.Consumer>
      {({ setCategoryButton }) => (
        <li
          className={cx('categories-item')}
          key={category.id}
          onClick={() => {
            toogle(opened)
            setCategoryButton(category.text)
          }}
        >
          <a href={'category.link'} target="_self" onClick={(event) => event.preventDefault()}>
            <Icon type={category.type} content={category.content} />
            <p>{category.text}</p>
          </a>
        </li>
      )}
    </QueryContext.Consumer>
  )
}
