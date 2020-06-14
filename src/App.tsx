import React, { useState } from 'react'
import Axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styles from './App.module.css'
import { bind } from './core/utils/bind'
import { SliderPpalHome } from './features/store/home/ui/slider-ppal-home/slider-ppal-home'
import { CategoriesHome } from './features/store/home/ui/categories-home/categories-home'
import { ShowCaseHome } from './features/store/home/ui/showcase-home/showcase-home'
import { Product } from './features/store/product/ui/product'
import { SignIn } from './features/store/signin/ui/signin'
import { MainTemplate } from './core/components/main-template/main-template'
import { MainContentTheme } from './core/components/main-content-theme/main-content-theme'
import { SignUp } from './features/store/sing-up/ui/sing-up'
import { Footer } from './core/components/footer/ui/footer'
import { User } from './features/store/user/domain/user'
import { setToken } from './core/utils/manage-token'
import { DataSignup } from './features/store/sing-up/domain/data-signup'

const cx = bind(styles)
function App() {
  const [user, setUser] = useState<User>()

  async function login(email: string, password: string) {
    const { data } = await Axios.post('http://localhost:3001/api/auth/login', { email, password })
    setUser(data.user)
    setToken(data.token)
  }

  async function signup(user: DataSignup) {
    const { data } = await Axios.post('http://localhost:3001/api/auth/signup', user)
    setUser(data.user)
    setToken(data.token)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainContentTheme>
            <MainTemplate>
              <SliderPpalHome urlImage="/img/banner_3.jpg" alt="Imagen slider home" />
              <CategoriesHome />
              <ShowCaseHome />
            </MainTemplate>
          </MainContentTheme>
        </Route>
        <Route path="/product/search">
          <MainContentTheme>
            <MainTemplate></MainTemplate>
          </MainContentTheme>
        </Route>
        <Route path="/product/:id">
          <MainContentTheme>
            <MainTemplate>
              <Product />
            </MainTemplate>
          </MainContentTheme>
        </Route>
        <Route path="/signin">
          <MainContentTheme>
            <div>
              <SignIn login={login} />
            </div>
          </MainContentTheme>
        </Route>
        <Route path="/signup">
          <MainContentTheme>
            <SignUp signup={signup} />
            <Footer />
          </MainContentTheme>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
