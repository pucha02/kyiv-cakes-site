import { IncreaseButton, } from "../../atoms/product/QuantitySelector/IncreaseButton";
import { DecreaseButton } from "../../atoms/product/QuantitySelector/DecreaseButton"
import { CountDisplay } from "../../atoms/product/QuantitySelector/CountDisplay";

export const ProductQuantitySelector = ({count}) => {
    return (
        <div>
            <IncreaseButton/>
            <CountDisplay count={count}/>
            <DecreaseButton/>
        </div>
    )
}