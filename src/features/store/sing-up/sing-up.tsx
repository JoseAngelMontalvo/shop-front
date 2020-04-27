import React from 'react'
import { bind } from '../../../core/utils/bind'
import styles from './sing-up.module.css'
import { SwitchTheme } from '../../../core/components/switch-theme/switch-theme'
import { Link, useHistory } from 'react-router-dom'
import { Input } from '../../../core/components/input/input'
import { Button } from '../../../core/components/buttons/button'
import { Icon } from '../../../core/components/icons/icon'

const cx = bind(styles)

export const SignUp: React.FC = () => {
  let history = useHistory()

  function goUrl(url: string) {
    history.push(url)
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
              value={''}
              width={'100'}
              label
              required
            />

            <Input
              name={'Apellido'}
              htmlId={'lastname'}
              type={'text'}
              value={''}
              width={'100'}
              label
              required
            />

            <Input
              name={'Email'}
              htmlId={'email'}
              type={'email'}
              value={''}
              width={'100'}
              label
              required
            />

            <Input
              name={'Password'}
              htmlId={'password'}
              type={'pass'}
              value={''}
              width={'100'}
              label
              required
            />

            <Input
              name={'Confirm password'}
              htmlId={'c_password'}
              type={'pass'}
              value={''}
              width={'100'}
              label
              required
            />

            <Input
              name={'Acepto los terminos y condiciones de Comercio Chino'}
              htmlId={'acetp-terms'}
              type={'checkbox'}
              value={''}
              width={'100'}
              label
              required
            />
          </div>
        </fieldset>
        <Button theme={'primary'} onClick={() => goUrl('/product/search')}>
          Create account
        </Button>
        <div className={cx('signup-google')}>
          <Button
            theme={'secondary'}
            icon={<Icon type="material-icons" content={'android'} title="Select price range" />}
            onClick={() => goUrl('/product/search')}
          >
            Signup with Google
          </Button>
        </div>
      </form>
    </div>
  )
}
