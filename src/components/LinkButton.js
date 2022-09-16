import {Link} from 'react-router-dom';
import Styles from './pages/css/LinkButton.module.css';

function LinkButton({to, text}){
    return(
        <Link to={to} className={Styles.btn}>
            {text}
        </Link>
    )
}

export default LinkButton;