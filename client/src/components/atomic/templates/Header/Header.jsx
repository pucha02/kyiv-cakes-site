import { HeaderLogo } from "../../atoms/header/Logo/HeaderLogo";
import { HeaderMenu } from "../../organisms/HeaderMenu/HeaderMenu";
import { CartImage } from "../../atoms/header/Cart/CartImg";
import LogoImg from '../../../../resources/productImage/logo.webp'
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <HeaderLogo src={LogoImg} />
            <HeaderMenu />
            <CartImage/>
        </div>
    )
}

export default Header