import React, { useReducer } from 'react'
import { bind } from '../../../utils/bind'
import styles from './search-header.module.css'
import { Icon } from '../../icons/icon'
import { Button } from '../../buttons/button'
import { QueryContext } from '../../main-template/main-template'
import { reducer } from '../../main-template/infrastructure/main-template-reduce'

const cx = bind(styles)

export const SearchHeader: React.FunctionComponent = () => {
  const iconSearch = <Icon type="material-icons" content="clear" title="buscar" />
  const clearValue = () => dispatch({ type: 'clearValue', result: '' })

  const [stateR, dispatch] = useReducer(reducer, { keywordsR: '' })

  const handleClick = () => {
    dispatch({ type: 'search', result: stateR.keywordsR })
  }

  return (
    <QueryContext.Consumer>
      {({ keywords, setKeywords }) => (
        <div className={cx('header-search')}>
          <i className={cx('material-icons', 'icon-input-header-search')}>search</i>
          <input
            className={cx('input-header-search')}
            type="text"
            value={stateR.keywordsR}
            onChange={(event) => dispatch({ type: 'refreshValue', result: event.target.value })}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                handleClick()
                setKeywords(stateR.keywordsR)
              }
            }}
          />
          {stateR.keywordsR && (
            <Button
              className="btn-search-header-clear"
              onClick={() => {
                console.log('ANTES' + stateR.keywordsR)
                clearValue()
                console.log('DESPUES' + stateR.keywordsR)
                setKeywords(stateR.keywordsR)
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
