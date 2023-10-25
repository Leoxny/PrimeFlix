import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiMovies } from '../../api/ApiMovies';
import './filme.css';
import { toast } from 'react-toastify'

export const FilmeScreen = () => {
    const { id } = useParams();
    const [filmeId, setFilmeId] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadFilmesID();
        return () => { };
    }, [navigate, id]);

    const loadFilmesID = async () => {
        try {

            const response = await ApiMovies.getFilme(id);
            setFilmeId(response.data);
            setLoading(false);

        } catch (err) {
            console.log('ERR', err);
            navigate("/", { replace: true });
            return
        }
    };

    const salvarFilme = async () => {

        const minhLista = localStorage.getItem("filme");
        let filmeSalvos = JSON.parse(minhLista) || [];

        // some verifica se tem pelo menos 1 item na sua lista para verificar
        const hasFilme = filmeSalvos.some((filmesSalvos) => filmesSalvos.id === filmeId.id)

        if (hasFilme) {
            toast.warn("Esse filme já está na sua lista!")
            return
        }

        filmeSalvos.push(filmeId)
        localStorage.setItem("filme", JSON.stringify(filmeSalvos))
        toast.success("Filme salvo com sucesso!")
    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return (
        <div className='filme-info'>
            <h1>{filmeId.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filmeId.backdrop_path}`} alt={filmeId.title} />
            <h3>Sinopse</h3>
            <span>{filmeId.overview}</span>
            <strong>Avanliação {filmeId.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filmeId.title} Trailer`} target='blank' reç="external">Trailer</a>
                </button>
            </div>
        </div>
    );
};
