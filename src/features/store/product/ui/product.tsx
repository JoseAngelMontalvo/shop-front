import React from "react";
import {useParams} from "react-router-dom";
import { bind } from "../../../../core/utils/bind";
import styles from "./product.module.css";
import { SliderProduct } from "./slider-product/slider-product";
import { FeaturesProduct } from "./features-product/features-product";
import { products } from "../../../../mock-up/products-mokup";
import {Product as ProductModel} from "../domain/product";

const cx = bind(styles);

export const Product: React.FunctionComponent = () => {
  const { id } = useParams();

  const product: ProductModel | undefined = products.find(
    (product) => product.id === id
  );

 if(product === undefined){
     return(
         <h1>Upps!!! ha ocurrido un error.</h1>
     )
 }else{
     return (
         <div id={product.id} className={cx("main-content")}>
             <h1 className={cx("name-product-top none")}>
                 Sofa 3 plazas cheslong cuero marrón
             </h1>
             <SliderProduct urlsImages={product.urlImages}/>
             <FeaturesProduct product={product}/>
         </div>
     );
 }
};
