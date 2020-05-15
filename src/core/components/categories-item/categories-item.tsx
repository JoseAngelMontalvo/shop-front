import React from 'react'
import { bind } from '../../utils/bind'
import styles from './categories-item.module.css'
import { Icon } from '../icons/icon'
import { Category as CategoryModel } from './domain/category'
import { QueryContext } from '../main-template/main-template'
import { useLocation, useHistory } from 'react-router-dom'

const cx = bind(styles)

interface Props {
  category: CategoryModel
  close?(closeModal: any): void
}
export const CategoriesItem: React.FunctionComponent<Props> = ({ category, close }) => {
  const history = useHistory()
  return (
    <QueryContext.Consumer>
      {({ setCategory, query }) => (
        <li className={cx('categories-item')} key={category.id}>
          <a
            href={'#'}
            onClick={(event) => {
              event.preventDefault()
              setCategory(category)
              history.push(
                `/product/search?keyWord=${query.keyWords}&category=${category.text}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&sort=${query.sort}`
              )
              if (close !== undefined) {
                close((closeModal: any) => closeModal())
              }
            }}
          >
            <Icon type={category.type} content={category.content} />
            <p>{category.text}</p>
          </a>
        </li>
      )}
    </QueryContext.Consumer>
  )
}
