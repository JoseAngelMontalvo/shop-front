import React, { useState } from 'react'
import { bind } from '../../../utils/bind'
import styles from './search-header.module.css'
import { Icon } from '../../icons/icon'
import { Button } from '../../buttons/button'
import { QueryContext } from '../../main-template/main-template'
import { useLocation, useHistory } from 'react-router-dom'
const cx = bind(styles)

export const SearchHeader: React.FunctionComponent = () => {
  const iconSearch = <Icon type="material-icons" content="clear" title="buscar" />

  const [state, setState] = useState('')
  let location = useLocation()
  const history = useHistory()

  return (
    <QueryContext.Consumer>
      {({ setKeyWords, query }) => (
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
                history.push(
                  `/product/search?keyWord=${state}&category=${query.category}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&sort=${query.sort}`
                )
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
