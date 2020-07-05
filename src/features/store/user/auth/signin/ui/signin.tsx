import React, { useState } from 'react'
import { bind } from '../../../../../../core/utils/bind'
import styles from './signin.module.css'
import { Button } from '../../../../../../core/components/buttons/button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from 'react-router-dom'
import { Input } from '../../../../../../core/components/input/input'

import { SwitchTheme } from '../../../../../../core/components/switch-theme/switch-theme'
import { Link } from 'react-router-dom'
import { Icon } from '../../../../../../core/components/icons/icon'
import { DataSignin } from '../domain/data-signin'
import { User } from '../../../domain/user'
import { ShoppingCartRepositoryFactory } from '../../../../shopping-cart/infrastructure/shoppingCart-repository-factory'

const cx = bind(styles)
interface Props {
  login(email: string, password: string): void
}
export const SignIn: React.FC<Props> = ({ login }) => {
  const [user, setUser] = useState<DataSignin>({
    email: '',
    password: '',
  })
  let history = useHistory()

  function setDataSignin(name: string, value: string) {
    setUser({
      ...user,
      [name]: value,
    })
  }
  function submitSignin(user: DataSignin) {
    try {
      login(user.email, user.password)
    } catch (error) {}
    history.push('/')
  }
  async function getshoppingcart(id: string) {
    console.log('Hola')
    try {
      const shoppingCartRepository = ShoppingCartRepositoryFactory.get()
      const result = await shoppingCartRepository.findById(id)
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
    }
  }
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
          htmlId={'email'}
          type={'text'}
          value={''}
          width={'100'}
          label
          onChangeValue={setDataSignin}
          required
        />
        <Input
          name={'Password'}
          htmlId={'password'}
          type={'password'}
          value={''}
          width={'100'}
          label
          onChangeValue={setDataSignin}
          required
        />
        <div className={cx('botonera-form')}>
          <Button theme={'primary'} className="btn-100" onClick={() => submitSignin(user)}>
            Sign in
          </Button>
        </div>
        <div className={cx('link-forgot-pass-sigin')}>
          <Link to="forgotpassword.html">¿Olvidaste la contraseña?</Link>
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
            Crear cuenta
          </Link>
        </p>
      </div>
      <div className={cx('enlaces-footer-signin')}>
        <Link to="/" target="_self">
          Terminos
        </Link>
        <Link to="/" target="_self">
          Privacidad
        </Link>
        <Link to="/" target="_self">
          Seguridad
        </Link>
        <Link to="/" target="_self">
          Contacto
        </Link>
      </div>
    </div>
  )
}
