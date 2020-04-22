import React from 'react'
import { bind } from '../../../../core/utils/bind'
import styles from './result-search-product.module.css'
import { Button } from '../../../../core/components/buttons/button'
import { Icon } from '../../../../core/components/icons/icon'
import { ProductCard } from '../../../../core/components/product-card/product-card'

const cx = bind(styles)

export const ResultSearchContent: React.FC = () => {
  return (
    <div className={cx('result-search-content')}>
      <div className={cx('search-tools')}>
        <div className={cx('filter-product-result')}>
          <Button
            theme={'primary'}
            icon={<Icon type="material-icons" content={'category'} title="Select category" />}
            className={'btn-model-window'}
          >
            Todas las categorías
          </Button>
          <Button
            theme={'secondary'}
            icon={<Icon type="material-icons" content={'euro_symbol'} title="Select price range" />}
            className={'btn-model-window'}
          >
            Precio
          </Button>

          <Button
            theme={'secondary'}
            icon={<Icon type="material-icons" content={'date_range'} title="Select date range" />}
            className={'btn-model-window'}
          >
            Publicado hace
          </Button>
        </div>

        <div className={cx('order-product-by')}>
          <a href="/" target="_selft">
            <i className={cx('material-icons')}>unfold_more</i>Ordenado por:{' '}
            <span>Del más barato al más caro</span>
          </a>
        </div>
      </div>
    </div>
  )
}
