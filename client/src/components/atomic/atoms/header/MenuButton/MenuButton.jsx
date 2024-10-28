import './MenuButton.css'

export const MenuButton = ({ src, title }) => {
    return (
        <div className="menu-button">
            <div src={src}>{title}</div>
        </div>
    )
}