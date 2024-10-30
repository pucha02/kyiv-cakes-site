import { MenuButton } from "../../atoms/header/MenuButton/MenuButton";
import { useMemo, useState } from "react";
import './HeaderMenu.css';

export const HeaderMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const categories = [
        "Порційні десерти",
        "Твої Веган Десерти",
        "Твої Кекси",
        "Твої сиропи",
        "Твої Тортики",
        "Кіш лорен"
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    };

    const renderCategory = (data) => {
        return data.map((category, idx) => (
            <div className="category-list-el" key={idx}>
                <MenuButton title={category} src={`#${category}`} onClick={toggleMenu}/>
            </div>
        ));
    };

    const elements = useMemo(() => renderCategory(categories), [categories]);

    return (
        <div className="header-menu">
            <div className="burger-icon" onClick={toggleMenu}>
                ☰
            </div>
            <div className={`category-list ${isOpen ? 'open' : ''}`}>
                {elements}
            </div>
        </div>
    );
};
