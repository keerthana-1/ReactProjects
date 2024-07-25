import styles from "./Button.module.css";

function Button({children,onClick,type}:{children:React.ReactNode,onClick:React.MouseEventHandler<HTMLButtonElement>,type:string}){
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>
    )
}

export default Button;