// src/contexts/PokemonContext.js
import React, { createContext, useState } from 'react';

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [savedPokemon, setSavedPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const savePokemon = (pokemon, alias) => {
        setSavedPokemon([...savedPokemon, { ...pokemon, alias }]);
    };

    const removePokemon = (pokemonName) => {
        setSavedPokemon(savedPokemon.filter(p => p.name !== pokemonName));
    };

    return (
        <PokemonContext.Provider value={{
            pokemonList,
            setPokemonList,
            savedPokemon,
            setSavedPokemon,
            searchTerm,
            setSearchTerm,
            savePokemon,
            removePokemon
        }}>
            {children}
        </PokemonContext.Provider>
    );
};

export { PokemonContext, PokemonProvider, };
