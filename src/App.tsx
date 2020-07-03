import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
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
    const result = await userRepository.Login(email, password)
    setUser(result)
    setToken(result.token)
  }

  async function signup(dataUser: DataSignup) {
    const userRepository = UserRepositoryFactory.post()
    const result = await userRepository.Signup(dataUser)
    setUser(result)
    setToken(result.token)
  }

  function logout() {
    setUser(null)
    deleteToken()
  }

  return (
    <Router>
      {user ? (
        <LoginRoutes user={user} loading={loadingUser} />
      ) : (
        <LogoutRoutes signup={signup} login={login} />
      )}
    </Router>
  )
}

interface Props {
  login(email: string, password: string): void
  signup(dataUser: DataSignup): void
}
interface PropsLoginRoutes {
  user?: User | null
  loading: boolean
}
export const LoginRoutes: React.FC<PropsLoginRoutes> = ({ user, loading }) => {
  return (
    <Switch>
      <Route path="/product/search">
        <MainContentTheme>
          <MainTemplate user={user}></MainTemplate>
        </MainContentTheme>
      </Route>
      <Route path="/product/:id">
        <MainContentTheme>
          <MainTemplate user={user}>
            <Product />
          </MainTemplate>
        </MainContentTheme>
      </Route>
      <Route path="/shoppingcart">
        <MainContentTheme>
          <MainTemplate user={user}>
            <ShoppingCart />
          </MainTemplate>
        </MainContentTheme>
      </Route>
      <Route exact path="/">
        <MainContentTheme>
          {loading ? (
            <MainTemplate>
              <Loading />
            </MainTemplate>
          ) : (
            <MainTemplate user={user}>
              <SliderPpalHome urlImage="/img/banner_3.jpg" alt="Imagen slider home" />
              <CategoriesHome />
              <ShowCaseHome />
            </MainTemplate>
          )}
        </MainContentTheme>
      </Route>
    </Switch>
  )
}
export const LogoutRoutes: React.FC<Props> = ({ login, signup }) => {
  return (
    <Switch>
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
    </Switch>
  )
}

export default App
