import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

import { api } from '../../services/api';

interface Repository {
  html_url: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
}

export const Dashboard: React.FC = () => {
  const [repoName, setRepoName] = useState('');
  const [inputError, setInputError] = useState('');
  const [repos, setRepos] = useState<Repository[]>(
    JSON.parse(localStorage.getItem('@GitHubExplorer.repos') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('@GitHubExplorer.repos', JSON.stringify(repos));
  }, [repos]);

  async function handleAddRepo(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!repoName) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const res = await api.get(`repos/${repoName}`);
      setRepos([res.data, ...repos]);
      if (inputError) {
        setInputError('');
      }
    } catch (err) {
      console.log(err);
      setInputError('Erro na busca do repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepo}>
        <input
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repos.map((repo) => (
          <Link key={repo.full_name} to={`repositories/${repo.full_name}`}>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={26} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};
