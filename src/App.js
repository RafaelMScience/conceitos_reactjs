import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [project, setProject] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((res) => {
      setProject(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `${Date.now()}`,
      url: "Rafael",
      techs: ["NodeJs"],
    });

    const projects = response.data;

    setProject([...project, projects]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`);

    if (res.status === 204) {
      const newRepositories = project.filter(
        (repository) => repository.id !== id
      );

      setProject(newRepositories);
    }
  }

  return (
    <>
      <ul data-testid="repository-list">
        {project.map((project) => (
          <>
            <li key={project.id}>{project.title}</li>
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
