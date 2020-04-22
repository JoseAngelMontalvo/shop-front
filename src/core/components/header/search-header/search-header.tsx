import React, { useState } from 'react'
import { bind } from '../../../utils/bind'
import styles from './search-header.module.css'
import { Icon } from '../../icons/icon'
import { Button } from '../../buttons/button'
import { QueryContext } from '../../main-template/main-template'

const cx = bind(styles)

export const SearchHeader: React.FunctionComponent = () => {
  const [value, setValue] = useState('')

  const iconSearch = <Icon type="material-icons" content="clear" title="buscar" />

  const clearValue = () => setValue('')

  return (
    <QueryContext.Consumer>
      {({ setKeywords }) => (
        <div className={cx('header-search')}>
          <i className={cx('material-icons', 'icon-input-header-search')}>search</i>
          <input
            className={cx('input-header-search')}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.keyCode === 13) setKeywords(value)
            }}
          />
          {clearValue && (
            <Button
              className="btn-search-header-clear"
              onClick={clearValue}
              theme="only-icon"
              icon={iconSearch}
            />
          )}
        </div>
      )}
    </QueryContext.Consumer>
  )
}
