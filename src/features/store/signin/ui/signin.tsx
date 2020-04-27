import React from 'react'
import { bind } from '../../../../core/utils/bind'
import styles from './signin.module.css'
import { Button } from '../../../../core/components/buttons/button'

import { Input } from '../../../../core/components/input/input'

import { SwitchTheme } from '../../../../core/components/switch-theme/switch-theme'
import { Link } from 'react-router-dom'
import { Icon } from '../../../../core/components/icons/icon'

const cx = bind(styles)

export const SignIn: React.FC = () => {
  return (
    <div className={cx('content-signin')}>
      <div className={cx('button-theme-absolute')}>
        <SwitchTheme />
      </div>
      <div className={cx('logo-signin')}>
        <Link to="/" target={'_self'} title={'Ir a la Home'}>
          <img src="/img/neko_svg.svg" alt="Logotipo comercio chino" />
        </Link>
        <h1>Sign in to Comercio Chino</h1>
      </div>
      <form className={cx('form-signin')}>
        <Input
          name={'Username o Email address'}
          htmlId={'name'}
          type={'text'}
          value={''}
          width={'100'}
          label
          required
        />
        <Input
          name={'Password'}
          htmlId={'password'}
          type={'password'}
          value={''}
          width={'100'}
          label
          required
        />
        <div className={cx('botonera-form')}>
          <Button theme={'primary'} submit className="btn-100">
            Sign in
          </Button>
        </div>
        <div className={cx('link-forgot-pass-sigin')}>
          <a href="forgotpassword.html">¿Olvidaste la contraseña?</a>
        </div>
        <div className={cx('botonera-form')}>
          <div className={cx('signin-google')}>
            <Button
              theme={'secondary'}
              className="btn-100"
              icon={<Icon type="material-icons" content={'android'} title="Select price range" />}
            >
              Signup with Google
            </Button>
          </div>
        </div>
      </form>
      <div className={cx('new-account')}>
        <p>
          ¿Nuevo en Comercio chino?
          <Link to="/signup" target={'_self'}>
            <a href="createaccount.html"> Crear cuenta</a>
          </Link>
        </p>
      </div>
      <div className={cx('enlaces-footer-signin')}>
        <a href="/" target="_self">
          Terminos
        </a>
        <a href="/" target="_self">
          Privacidad
        </a>
        <a href="/" target="_self">
          Seguridad
        </a>
        <a href="/" target="_self">
          Contacto
        </a>
      </div>
    </div>
  )
}
