import React from 'react'
import { bind } from '../../../../../../core/utils/bind'
import styles from './categories-home-item.module.css'
import { Icon } from '../../../../../../core/components/icons/icon'
import { Category as CategoryModel } from '../../../domain/category'
import { QueryContext } from '../../../../../../core/components/main-template/main-template'
import { querySearchReducer } from '../../../../../../core/components/main-template/infrastructure/query-search-products-reducer'
import { useLocation, useHistory } from 'react-router-dom'

const cx = bind(styles)

interface Props {
  category: CategoryModel
  close?(closeModal: any): void
}
export const CategoriesHomeItem: React.FunctionComponent<Props> = ({ category, close }) => {
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
