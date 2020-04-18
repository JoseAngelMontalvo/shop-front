import React, { useState } from 'react'
import { bind } from '../../../utils/bind'
import styles from './search-header.module.css'
import { Icon } from '../../icons/icon'
import { Button } from '../../buttons/button'

const cx = bind(styles)

export const SearchHeader: React.FunctionComponent = () => {

  const [value, setValue] = useState('')

  const iconSearch = <Icon type="material-icons" content="clear" title="buscar" />

  const clearValue = ()=>setValue('')

  const valueClear = value !== ''

  return (
    <div className={cx('header-search')}>
      <form>
        <i className={cx('material-icons', 'icon-input-header-search')}>search</i>
        <input
          className={cx('input-header-search')}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        {valueClear && <Button
          className="btn-search-header-clear"
          onClick={clearValue}
          theme="only-icon"
          icon={iconSearch}
          />}
      </form>
    </div>
  )
}
