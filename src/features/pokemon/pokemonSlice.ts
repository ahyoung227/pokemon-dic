import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

interface PokemonState {
  allPokemons: Array<Pokemon>;
  pokemonDetail: PokemonDetail;
  offset: number;
  status: "idle" | "loading" | "failed";
}

interface PokemonDetail {
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  height: number;
}

export interface Pokemon {
  name: string;
  url: string;
}

const initialState: PokemonState = {
  allPokemons: [],
  pokemonDetail: {
    name: "",
    sprites: {
      other: {
        dream_world: {
          front_default: ""
        }
      }
    },
    height: 0
  },
  offset: 0,
  status: "idle"
};

export const getAllPokemons = createAsyncThunk(
  "pokemon/getAllPokemon",
  async (data: { offset: number; limit: number }) => {
    const { offset, limit } = data;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      //sending a jwt token to the backend
      {
        headers: {
          Authorization: localStorage.getItem("access-token") || ""
        }
      }
    );
    return response.data.results;
  }
);

export const getPokemonById = createAsyncThunk(
  "pokemon/getPokemonById",
  async (id: number) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      //sending a jwt token to the backend
      {
        headers: {
          Authorization: localStorage.getItem("access-token") || ""
        }
      }
    );
    return response.data;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    increaseOffset: (state, action) => {
      state.offset += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPokemons.fulfilled, (state, action) => {
      state.allPokemons = [...state.allPokemons, ...action.payload];
      state.status = "idle";
    });
    builder.addCase(getAllPokemons.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllPokemons.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getPokemonById.fulfilled, (state, action) => {
      const data = action.payload;
      state.pokemonDetail = data;
      state.status = "idle";
    });
    builder.addCase(getPokemonById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getPokemonById.rejected, (state) => {
      state.status = "failed";
    });
  }
});

export const { increaseOffset } = pokemonSlice.actions;
export const selectAllPokemon = (state: RootState) => state.pokemon.allPokemons;
export const selectPokemonDetail = (state: RootState) =>
  state.pokemon.pokemonDetail;
export const selectOffset = (state: RootState) => state.pokemon.offset;
export default pokemonSlice.reducer;
