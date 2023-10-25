
import axios from "axios";
import { baseURL } from "../services/api";
import { apiKey } from "../services/apiKey";

axios.defaults.baseURL = baseURL

const getNowPlaying = async () => {
    try {
        return await axios.get(`/movie/now_playing?api_key=${apiKey}&language=pt-BR`)
            .then(response => {
                return response
            })
            .catch(() => {
                console.log('erro')
            })
    } catch (err) {
        console.log(err);
    }
}

const getFilme = async (idFilme) => {
    try {
        return await axios.get(`/movie/${idFilme}?api_key=${apiKey}&language=pt-BR`)
            .then(response => {
                return response
            })
            .catch(() => {
                console.log('errr')
            })
    } catch (err) {
        console.log(err);
    }
}

export const ApiMovies = {
    getNowPlaying,
    getFilme
}