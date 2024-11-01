import { MenuButton } from "../../atoms/header/MenuButton/MenuButton";
import { useEffect, useMemo, useState } from "react";
import './HeaderMenu.css';

export const HeaderMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]); // State to store unique categories

    // Fetch products and extract unique categories on component mount
    useEffect(() => {
        const fetchCategoriesFromProducts = async () => {
            try {
                const response = await fetch('http://13.60.53.226/api/products'); // Adjust to your products endpoint
                const products = await response.json();

                // Extract unique categories
                const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
                console.log(uniqueCategories)
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        
        fetchCategoriesFromProducts();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    };

    const renderCategory = (data) => {
        return data.map((category, idx) => (
            <div className="category-list-el" key={idx}>
                <MenuButton title={category} src={`#${category}`} onClick={()=>setIsOpen(false)}/>
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
                <div className="category-list-elemenst">{elements}</div>
            </div>
        </div>
    );
};


// import { MenuButton } from "../../atoms/header/MenuButton/MenuButton";
// import { useMemo, useState } from "react";
// import './HeaderMenu.css';

// export const HeaderMenu = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const categories = [
//         "Порційні десерти",
//         "Твої Веган Десерти",
//         "Твої кекси",
//         "Твої сиропи",
//         "Твої Тортики",
//         "Кіш лорен"
//     ];

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//         console.log(isOpen)
//     };
    

//     const renderCategory = (data) => {
//         return data.map((category, idx) => (
//             <div className="category-list-el" key={idx}>
//                 <MenuButton title={category} src={`#${category}`} onClick={toggleMenu}/>
//             </div>
//         ));
//     };

//     const elements = useMemo(() => renderCategory(categories), [categories]);

//     return (
//         <div className="header-menu">
//             <div className="burger-icon" onClick={toggleMenu}>
//                 ☰
//             </div>
//             <div className={`category-list ${isOpen ? 'open' : ''}`}>
//                 <div className="category-list-elemenst">{elements}</div>
//             </div>
//         </div>
//     );
// };
