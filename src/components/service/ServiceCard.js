import { BsFillTrashFill } from 'react-icons/bs';
import styles from '../project/projectcard.module.css';

function ServiceCard({id, name, cost, description, handleRemove}) {

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id,cost);
    }

    return ( 
        <div className={styles.project_card}>
            <div className={styles.name}>
                <h4>{name}</h4>
            </div>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>
                <span>Descrição: </span> {description}
            </p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                <BsFillTrashFill/>
                Excluir
                </button>
                
            </div>
        </div>
    );
}

export default ServiceCard;