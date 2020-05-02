import React, { useState } from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './slider-product.module.css'

const cx = bind(styles)

export const SliderProduct: React.FC<{ urlsImages: string[] }> = ({ urlsImages }) => {
  function changeMainImage(e: any, url: string) {
    e.preventDefault()
    setMainImage(url)
  }
  const [mainImage, setMainImage] = useState(urlsImages[0])

  return (
    <div className={cx('slider-product')}>
      <div className={cx('thumbs-product')}>
        <ul>
          {urlsImages.map((url) => (
            <li>
              <a href="/" title="Agrandar imagen" onClick={(event) => changeMainImage(event, url)}>
                <img src={`/img/products/${url}`} alt="Imagen producto" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={cx('main-img-slide-product')}>
        <img src={`/img/products/${mainImage}`} alt="Imagen de producto" />
      </div>
    </div>
  )
}
