import React, { useEffect, useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './router-app.module.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MainContentTheme } from '../main-content-theme/main-content-theme'
import { MainTemplate } from '../main-template/main-template'
import { Header } from '../header/header'
import { Product } from '../../../features/store/product/ui/product'
import { ShoppingCart } from '../../../features/store/shopping-cart/ui/shopping-cart'
import { SignIn } from '../../../features/store/auth/ui/signin/signin'
import { SignUp } from '../../../features/store/auth/ui/signup/sing-up'
import { Footer } from '../footer/ui/footer'
import { Loading } from '../loading/loading'
import { SliderPpalHome } from '../../../features/store/home/ui/slider-ppal-home/slider-ppal-home'
import { CategoriesHome } from '../../../features/store/home/ui/categories-home/categories-home'
import { ShowCaseHome } from '../../../features/store/home/ui/showcase-home/showcase-home'
import { User } from '../../domain/user/user'
import { ShoppingCart as ShoppingCartModel } from '../../../features/store/shopping-cart/domain/shoppingCart'
import { UserRepositoryFactory } from '../../infrastructure/user/user-repository-factory'
import {
  deleteToken,
  getToken,
  initAxiosInterceptors,
  setToken,
} from '../../../features/store/auth/domain/manage-token'
import { DataSignup } from '../../../features/store/auth/domain/data-signup'
import { ProductCart } from '../../../features/store/shopping-cart/domain/productCart'
import { ManageShoppingCart } from '../../../features/store/shopping-cart/infrastructure/manage-shoppingCart'
import { AdminTemplate } from '../../../features/administration/admin-template/admin-template'
import { AdminUserData } from '../../../features/administration/admin-user-profile/ui/admin-user-data/admin-user-data'
import Axios from 'axios'

const cx = bind(styles)

initAxiosInterceptors()

export const RouterApp: React.FunctionComponent = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState<boolean>(false)
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartModel>({
    products: [],
    userid: '',
  })
  let nameUser: string = ''

  if (user) {
    nameUser = user.name
  }

  useEffect(() => {
    setLoadingUser(true)
    async function loadUser() {
      const token = getToken()
      if (token === null) {
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

  async function login(email: string, password: string, products: ProductCart[]) {
    setLoadingUser(true)
    const userRepository = UserRepositoryFactory.post()
    const result = await userRepository.Login(email, password)
    setUser(result)
    setToken(result.token)
    setLoadingUser(false)
    const manageShoppingCart = new ManageShoppingCart()
    manageShoppingCart.updateShoppingCart()
  }

  async function signup(dataUser: DataSignup, products: ProductCart[]) {
    setLoadingUser(true)
    const userRepository = UserRepositoryFactory.post()
    const result = await userRepository.Signup(dataUser)
    setUser(result)
    setToken(result.token)
    setLoadingUser(false)
    const manageShoppingCart = new ManageShoppingCart()
    manageShoppingCart.storeShoppingCart(products, result.id)
  }

  async function saveProfile(userProfile: User) {
    setUser(userProfile)
    const userRepository = UserRepositoryFactory.post()
    const result = await userRepository.UpdateUserProfile(userProfile)
  }

  function logout() {
    setUser(null)
    deleteToken()
  }
  return (
    <Router>
      <Switch>
        <Route path="/product/search">
          <MainContentTheme>
            <MainTemplate shoppingcart={shoppingCart} user={user} logout={logout}>
              <Header user={user} logout={logout} />
            </MainTemplate>
          </MainContentTheme>
        </Route>
        <Route path="/product/:id">
          <MainContentTheme>
            <MainTemplate shoppingcart={shoppingCart} user={user} logout={logout}>
              <Header user={user} logout={logout} />
              <Product />
            </MainTemplate>
          </MainContentTheme>
        </Route>
        <Route path="/shoppingcart">
          <MainContentTheme>
            <MainTemplate shoppingcart={shoppingCart} user={user} logout={logout}>
              <Header user={user} logout={logout} />
              <ShoppingCart shoppingcart={shoppingCart} />
            </MainTemplate>
          </MainContentTheme>
        </Route>
        <Route path="/admin/profile">
          <MainContentTheme>
            <MainTemplate shoppingcart={shoppingCart} user={user} logout={logout}>
              <Header user={user} logout={logout} />
              <AdminTemplate user={user}>
                <AdminUserData saveProfile={saveProfile} user={user} />
              </AdminTemplate>
            </MainTemplate>
          </MainContentTheme>
        </Route>
        <Route path="/signin">
          <MainContentTheme>
            <MainTemplate shoppingcart={shoppingCart}>
              <SignIn login={login} />
            </MainTemplate>
          </MainContentTheme>
        </Route>
        <Route path="/signup">
          <MainContentTheme>
            <MainTemplate shoppingcart={shoppingCart}>
              <SignUp signup={signup} />
            </MainTemplate>
          </MainContentTheme>
          <Footer />
        </Route>
        <Route exact path="/">
          <MainContentTheme>
            {loadingUser ? (
              <MainTemplate shoppingcart={shoppingCart} logout={logout}>
                <Loading />
              </MainTemplate>
            ) : (
              <MainTemplate shoppingcart={shoppingCart} user={user} logout={logout}>
                <Header user={user} logout={logout} />
                <SliderPpalHome urlImage="/img/banner_3.jpg" alt="Imagen slider home" />
                <CategoriesHome />
                <ShowCaseHome />
              </MainTemplate>
            )}
          </MainContentTheme>
        </Route>
      </Switch>
    </Router>
  )
}
