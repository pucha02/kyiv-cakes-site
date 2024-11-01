import { HeaderLogo } from "../../atoms/header/Logo/HeaderLogo";
import { HeaderMenu } from "../../organisms/HeaderMenu/HeaderMenu";
import { CartIcon } from "../../moleculs/CartIcon/CartIcon";
import { CartModal } from "../CartModal/CartModal";
import LogoImg from '../../../../resources/productImage/logo.webp'
import './Header.css'

const Header = ({ isOpen, setIsOpen }) => {
    const toggleCartModal = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        < >
            <div className="desktop-header">
                <HeaderLogo src={LogoImg} />
                <HeaderMenu />
                <CartIcon onClick={toggleCartModal} />
                <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className="mobile-header">
                <HeaderMenu />
                <HeaderLogo src={LogoImg} />
                <CartIcon onClick={toggleCartModal} />
                <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>

        </>
    )
}

export default Header