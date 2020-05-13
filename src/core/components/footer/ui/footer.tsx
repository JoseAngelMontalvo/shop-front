import React from 'react'
import { bind } from '../../../utils/bind'
import styles from './footer.module.css'

const cx = bind(styles)

export const Footer: React.FC = () => {
  return (
    <div className={cx('footer')}>
      <div className={cx('logo-footer')}>
        <img src="/img/neko_svg.svg" alt="Logotipo comercio chino" />
        <p>Comercio Chino</p>
        <p className={cx('copyright')}>
          Copyright © 2020 comercio-chino © de sus respectivos propietarios
        </p>
      </div>

      <div className={cx('section-footer')}>
        <h4>Comercio Chino</h4>
        <ul>
          <li>
            <a href={'/'} target={'_self'}>
              ¿Quiénes somos?
            </a>
          </li>
          <li>
            <a href={'/'} target={'_self'}>
              Prensa
            </a>
          </li>
          <li>
            <a href={'/'} target={'_self'}>
              Empleo
            </a>
          </li>
          <li>
            <a href={'/'} target={'_self'}>
              Equipo
            </a>
          </li>
        </ul>
      </div>

      <div className={cx('section-footer')}>
        <h4>Soporte</h4>
        <ul>
          <li>
            <a href={'/'} target={'_self'}>
              Preguntas Frecuentes
            </a>
          </li>
          <li>
            <a href={'/'} target={'_self'}>
              Reglas de convivencia
            </a>
          </li>
          <li>
            <a href={'/'} target={'_self'}>
              Consejos de seguridad
            </a>
          </li>
        </ul>
      </div>

      <div className={cx('section-footer')}>
        <h4>Legal</h4>
        <ul>
          <li>
            <a href={'/'} target={'_self'}>
              Condiciones de uso
            </a>
          </li>
          <li>
            <a href={'/'} target={'_self'}>
              Política de privacidad
            </a>
          </li>
          <li>
            <a href={'/'} target={'_self'}>
              Cookies
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
