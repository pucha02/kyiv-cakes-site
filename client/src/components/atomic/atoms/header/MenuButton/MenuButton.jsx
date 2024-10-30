import './MenuButton.css';

export const MenuButton = ({ src, title, onClick }) => {
    return (
        <a onClick={onClick} href={src} className="menu-button">
           {title}
        </a>
    );
};
