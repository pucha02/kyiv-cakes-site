import './QuantitySelector.css'

export const IncreaseButton = ({ setCount, count }) => {
    return (
        <div className='plus' onClick={() => setCount(count + 1)}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" class="skExVD_"><path fill-rule="evenodd" d="M13,5 L13,12 L20,12 L20,13 L13,13 L13,20 L12,20 L11.999,13 L5,13 L5,12 L12,12 L12,5 L13,5 Z"></path></svg>
        </div>
    )
}