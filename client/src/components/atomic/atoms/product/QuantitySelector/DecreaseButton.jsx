import './QuantitySelector.css'

export const DecreaseButton = ({ setCount, count }) => {

    return (
        <>
            {count > 1 && <div className='minus' onClick={() => setCount(count - 1)}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" class="skExVD_"><path fill-rule="evenodd" d="M20,12 L20,13 L5,13 L5,12 L20,12 Z"></path></svg>
            </div>}
        </>
    )
}