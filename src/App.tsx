import "./styles.css";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import NotFound from "./page/NotFound";
import LandingPage from "./page/landingPage/LandingPage";
import PokemonDetail from "../src/features/pokemon/PokemonDetail";
import SignIn from "../src/features/auth/SignIn";
import { RequireAuth } from "../src/hoc/requireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/pokemon" element={RequireAuth(<LandingPage />)}></Route>
          <Route
            path="/pokemon/:pokemonId"
            element={RequireAuth(<PokemonDetail />)}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
