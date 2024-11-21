import './HeaderLogo.css'

export const HeaderLogo = ({src, alt=null}) => {
    return (
        <div className='login-logo'>
            <img className='login-logo' src={src} alt={alt} />
        </div>
    )
}