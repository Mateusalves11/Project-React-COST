import styles from '../project/projectform.module.css';
import Input from '../form/input';
import SubmitBtn from '../form/submitbtn';
import { useState } from 'react';

function ServiceForm({textBtn , handleSubmit , projectData}) {

    const [service, setService] = useState({});

    function submit(e) {
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Serviço"
                name="name"
                placeholder="Insira o nome do Serviço"
                handleOnChange={handleChange}
            />

            <Input
                type="number"
                text="Custo do Serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />

            <Input
                type="text"
                text="Descrição do Serviço"
                name="description"
                placeholder="Insira a descrição do Serviço"
                handleOnChange={handleChange}
            />
            <SubmitBtn text={textBtn}/>
        </form>
    );
}

export default ServiceForm;