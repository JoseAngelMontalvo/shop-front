import React from 'react'
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
import { SignUp } from './features/store/sing-up/sing-up'
import { Footer } from './core/components/footer/ui/footer'

const cx = bind(styles)
function App() {
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
            <SignIn />
          </MainContentTheme>
        </Route>
        <Route path="/signup">
          <MainContentTheme>
            <SignUp />
            <Footer />
          </MainContentTheme>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
