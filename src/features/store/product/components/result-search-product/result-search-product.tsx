import React, { useState, useReducer } from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './result-search-product.module.css'
import { Button } from '../../../../../core/components/buttons/button'
import { Icon } from '../../../../../core/components/icons/icon'
import { ProductCard } from '../../../../../core/components/product-card/product-card'
import { Category as CategoryModel } from '../../../home/domain/category'
import { CategoriesHomeItem } from '../../../home/ui/categories-home/categories-home-item/categories-home-item'
import { QueryContext } from '../../../../../core/components/main-template/main-template'
import { modalFilterReducer, initialState } from './infrastructure/modal-filter-reducer'
import { SliderRange } from '../../../../../core/components/slider-range/slider-range'

const cx = bind(styles)
let sortBy: string
export const ResultSearchProduct: React.FC<{ categories: CategoryModel[] }> = ({ categories }) => {
  const [state, dispatch] = useReducer(modalFilterReducer, initialState)
  const [sortText, setSortText] = useState('')

  switch (sortText) {
    case 'dist':
      sortBy = 'Distancia'
      break
    case 'rate':
      sortBy = 'Valoración media'
      break
    case 'lowprice':
      sortBy = 'Del más barato al más\n' + 'caro'
      break
    case 'highice':
      sortBy = 'Del más caro al más\n' + 'barato'
      break
    default:
      sortBy = 'Del más barato al más\n' + 'caro'
  }

  const closeModal: any = () => dispatch({ type: 'closeAll' })
  return (
    <QueryContext.Consumer>
      {({ category, rangePrice, setRangePrice, sort, setSort }) => (
        <>
          {setSortText(sort)}
          <div className={cx('result-search-content')}>
            <div className={cx('search-tools')}>
              {(state.category || state.price || state.short) && (
                <div
                  className={cx('overlay-filter-product')}
                  onClick={() => dispatch({ type: 'closeAll' })}
                >
                  {' '}
                </div>
              )}
              <div className={cx('filter-product-result')}>
                <div className={cx('filter-categories')}>
                  <Button
                    theme={'primary'}
                    icon={
                      <Icon
                        type={category.type}
                        content={category.content}
                        title="Select category"
                      />
                    }
                    className={'btn-model-window'}
                    onClick={() => dispatch({ type: 'openCategory' })}
                  >
                    {category.text}
                  </Button>
                  {state.category && (
                    <div className={cx('modal-filter-categories')}>
                      <p>Elige una categoría en la que buscar</p>
                      <ul className={cx('list-categories-filter')}>
                        {categories.map((category) => (
                          <CategoriesHomeItem
                            key={category.id}
                            category={category}
                            close={closeModal}
                          />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className={cx('filter-range-price')}>
                  <Button
                    theme={'secondary'}
                    icon={
                      <Icon
                        type="material-icons"
                        content={'euro_symbol'}
                        title="Select price range"
                      />
                    }
                    className={'btn-model-window'}
                    onClick={() => dispatch({ type: 'openPrice' })}
                  >
                    {rangePrice[0] === 0 && rangePrice[1] === 5000 && 'Price'}
                    {(rangePrice[0] !== 0 || rangePrice[1] !== 5000) &&
                      `${rangePrice[0]} € - ${rangePrice[1]} €`}
                  </Button>
                  {state.price && (
                    <div className={cx('modal-filter-price')}>
                      <p>Elige un rango de precio</p>
                      <SliderRange changeRange={setRangePrice} />
                    </div>
                  )}
                </div>
              </div>

              <div className={cx('short-product-by')}>
                <a
                  href="/"
                  target="_selft"
                  onClick={(event) => {
                    event.preventDefault()
                    dispatch({ type: 'openShort' })
                  }}
                >
                  <i className={cx('material-icons')}>unfold_more</i>Ordenado por:{' '}
                  <span>{sortBy}</span>
                </a>
                {state.short && (
                  <div className={cx('modal-filter-short')}>
                    <p>Ordenar por:</p>
                    <ul>
                      <li>
                        <a
                          href={'/'}
                          target={'_self'}
                          onClick={(event) => {
                            event.preventDefault()
                            setSort('dist')
                            dispatch({ type: 'closeAll' })
                          }}
                        >
                          <Icon type={'material-icons'} content={'room'} /> Distancia
                        </a>
                      </li>
                      <li>
                        <a
                          href={'/'}
                          target={'_self'}
                          onClick={(event) => {
                            event.preventDefault()
                            setSort('rate')
                            dispatch({ type: 'closeAll' })
                          }}
                        >
                          <Icon type={'material-icons'} content={'star_half'} /> Valoración media
                        </a>
                      </li>
                      <li>
                        <a
                          href={'/'}
                          target={'_self'}
                          onClick={(event) => {
                            event.preventDefault()
                            setSort('lowprice')
                            dispatch({ type: 'closeAll' })
                          }}
                        >
                          <Icon type={'material-icons'} content={'call_made'} /> Del más barato al
                          más caro
                        </a>
                      </li>
                      <li>
                        <a
                          href={'/'}
                          target={'_self'}
                          onClick={(event) => {
                            event.preventDefault()
                            setSort('highprice')
                            dispatch({ type: 'closeAll' })
                          }}
                        >
                          <Icon type={'material-icons'} content={'call_received'} /> Del más caro al
                          más barato
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla gravida augue vitae mi
            vulputate dignissim. Sed euismod ex id tristique congue. Vestibulum aliquet posuere
            malesuada. Aenean rhoncus at nisi non rhoncus. Aenean quis orci tortor. Vestibulum
            semper ac massa elementum posuere. Nullam maximus lectus orci, nec congue nisl convallis
            ut. Aliquam sagittis libero ac risus consequat, in consequat odio imperdiet. Suspendisse
            non vehicula erat. Morbi nisi quam, porta quis neque at, maximus pretium sem. Maecenas
            malesuada neque pellentesque velit vulputate sodales. Aenean at mattis libero. Fusce
            eget enim nec velit condimentum ornare non id diam. Nulla ornare scelerisque odio, sed
            pulvinar augue. Pellentesque in consectetur nibh, ut elementum nunc. Morbi id malesuada
            leo. Quisque auctor, dolor id bibendum facilisis, tortor leo elementum nisi, nec commodo
            dolor diam id elit. In nibh lectus, fermentum vel pharetra nec, congue vel nisi.
            Maecenas gravida, est eu malesuada aliquet, odio orci pellentesque nisl, vel varius
            augue dui nec libero. Sed lobortis lacus at leo iaculis rutrum. Nunc auctor nulla dolor.
            In consectetur purus nisi, sed hendrerit nulla tristique ac. Morbi pretium, enim ac
            ultricies porta, sem lorem rutrum elit, et auctor risus quam quis lectus. Pellentesque
            enim dolor, porta id sapien eget, gravida blandit metus. Suspendisse eget pretium mi, at
            aliquam felis. Donec egestas leo id velit auctor, eget venenatis turpis aliquet. Quisque
            tempor sit amet mi quis aliquet. Maecenas arcu sapien, cursus a mattis nec, convallis
            sed elit. Morbi eget finibus nunc, at consectetur lacus. Integer sodales porttitor
            sagittis. Cras ipsum enim, rhoncus a feugiat a, fermentum posuere nunc. Cras vehicula
            sed tortor nec sodales. Aliquam at ex dolor. Fusce orci sem, lobortis a turpis eu,
            ornare pulvinar enim. In hac habitasse platea dictumst. Suspendisse nec quam fringilla,
            fringilla ligula vitae, dapibus urna. Vestibulum eu mollis diam, ut blandit tortor.
            Pellentesque consequat erat elit, sit amet malesuada tortor cursus dictum. Pellentesque
            sed nulla tempor, vehicula quam ac, vulputate turpis. Sed viverra elit scelerisque nunc
            luctus, et eleifend dolor auctor. Nulla pulvinar felis vitae convallis consequat. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam
            efficitur pellentesque metus, in feugiat eros tincidunt ut. Ut quis turpis sit amet eros
            auctor interdum in id leo. Etiam non metus pharetra, cursus justo vitae, finibus metus.
            Vestibulum faucibus, diam sit amet vestibulum viverra, dui nunc euismod elit, id maximus
            dui diam ut lectus. Morbi ac risus neque. Donec ut dignissim quam. Maecenas ac libero
            quis velit pretium placerat sed a nulla. Maecenas placerat tincidunt ipsum, tempus
            faucibus arcu imperdiet et. Pellentesque consectetur rhoncus urna, id sagittis eros
            bibendum id. Nam luctus enim quis libero lacinia fermentum. Morbi in magna justo. Donec
            non laoreet arcu. In vitae diam tempor, auctor ex nec, tempus magna. Maecenas sodales
            consectetur faucibus. Integer ante ex, vehicula nec cursus a, dapibus eu dui. Quisque
            consectetur est nunc, vehicula facilisis ipsum eleifend id. Cras egestas nulla dui, sed
            efficitur elit iaculis eu. Sed molestie metus a lacus aliquet, at mattis tellus
            placerat. Vestibulum quis luctus sem.
          </div>
        </>
      )}
    </QueryContext.Consumer>
  )
}
