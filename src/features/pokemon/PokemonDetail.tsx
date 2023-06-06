import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonById, selectPokemonDetail } from "../pokemon/pokemonSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";

function PokemonDetail() {
  const { pokemonId } = useParams();
  const dispatch = useAppDispatch();
  const pokemonDetail = useAppSelector(selectPokemonDetail);
  const fetchPokemonDetail = () => {
    dispatch(getPokemonById(Number(pokemonId)));
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemonDetail();
  }, []);

  return (
    <div>
      <img
        src={pokemonDetail.sprites.other.dream_world.front_default}
        alt={`${pokemonDetail.name}`}
      />
      <p>{pokemonDetail.name}</p>
      <p>{pokemonDetail.height}</p>
      <button onClick={() => navigate(-1)}>Back To The List</button>
    </div>
  );
}

export default PokemonDetail;
