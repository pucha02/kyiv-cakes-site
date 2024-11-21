import { Link } from "react-router-dom"
import './Footer.css'

export const Footer = () => {
    return (
        <div className="footer-block">
            <div className="order-header foot">
                <span className="order-header-name1"></span>
                <a href="tel:+380502743222" className="order-header-name2" onCopy={(e) => e.preventDefault()}>
                    +380502743222
                </a>
            </div>

            <div className="order-header foot"><span className="order-header-name2">Час доставки:</span> <span className="order-header-name1" style={{ marginLeft: "10px" }}>09:00 - 14:00</span></div>
        </div>
    )
}