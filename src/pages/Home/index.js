
import React, { useEffect, useState } from 'react'
import { ApiMovies } from '../../api/ApiMovies'
import { Link } from 'react-router-dom';
import './home.css'

export const HomeScreen = () => {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadFilmes();
    }, [])

    const loadFilmes = async () => {
        try {

            const response = await ApiMovies.getNowPlaying()

            setFilmes(response.data.results.slice(0, 10))
            setLoading(false);

        } catch (err) {
            console.log('ERROR_load_filmes', err)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }
    return (
        <div className='container'>

            <div className='lista-filmes'>
                {filmes.map((item) => {
                    return (
                        <article key={item.id}>
                            <strong>{item.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                            <Link to={`/filme/${item.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>

        </div>

    )
}