import React from 'react';
import { BrowserRouter,Switch, Route, Link } from 'react-router-dom'
import './App.css';
import {Header} from "./core/components/header/header";
import {SliderPpalHome} from "./features/store/home/ui/slider-ppal-home/slider-ppal-home";
import {CategoriesHome} from "./features/store/home/ui/categories-home/categories-home";
import {ShowCaseHome} from "./features/store/home/ui/showcase-home/showcase-home";
import {categories} from "./mock-up/categories-mokup";

import {Product} from "./features/store/product/ui/product";
import {Footer} from "./core/components/footer/ui/footer";
import {SignIn} from "./features/store/signin/ui/signin";


function App() {

  return (

    <>

        <BrowserRouter>

            <Switch>
            <Route exact path="/">
                <Header/>
                <SliderPpalHome urlImage="/img/banner_3.jpg" alt="Imagen slider home"/>
                <CategoriesHome categories={categories}/>
                <ShowCaseHome/>
                <Footer/>
            </Route>
            <Route path="/product/:id">
                <Header/>
                <Product/>
                <Footer/>
            </Route>
                <Route path="/signin">
                    <SignIn/>
                </Route>
            </Switch>

        </BrowserRouter>





    </>
  );
}

export default App;
