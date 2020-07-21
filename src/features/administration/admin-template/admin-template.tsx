import React from 'react'
import { bind } from '../../../core/utils/bind'
import styles from './admin-template.module.css'
import { AdminTools } from '../admin-user-profile/ui/admin-tools/admin-tools'
import { User } from '../../../core/domain/user/user'

const cx = bind(styles)

interface Props {
  user?: User | null
}
export const AdminTemplate: React.FC<Props> = ({ children, user }) => {
  return user === undefined || user === null ? (
    <div>
      <p>NO TIENES PERMISOS</p>
    </div>
  ) : (
    <div className={cx('main-content-admin')}>
      <AdminTools />
      {children}
    </div>
  )
}
