import { IncreaseButton, } from "../../atoms/product/QuantitySelector/IncreaseButton";
import { DecreaseButton } from "../../atoms/product/QuantitySelector/DecreaseButton"
import { CountDisplay } from "../../atoms/product/QuantitySelector/CountDisplay";
import './QuantitySelector.css'

export const ProductQuantitySelector = ({ count, setCount, updateTotal }) => {
    return (
        <div className="product-quantity-selector-container">
            <div className="product-quantity-selector-elements">
                <DecreaseButton setCount={setCount} count={count} updateTotal={updateTotal} />
                <CountDisplay count={count} setCount={setCount} />
                <IncreaseButton setCount={setCount} count={count} updateTotal={updateTotal}/>
            </div>
        </div>
    )
}