import React from 'react'
import { bind } from '../../utils/bind'
import styles from './button.module.css'
import { QueryContext } from '../main-template/main-template'

const cx = bind(styles)

interface Props extends React.HTMLProps<HTMLButtonElement> {
  icon?: JSX.Element
  submit?: boolean
  className?: string
  theme?: 'primary' | 'secondary' | 'only-icon'
}
export const Button: React.FunctionComponent<Props> = ({
  icon,
  submit,
  className,
  theme,
  children,
  ...rest
}) => {
  return (
    <button {...rest} type={submit ? 'submit' : 'button'} className={cx(className, `btn-${theme}`)}>
      {icon}
      {children}
    </button>
  )
}
