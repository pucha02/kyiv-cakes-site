import { MenuButton } from "../../atoms/header/MenuButton/MenuButton";
import { useMemo } from "react";
import './HeaderMenu.css'

export const HeaderMenu = () => {
    const categories = ["Торты", "Десерты", "Чизкейки"];

    const renderCategory = (data) => {
        return Object.values(data).map((category, idx) => (
            <div className="category-list-el" key={idx} >
                <MenuButton title={category} src={`#${category}`} />
            </div>
        ));
    };
    const elements = useMemo(() => renderCategory(categories), []);

    return <div className="category-list">{elements}</div>;
}