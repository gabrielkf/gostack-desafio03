import React, { useState, useEffect } from 'react';

import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const mockRepo = {
      title: Date.now(),
      url: `https://github.com/gabrielkf/${Date.now()}`,
      techs: ['Cool new language', 'Awesome new framework'],
    };

    const { data: newRepo } = await api.post(
      '/repositories',
      mockRepo
    );

    setRepositories([...repositories, newRepo]);
  }

  async function handleRemoveRepository(id) {
    const remainingRepos = [];
    repositories.map(
      repo => repo.id !== id && remainingRepos.push(repo)
    );

    setRepositories(remainingRepos);

    await api.delete(`/repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button
              type="button"
              onClick={() =>
                handleRemoveRepository(repo.id)
              }
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
