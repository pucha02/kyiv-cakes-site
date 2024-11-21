import Header from "../templates/Header/Header";
import ProductList from "../templates/ProductList/ProductList";
import { useState, useEffect } from "react";
import { Footer } from "../templates/Footer/Footer";
import Marquee from "../atoms/Marquee/Marquee";
import Banner from '../../../resources/productImage/banner.svg'

export const MainPage = () => {
    const [isOpen, setIsOpen] = useState(false);
useEffect(()=>{
    JSON.parse(localStorage.getItem('cart'))
})
    return <div>
        <div>
            <img className="banner" src={Banner} alt="" />
        </div>
        <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Marquee/>
        <ProductList isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Footer/>
    </div>
}