import React from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './slider-ppal-home.module.css'

const cx = bind(styles)

interface Props {
  urlImage: string
  alt: string
}

export const SliderPpalHome: React.FunctionComponent<Props> = ({ urlImage, alt }) => {
  return (
    <div className={cx('slider')}>
      <h1>
        <span className={cx('color-primary')}>Todo</span>
        lo que imaginas, <span className={cx('block')}>Más cerca de lo que imaginas.</span>
      </h1>
      <img src={urlImage} alt={alt} />
    </div>
  )
}
