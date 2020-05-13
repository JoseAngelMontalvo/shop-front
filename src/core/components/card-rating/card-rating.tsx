import React from 'react'
import { bind } from '../../utils/bind'
import styles from './card-rating.module.css'

const cx = bind(styles)

export const CardRating: React.FunctionComponent = () => {
  return (
    <div className={cx('card-rating')}>
      <a href="#">
        <span className={cx('stars')}>
          <i className={cx('material-icons')}>star</i>
          <i className={cx('material-icons')}>star</i>
          <i className={cx('material-icons')}>star</i>
          <i className={cx('material-icons')}>star</i>
          <i className={cx('material-icons')}>star_border</i>
        </span>
        <span className={cx('card-number-rating-people')}>
          <i className={cx('material-icons')}>keyboard_arrow_down</i>621
        </span>
      </a>
    </div>
  )
}
