import React from 'react'
import { bind } from '../../../../../../core/utils/bind'
import styles from './categories-home-item.module.css'
import { Icon } from '../../../../../../core/components/icons/icon'
import { Category as CategoryModel } from '../../../domain/category'
import { QueryContext } from '../../../../../../core/components/main-template/main-template'

const cx = bind(styles)

interface Props {
  category: CategoryModel
  close?(closeModal: any): void
}
export const CategoriesHomeItem: React.FunctionComponent<Props> = ({ category, close }) => {
  return (
    <QueryContext.Consumer>
      {({ setCategory }) => (
        <li className={cx('categories-item')} key={category.id}>
          <a
            href={'#'}
            onClick={(event) => {
              event.preventDefault()
              setCategory(category)
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
