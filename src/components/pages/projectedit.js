import styles from './css/edit.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import ProjectForm from '../project/projectform';
import Message from './message';
import ServiceForm from '../service/ServiceForm';
import { parse, v4 as uuidv4 } from 'uuid';
import ServiceCard from '../service/ServiceCard';

function Edit() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [services, setServices] = useState({});

    useEffect(() => {


        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => {
                setProject(data);
                setServices(data.services);
            })
            .catch(err => console.log(err))

    }, [id])

    function editProject(project) {

        setMessage('');

        if (project.budget < project.cost) {
            setMessage('Orçamento não pode ser menor que os custos')
            setType('error')
            setTimeout(() => { setMessage(""); }, 2500);
            return false
        }

        fetch(`http://localhost:5000/projects/${id}`, {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(res => res.json())
            .then(data => {
                setProject(data);
                setShowProjectForm(false);
                setMessage('Projeto editado com sucesso');
                setType('success');
            })
            .catch(err => console.log(err))
    }

    function createService(project) {

        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento não pode ser menor que os custos')
            setType('error')
            project.services.pop();
            setTimeout(() => { setMessage(""); }, 2500);
            return false
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then(res => res.json())
            .then(data => {
                setShowServiceForm(false);
            })
            .catch(err => console.log(err))

    }

    function removeService(id, cost) {

        const servicesUpdate = services.filter(service => service.id !== id);

        const projectUpdated = project;
        projectUpdated.services = servicesUpdate;
        projectUpdated.cost = parseFloat(project.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        }).then(res => res.json())
            .then(data => {
                setProject(projectUpdated)
                setServices(servicesUpdate)
                setMessage('Serviço excluído com sucesso');
                setType('success');
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }



    return (
        <>
            {project.name ? (
                <div>
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.container}>
                        <div className={styles.project}>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                        </div>
                        {!showProjectForm ? (
                            <div className={styles.infos}>
                                <p>
                                    <span>Category: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento: </span> {project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado: </span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <ProjectForm
                                    handleSubmit={editProject}
                                    btnText='Concluir edição'
                                    projectData={project}
                                />
                            </div>
                        )}

                    </div>
                    <div className={styles.serviceContainer}>
                        <div className={styles.projectService}>
                            <h2>Adicione Serviços</h2>
                            <button onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}</button>
                        </div>
                        <div className={styles.infos}>
                            {showServiceForm && (
                                <ServiceForm
                                    handleSubmit={createService}
                                    textBtn='Adicionar Serviço'
                                    projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>

                    {services.length > 0 &&
                        services.map((service) => (
                            <ServiceCard
                                id={service.id}
                                key={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                handleRemove={removeService}
                            />
                        ))
                    }

                    {services.length == 0 && <p>Nenhum serviço adicionado</p>}

                </div>

            ) : (
                <Loading />
            )}

        </>

    )
}

export default Edit