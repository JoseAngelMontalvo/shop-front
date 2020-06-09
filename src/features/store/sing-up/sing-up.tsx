import React, { useState } from 'react'
import { bind } from '../../../core/utils/bind'
import styles from './sing-up.module.css'
import { SwitchTheme } from '../../../core/components/switch-theme/switch-theme'
import { Link, useHistory } from 'react-router-dom'
import { Input } from '../../../core/components/input/input'
import { Button } from '../../../core/components/buttons/button'
import { Icon } from '../../../core/components/icons/icon'
import { DataSignup } from './domain/data-signup'

const cx = bind(styles)

export const SignUp: React.FC = () => {
  let history = useHistory()

  function goUrl(url: string) {
    history.push(url)
  }
  const [usuario, setUsuario] = useState<DataSignup>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    checkTerms: '',
  })

  function createAccount(name: string, value: string) {
    setUsuario({
      ...usuario,
      [name]: value,
    })
  }
  return (
    <div className={cx('content-signup')}>
      <div className={cx('button-theme-absolute')}>
        <SwitchTheme />
      </div>
      <div className={cx('logo-signup')}>
        <Link to="/" target={'_self'} title={'Ir a la Home'}>
          <img src="/img/neko_svg.svg" alt="Logotipo comercio chino" />
        </Link>
        <h1>Sign in to Comercio Chino</h1>
      </div>
      <form className={cx('form-create-account')}>
        <fieldset className="form-info-product">
          <div className="content-fieldset">
            <Input
              name={'Nombre'}
              htmlId={'name'}
              type={'text'}
              value={usuario.name}
              width={'100'}
              label
              required
              onChangeValue={createAccount}
            />

            <Input
              name={'Apellido'}
              htmlId={'lastName'}
              type={'text'}
              value={usuario.lastName}
              width={'100'}
              label
              required
              onChangeValue={createAccount}
            />

            <Input
              name={'Email'}
              htmlId={'email'}
              type={'email'}
              value={usuario.email}
              width={'100'}
              label
              required
              onChangeValue={createAccount}
            />

            <Input
              name={'Password'}
              htmlId={'password'}
              type={'password'}
              value={usuario.password}
              width={'100'}
              label
              required
              onChangeValue={createAccount}
            />

            <Input
              name={'Confirm password'}
              htmlId={'confirmPassword'}
              type={'password'}
              value={usuario.confirmPassword}
              width={'100'}
              label
              required
              onChangeValue={createAccount}
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
                    setUsuario({
                      ...usuario,
                      checkTerms: 'confirmed',
                    })
                  } else {
                    setUsuario({
                      ...usuario,
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
        <Button submit theme={'primary'}>
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
  )
}
