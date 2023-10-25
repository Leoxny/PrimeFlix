import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./pages/Home";
import { FilmeScreen } from "./pages/Filme";
import { Header } from "./components/Header";
import { ErroScreen } from "./pages/Erro";
import { FavoritosScreen } from "./pages/Favoritos";

export const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/filme/:id" element={<FilmeScreen />} />
                <Route path="/favoritos" element={<FavoritosScreen />} />

                <Route path="*" element={<ErroScreen />} />
            </Routes>
        </BrowserRouter>
    )
}