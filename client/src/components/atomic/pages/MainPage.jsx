import Header from "../templates/Header/Header";
import ProductList from "../templates/ProductList/ProductList";
import { useState } from "react";

export const MainPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return <div>
        <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
        <ProductList isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
}