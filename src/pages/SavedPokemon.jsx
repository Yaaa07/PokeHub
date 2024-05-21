// src/pages/SavedPokemonPage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext'; // pastikan path ini benar

const SavedPokemonPage = () => {
    const { savedPokemon, removePokemon } = useContext(PokemonContext);

    return (
        <div className="container mx-auto p-4 flex flex-col gap-10 font-montserrat">
            <div className="flex items-center justify-between">
                <p className="text-4xl font-semibold">POKE<span className=' text-orange-500 text-4xl font-semibold  '>HUB</span></p>
                <div>
                <Link to="/" className="font-medium text-xl">Back <span className=' text-orange-500'>Home</span></Link>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedPokemon.map((pokemon, index) => (
                    <div key={index} className="pokemon-card border p-4 rounded shadow-lg bg-white hover:bg-gray-100 transition duration-300">
                        <img src={pokemon.image} alt={pokemon.name} className="w-full h-32 object-contain mb-4" />
                        <h3 className="text-lg font-bold capitalize">{pokemon.alias || pokemon.name}</h3>
                        <p><strong>Category:</strong> {pokemon.category}</p>
                        <p><strong>Weight:</strong> {pokemon.weight} kg</p>
                        <p><strong>Height:</strong> {pokemon.height} M</p>
                        <button
                            onClick={() => removePokemon(pokemon.name)}
                            className="bg-orange-700 text-white p-2 rounded w-full hover:bg-orange-800 transition duration-300 mt-7"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedPokemonPage;
