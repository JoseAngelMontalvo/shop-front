import React, { useEffect, useState } from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './categories-home.module.css'
import { CategoriesItem } from '../../../../../core/components/categories-item/categories-item'
import { Category as CategoryModel } from '../../../../../core/components/categories-item/domain/category'
import { CategoryRepositoryFactory } from '../../../../../core/components/categories-item/infrastructure/category-repository-factory'

const cx = bind(styles)

export const CategoriesHome: React.FunctionComponent = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([])
  const getCategories = async () => {
    const categoryRepository = CategoryRepositoryFactory.get()
    const result = await categoryRepository.findAll()
    await setCategories(result)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className={cx('categories')}>
      <h2>¿Qué te apetece hoy?</h2>
      <h3>Categorías</h3>
      <ul>
        {categories.map((category) => (
          <CategoriesItem key={category.id} category={category} />
        ))}
      </ul>
    </div>
  )
}
