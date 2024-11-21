import { Link } from "react-router-dom"
import './OrderPageHeader.css'

export const OrderPageHeader = () => {
    return(
        <div className="order-header-block">
            <div className="order-header"><Link to={'/kyivcakes'} className="order-header-logo"><span className="order-header-name1">Kyiv Cakes</span><span className="order-header-name2">ОФОРМЛЕННЯ</span></Link></div>
            <Link to={'/kyivcakes'} className="go"><div className="go-view">Продовжити перегляд</div></Link>
        </div>
    )
}