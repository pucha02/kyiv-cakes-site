import { MenuButton } from "../../atoms/header/MenuButton/MenuButton";
import { useEffect, useState } from "react";
import './HeaderMenu.css';

export const HeaderMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        const fetchCategoriesFromProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products/getProducts');
                const products = await response.json();

                // Собираем уникальные категории
                const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

                // Добавляем категорию "Новинки", если есть товары с type: "new"
                const hasNewProducts = products.some(product => product.type === "new");
                if (hasNewProducts) {
                    uniqueCategories.unshift("Новинки"); // Добавляем "Новинки" в начало списка
                }

                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchCategoriesFromProducts();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const renderCategory = (data) => {
        return data.map((category, idx) => (
            <div
                className={`category-list-el ${activeCategory === category ? 'active' : ''}`}
                key={idx}
            >
                <MenuButton
                    title={category}
                    src={`#${category}`}
                    onClick={() => {
                        setIsOpen(false);
                        setActiveCategory(category);
                    }}
                />
            </div>
        ));
    };

    // Обновление activeCategory при прокрутке
    useEffect(() => {
        const handleScroll = () => {
            let closestCategory = null;
            let closestOffset = Number.MAX_VALUE;

            categories.forEach((category) => {
                const element = document.getElementById(category);
                if (element) {
                    const elementOffset = Math.abs(element.getBoundingClientRect().top);
                    if (elementOffset < closestOffset) {
                        closestOffset = elementOffset;
                        closestCategory = category;
                    }
                }
            });

            if (closestCategory !== activeCategory) {
                setActiveCategory(closestCategory);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [categories, activeCategory]);

    return (
        <div className="header-menu">
            <div className="burger-icon" onClick={toggleMenu}>
                ☰
            </div>
            <div className={`category-list ${isOpen ? 'open' : ''}`}>
                <div className="category-list-elemenst">{renderCategory(categories)}</div>
            </div>
        </div>
    );
};
