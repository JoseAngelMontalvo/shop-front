import React, { useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './input.module.css'

const cx = bind(styles)
interface Props {
  name: string
  htmlId: string
  type: string
  value: string | number
  width: '100' | '50' | '33' | '25' | '15'
  label?: boolean
  required?: boolean
}
export const Input: React.FC<Props> = ({ name, htmlId, type, value, width, label, required }) => {
  const [state, setState] = useState()
  return (
    <div className={cx(`item-form-${width}`)}>
      {label && type !== 'checkbox' && type !== 'radio' && (
        <label className={cx('label-form')} htmlFor={htmlId}>
          {name}
          {required && <span className="color-primary">*</span>}
        </label>
      )}
      <input
        className={cx('input-form')}
        type={type}
        name={htmlId}
        id={htmlId}
        value={state}
        onChange={(event) => {
          setState(event.target.value)
        }}
      />
      {label && (type === 'checkbox' || type === 'radio') && (
        <label className={cx('label-form')} htmlFor={htmlId}>
          {name}
          {required && <span className="color-primary">*</span>}
        </label>
      )}
    </div>
  )
}
