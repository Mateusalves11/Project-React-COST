import ProjectForm from '../project/projectform';
import styles from './css/NewProject.module.css';
import { useNavigate } from 'react-router-dom';

function NovoProjeto() {
    const history = useNavigate();  

    function createPost(project){
      // Inicialiando cost e serviços
      project.cost = 0;
      project.services = [];
      // Inserindo o projeto no banco de dados
      fetch("http://localhost:5000/projects",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project),
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        // Redirect
        history('/Projects', {state:{message: "Projeto criado com sucesso!"}});
      })
      .catch((err) => console.log(err))
    }

    return (
      <div className={styles.newproject_container}>
        <h1>Criar Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
      </div>
    );
  }
  
  export default NovoProjeto;