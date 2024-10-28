import './HeaderLogo.css'

export const HeaderLogo = ({src, alt=null}) => {
    return (
        <div className='logo-block'>
            <img className="logo-image" src={src} alt={alt} />
        </div>
    )
}