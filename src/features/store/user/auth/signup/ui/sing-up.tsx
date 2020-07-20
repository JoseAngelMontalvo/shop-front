import React, { useState } from 'react'
import { bind } from '../../../../../../core/utils/bind'
import Axios from 'axios'
import styles from './sing-up.module.css'
import { SwitchTheme } from '../../../../../../core/components/switch-theme/switch-theme'
import { Link, useHistory } from 'react-router-dom'
import { Input } from '../../../../../../core/components/input/input'
import { Button } from '../../../../../../core/components/buttons/button'
import { Icon } from '../../../../../../core/components/icons/icon'
import { DataSignup } from '../domain/data-signup'
import { CartContext } from '../../../../../../core/components/main-template/main-template'
import { ProductCart } from '../../../../shopping-cart/domain/productCart'

const cx = bind(styles)
interface Props {
  signup(dataUser: DataSignup, products: ProductCart[]): void
}
export const SignUp: React.FC<Props> = ({ signup }) => {
  let history = useHistory()

  function goUrl(url: string) {
    history.push(url)
  }
  const [user, setUser] = useState<DataSignup>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    checkTerms: '',
  })

  function setDataSignup(name: string, value: string) {
    setUser({
      ...user,
      [name]: value,
    })
  }
  async function submitSignup(dataUser: DataSignup, products: ProductCart[]) {
    try {
      signup(dataUser, products)
    } catch (error) {}
    history.push('/')
  }

  return (
    <CartContext.Consumer>
      {({ products }) => (
        <div className={cx('content-signup')}>
          <div className={cx('button-theme-absolute')}>
            <SwitchTheme />
          </div>
          <div className={cx('logo-signup')}>
            <Link to="/" target={'_self'} title={'Ir a la Home'}>
              <img src="/img/neko_svg.svg" alt="Logotipo comercio chino" />
            </Link>
            <h1>Sign up to Comercio Chino</h1>
          </div>
          <form className={cx('form-create-account')}>
            <fieldset className="form-info-product">
              <div className="content-fieldset">
                <Input
                  name={'Nombre'}
                  htmlId={'name'}
                  type={'text'}
                  value={user.name}
                  width={'100'}
                  label
                  required
                  onChangeValue={setDataSignup}
                />

                <Input
                  name={'Apellido'}
                  htmlId={'lastName'}
                  type={'text'}
                  value={user.lastName}
                  width={'100'}
                  label
                  required
                  onChangeValue={setDataSignup}
                />

                <Input
                  name={'Email'}
                  htmlId={'email'}
                  type={'email'}
                  value={user.email}
                  width={'100'}
                  label
                  required
                  onChangeValue={setDataSignup}
                />

                <Input
                  name={'Password'}
                  htmlId={'password'}
                  type={'password'}
                  value={user.password}
                  width={'100'}
                  label
                  required
                  onChangeValue={setDataSignup}
                />

                <Input
                  name={'Confirm password'}
                  htmlId={'confirmPassword'}
                  type={'password'}
                  value={user.confirmPassword}
                  width={'100'}
                  label
                  required
                  onChangeValue={setDataSignup}
                />

                <div className={cx('item-form-100')}>
                  <input
                    className={cx()}
                    type="checkbox"
                    name="acetp-terms"
                    id="acetp-terms"
                    required
                    onChange={(event) => {
                      if (event.target.checked === true) {
                        setUser({
                          ...user,
                          checkTerms: 'confirmed',
                        })
                      } else {
                        setUser({
                          ...user,
                          checkTerms: '',
                        })
                      }
                    }}
                  />
                  <label className={cx()} htmlFor="acetp-terms">
                    Acepto los terminos y condiciones de Comercio Chino
                    <span className={cx('color-primary')}>*</span>
                  </label>
                </div>
              </div>
            </fieldset>
            <Button theme={'primary'} onClick={() => submitSignup(user, products)}>
              Create account
            </Button>
            <div className={cx('signup-google')}>
              <Button
                theme={'secondary'}
                icon={<Icon type="material-icons" content={'android'} title="Select price range" />}
              >
                Signup with Google
              </Button>
            </div>
          </form>
        </div>
      )}
    </CartContext.Consumer>
  )
}
