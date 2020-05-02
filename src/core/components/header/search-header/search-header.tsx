import React, { useState } from 'react'
import { bind } from '../../../utils/bind'
import styles from './search-header.module.css'
import { Icon } from '../../icons/icon'
import { Button } from '../../buttons/button'
import { QueryContext } from '../../main-template/main-template'

const cx = bind(styles)

export const SearchHeader: React.FunctionComponent = () => {
  const iconSearch = <Icon type="material-icons" content="clear" title="buscar" />

  const [state, setState] = useState('')

  return (
    <QueryContext.Consumer>
      {({ setKeyWords }) => (
        <div className={cx('header-search')}>
          <i className={cx('material-icons', 'icon-input-header-search')}>search</i>
          <input
            className={cx('input-header-search')}
            type="text"
            value={state}
            onChange={(event) => setState(event.target.value)}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                setKeyWords(state)
              }
            }}
          />
          {state && (
            <Button
              className="btn-search-header-clear"
              onClick={() => {
                setState('')
                setKeyWords('')
              }}
              theme="only-icon"
              icon={iconSearch}
            />
          )}
        </div>
      )}
    </QueryContext.Consumer>
  )
}
