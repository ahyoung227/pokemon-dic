import {
  selectAllPokemon,
  selectOffset,
  getAllPokemons,
  increaseOffset,
  Pokemon
} from "../pokemon/pokemonSlice";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
// import SearchFilter from "../../components/searchFilter";

const PAGE_LIMIT = 20;

export function PokemonList() {
  // const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const dispatch = useAppDispatch();
  const searchWord = "";
  const allPokemon = useAppSelector(selectAllPokemon);
  const offset = useAppSelector(selectOffset);
  console.log(offset);
  const fetchPokemonList = useCallback(async () => {
    const data = { offset: offset, limit: PAGE_LIMIT };
    await dispatch(getAllPokemons(data));
    //allPokemon을 바로 받아올 수 없음
    // setFilteredPokemons(store.getState().pokemon.allPokemons);
  }, [offset]);

  // const getfilteredPokemons = useCallback(
  //   (searchWord: string) => {
  //     let filteredData = allPokemon.filter((data) =>
  //       data.name.includes(searchWord)
  //     );
  //     setFilteredPokemons(filteredData);
  //   },
  //   [searchWord]
  // );

  const handleFetchMore = () => {
    dispatch(increaseOffset(PAGE_LIMIT));
  };

  useEffect(() => {
    fetchPokemonList();
    //getfilteredPokemons(searchWord);
  }, [searchWord, offset, fetchPokemonList]);

  const getPokemonId = (url: string) => {
    const str = url.split("/");
    return str[str.length - 2];
  };

  return (
    <div>
      {/* <SearchFilter refreshFunction={getfilteredPokemons} /> */}
      {allPokemon.map((data, idx) => (
        <Link key={`${data.name}+ ${idx}`} to={getPokemonId(data.url)}>
          <div>{data.name}</div>
        </Link>
      ))}
      <button onClick={handleFetchMore}>Fetch More</button>
    </div>
  );
}

export default React.memo(PokemonList);
