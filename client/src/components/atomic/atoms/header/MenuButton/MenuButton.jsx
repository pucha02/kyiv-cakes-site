import './MenuButton.css';

export const MenuButton = ({ src, title, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault(); // Prevent default anchor behavior

        // Scroll to the target element with offset
        const targetId = src.replace('#', ''); // Get the ID without the '#'
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offset = 100; // Offset of 50px
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        onClick(); // Close the menu
    };

    return (
        <a onClick={handleClick} href={src} className="menu-button">
           {title}
        </a>
    );
};

