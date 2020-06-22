import React, { useEffect, useState } from 'react'
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
import { deleteToken, getToken, setToken, initAxiosInterceptors } from './core/utils/manage-token'
import { DataSignup } from './features/store/sing-up/domain/data-signup'
import { Loading } from './core/components/loading/loading'
import { UserHttpRepository } from './features/store/user/infrastructure/user-http-repository'
import { UserRepositoryFactory } from './features/store/user/infrastructure/user-repository-factory'

initAxiosInterceptors()

const cx = bind(styles)
function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState<boolean>(true)
  let nameUser: string = ''
  if (user) {
    nameUser = user.name
  }
  useEffect(() => {
    async function loadUser() {
      if (!getToken) {
        setLoadingUser(false)
        return
      }
      try {
        const { data } = await Axios.get('http://localhost:3001/api/auth/profile')
        setUser(data.user)
        setLoadingUser(false)
      } catch (error) {
        console.log(error)
      }
    }
    loadUser()
  }, [])

  async function login(email: string, password: string) {
    const userRepository = UserRepositoryFactory.post()
    const result = await userRepository.findByLogin(email, password)
    setUser(result)
    setToken(result.token)
  }

  async function signup(dataUser: DataSignup) {
    const { data } = await Axios.post('http://localhost:3001/api/auth/signup', user)
    setUser(data.user)
    setToken(data.token)
  }

  function logout() {
    setUser(null)
    deleteToken()
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainContentTheme>
            {loadingUser ? (
              <MainTemplate user={nameUser}>
                <Loading />
              </MainTemplate>
            ) : (
              <MainTemplate>
                <SliderPpalHome urlImage="/img/banner_3.jpg" alt="Imagen slider home" />
                <CategoriesHome />
                <ShowCaseHome />
              </MainTemplate>
            )}
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
              <div>{nameUser}</div>
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
