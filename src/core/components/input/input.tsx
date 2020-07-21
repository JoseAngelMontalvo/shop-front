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
  onChangeValue?(names: string, value: string): void
}
export const Input: React.FC<Props> = ({
  name,
  htmlId,
  type,
  value,
  width,
  label,
  required,
  onChangeValue,
}) => {
  const [state, setState] = useState(value)
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
        required={required && required}
        onChange={(event) => {
          setState(event.target.value)
          onChangeValue && onChangeValue(event.target.name, event.target.value)
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
