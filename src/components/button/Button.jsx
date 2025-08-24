import "./Button.css"

export const Button = ({ onClick, children }) => {
    return (
        <button onClick={ onClick } className="my-cool-button">
            {children}
        </button>
    )
}
