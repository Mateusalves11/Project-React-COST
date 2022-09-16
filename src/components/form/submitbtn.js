import Styles from './submitbtn.module.css';

function SubmitBtn({text}){
    return(
        <div>
            <button className={Styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitBtn;