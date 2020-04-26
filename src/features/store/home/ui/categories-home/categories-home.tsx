import React from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './categories-home.module.css'
import { CategoriesHomeItem } from './categories-home-item/categories-home-item'
import { Category as CategoryModel } from '../../domain/category'
const cx = bind(styles)

export const CategoriesHome: React.FunctionComponent<{ categories: CategoryModel[] }> = ({
  categories,
}) => {
  return (
    <div className={cx('categories')}>
      <h2>¿Qué te apetece hoy?</h2>
      <h3>Categorías</h3>
      <ul>
        {categories.map((category) => (
          <CategoriesHomeItem toogle={() => ''} key={category.id} category={category} />
        ))}
      </ul>
    </div>
  )
}
