import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from 'react-router-dom'
import styles from './App.module.css'
import { bind } from './core/utils/bind'
import { SliderPpalHome } from './features/store/home/ui/slider-ppal-home/slider-ppal-home'
import { CategoriesHome } from './features/store/home/ui/categories-home/categories-home'
import { ShowCaseHome } from './features/store/home/ui/showcase-home/showcase-home'
import { Product } from './features/store/product/ui/product'
import { SignIn } from './features/store/user/auth/signin/ui/signin'
import { MainTemplate } from './core/components/main-template/main-template'
import { MainContentTheme } from './core/components/main-content-theme/main-content-theme'
import { SignUp } from './features/store/user/auth/signup/ui/sing-up'
import { Footer } from './core/components/footer/ui/footer'
import { User } from './features/store/user/domain/user'
import {
  deleteToken,
  getToken,
  setToken,
  initAxiosInterceptors,
} from './features/store/user/domain/manage-token'
import { DataSignup } from './features/store/user/auth/signup/domain/data-signup'
import { Loading } from './core/components/loading/loading'
import { UserHttpRepository } from './features/store/user/infrastructure/user-http-repository'
import { UserRepositoryFactory } from './features/store/user/infrastructure/user-repository-factory'
import { UserDto } from './features/store/user/infrastructure/user-dto'
import { ShoppingCart } from './features/store/shopping-cart/ui/shopping-cart'

initAxiosInterceptors()

const cx = bind(styles)

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState<boolean>(false)
  let nameUser: string = ''

  if (user) {
    nameUser = user.name
  }
  useEffect(() => {
    setLoadingUser(true)
    async function loadUser() {
      const token = getToken()
      if (token === null) {
        console.log('NO Hay token')
        setLoadingUser(false)
        return
      }
      try {
        console.log('Hay token')
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
    setLoadingUser(true)
    const userRepository = UserRepositoryFactory.post()
    const result = await userRepository.Login(email, password)
    setUser(result)
    setToken(result.token)
    setLoadingUser(false)
  }

  async function signup(dataUser: DataSignup) {
    setLoadingUser(true)
    const userRepository = UserRepositoryFactory.post()
    const result = await userRepository.Signup(dataUser)
    setUser(result)
    setToken(result.token)
    setLoadingUser(false)
  }

  function logout() {
    setUser(null)
    deleteToken()
  }

  return (
    <Router>
      {user && user.role === 'ADMIN_ROLE' ? (
        <Route path="/product/search">
          <MainContentTheme>
            <MainTemplate user={user} logout={logout}></MainTemplate>
          </MainContentTheme>
        </Route>
      ) : (
        <Switch>
          <Route path="/product/search">
            <MainContentTheme>
              <MainTemplate user={user} logout={logout}></MainTemplate>
            </MainContentTheme>
          </Route>
          <Route path="/product/:id">
            <MainContentTheme>
              <MainTemplate user={user} logout={logout}>
                <Product />
              </MainTemplate>
            </MainContentTheme>
          </Route>
          <Route path="/shoppingcart">
            <MainContentTheme>
              <MainTemplate user={user} logout={logout}>
                <ShoppingCart />
              </MainTemplate>
            </MainContentTheme>
          </Route>
          <Route path="/signin">
            <MainContentTheme>
              <SignIn login={login} />
            </MainContentTheme>
          </Route>
          <Route path="/signup">
            <MainContentTheme>
              <SignUp signup={signup} />
            </MainContentTheme>
            <Footer />
          </Route>
          <Route exact path="/">
            <MainContentTheme>
              {loadingUser ? (
                <MainTemplate logout={logout}>
                  <Loading />
                </MainTemplate>
              ) : (
                <MainTemplate user={user} logout={logout}>
                  <SliderPpalHome urlImage="/img/banner_3.jpg" alt="Imagen slider home" />
                  <CategoriesHome />
                  <ShowCaseHome />
                </MainTemplate>
              )}
            </MainContentTheme>
          </Route>
        </Switch>
      )}
    </Router>
  )
}

export default App
