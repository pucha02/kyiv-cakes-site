import Header from "../templates/Header/Header";
import ProductList from "../templates/ProductList/ProductList";
import { useState, useEffect } from "react";
import { Footer } from "../templates/Footer/Footer";

export const MainPage = () => {
    const [isOpen, setIsOpen] = useState(false);
useEffect(()=>{
    JSON.parse(localStorage.getItem('cart'))
})
    return <div>
        <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
        <ProductList isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Footer/>
    </div>
}