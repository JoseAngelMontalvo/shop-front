import React from "react";
import { bind } from "../../../../../core/utils/bind";
import styles from "./features-product.module.css";
import { Button } from "../../../../../core/components/buttons/button";
import { Icon } from "../../../../../core/components/icons/icon";
import {Product} from "../../domain/product";
import {Input} from "../../../../../core/components/input/input";

const cx = bind(styles);

export const FeaturesProduct: React.FC<{ product: Product }> = ({
  product,
}) => {
  return (
    <div className={cx("features-product")}>
      <h2 className={cx("subname-product")}>{product.name}</h2>
      <div className={cx("description-product")}>{product.description}</div>
      <p className={cx("price-product")}>
        {product.price}
        <span>€</span>
      </p>
      <div className={cx("product-rating")}>
        <a href="#">
          <span className="stars">
            <i className={cx("material-icons")}>star</i>
            <i className={cx("material-icons")}>star</i>
            <i className={cx("material-icons")}>star</i>
            <i className={cx("material-icons")}>star</i>
            <i className={cx("material-icons")}>star_border</i>
          </span>
          <span className={cx("product-number-rating-people")}>
            <i className={cx("material-icons")}>keyboard_arrow_down</i>621
          </span>
        </a>
      </div>
      <div className={cx("add-product")}>
        <form>
          <div className={cx("quantity")}>
            <label htmlFor="quantity">Cantidad</label>
            <div className={cx("controls-quantity")}>
              <Button
                theme={"only-icon"}
                icon={<Icon type={"material-icons"} content={"remove"} />}
              />
              <input type="text" value="1" name="quantity" />
              <Button
                theme={"only-icon"}
                icon={<Icon type={"material-icons"} content={"add"} />}
              />
            </div>
          </div>
            <Button theme={"primary"} className={"btn-icon, width100"} icon={<Icon type={"material-icons"} content={"add_shopping_cart"}/>}>Añadir al
                carrito</Button>
        </form>
      </div>
    </div>
  );
};
