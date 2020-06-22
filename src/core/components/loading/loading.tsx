import React, { useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './loading.module.css'
const cx = bind(styles)

export const Loading: React.FC = () => {
  return (
    <div className={cx('loading')}>
      <div className={cx('loading__dot-1')}></div>
      <div className={cx('loading__dot-2')}></div>
      <div className={cx('loading__dot-3')}></div>
    </div>
  )
}
