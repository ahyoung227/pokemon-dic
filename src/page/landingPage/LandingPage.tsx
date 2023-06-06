import { useEffect } from "react";
import PokemonList from "../../features/pokemon/PokemonList";
import { useAppSelector } from "../../app/hooks";

import {
  selectUserData,
  selectLoginSuccess
} from "../../features/auth/authSlice";

function LandingPage() {
  useEffect(() => {}, []);
  const loginSuccess = useAppSelector(selectLoginSuccess);
  const userData = useAppSelector(selectUserData);

  return (
    <div>
      <PokemonList />
    </div>
  );
}

export default LandingPage;
