import React from 'react'
import {bind} from '../../../../core/utils/bind'
import styles from './signin.module.css'
import {Button} from "../../../../core/components/buttons/button";

import {Input} from "../../../../core/components/input/input";

import {SwitchTheme} from "../../../../core/components/switch-theme/switch-theme";

const cx = bind(styles)

export const SignIn: React.FC=()=> {
    return (
        <div className={cx("content-signin")}>
                    <div className={cx("button-theme-absolute")}>
                        <SwitchTheme/>
                    </div>
                    <div className={cx("logo-signin")}>
                        <img src="/img/neko_svg.svg" alt="Logotipo comercio chino"/>
                        <h1>Sign in to Comercio Chino</h1>
                    </div>
                    <form className={cx("form-signin")}>
                        <Input name={"Username o Email address"} htmlId={"name"} type={"text"} value={""} ancho={"100"}/>
                        <Input name={"Password"} htmlId={"password"} type={"password"} value={""} ancho={"100"}/>
                        <div className={cx("botonera-form")}>
                            <Button theme={"primary"} submit className="btn-100">Sign up</Button>
                        </div>
                        <div className={cx("link-forgot-pass-sigin")}>
                            <a href="forgotpassword.html">¿Olvidaste la contraseña?</a>
                        </div>

                    </form>
                    <div className={cx("new-account")}>
                        <p>¿Nuevo en Comercio chino? <a href="createaccount.html">Crear cuenta</a></p>
                    </div>
                    <div className={cx("enlaces-footer-signin")}>
                        <a href="/" target="_self">Terminos</a>
                        <a href="/" target="_self">Privacidad</a>
                        <a href="/" target="_self">Seguridad</a>
                        <a href="/" target="_self">Contacto</a>
                    </div>
            </div>
    )
}


