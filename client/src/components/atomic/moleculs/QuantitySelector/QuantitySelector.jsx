import { IncreaseButton, } from "../../atoms/product/QuantitySelector/IncreaseButton";
import { DecreaseButton } from "../../atoms/product/QuantitySelector/DecreaseButton"
import { CountDisplay } from "../../atoms/product/QuantitySelector/CountDisplay";
import { useState } from "react";
import './QuantitySelector.css'

export const ProductQuantitySelector = ({count, setCount}) => {
    

    return (
        <div className="product-quantity-selector">
            <DecreaseButton setCount={setCount} count={count}/>
            <CountDisplay count={count} setCount={setCount}/>
            <IncreaseButton setCount={setCount} count={count}/>
        </div>
    )
}