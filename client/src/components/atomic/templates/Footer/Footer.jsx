import { Link } from "react-router-dom"
import './Footer.css'

export const Footer = () => {
    return(
        <div className="footer-block">
            <div className="order-header foot"><span className="order-header-name1"></span><span className="order-header-name2">+380502743222</span></div>
            <div className="order-header foot"><span className="order-header-name2">Робочі години:</span> <span className="order-header-name1" style={{marginLeft:"10px"}}>Цілодобово</span></div>
        </div>
    )
}