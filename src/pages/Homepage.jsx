// src/pages/HomePage.jsx
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PokemonContext } from '../context/PokemonContext';

const HomePage = () => {
    const { pokemonList, setPokemonList, searchTerm, setSearchTerm, savePokemon } = useContext(PokemonContext);
    const [alias, setAlias] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [currentPokemon, setCurrentPokemon] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
                const pokemonResults = response.data.results;
                const pokemonDetailsPromises = pokemonResults.map(pokemon =>
                    axios.get(pokemon.url)
                );
                Promise.all(pokemonDetailsPromises)
                    .then(pokemonDetailsResponses => {
                        const detailedPokemonList = pokemonDetailsResponses.map(pokemonDetailResponse => {
                            const pokemonData = pokemonDetailResponse.data;
                            return {
                                name: pokemonData.name,
                                image: pokemonData.sprites.front_default,
                                category: pokemonData.types.map(type => type.type.name).join(', '),
                                weight: pokemonData.weight,
                                height: pokemonData.height,
                            };
                        });
                        setPokemonList(detailedPokemonList);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setPokemonList]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleAliasChange = (event, pokemonName) => {
        setAlias({ ...alias, [pokemonName]: event.target.value });
    };

    const handleSave = (pokemon) => {
        setCurrentPokemon(pokemon);
        setShowModal(true);
    };

    const handleConfirmSave = () => {
        savePokemon(currentPokemon, alias[currentPokemon.name] || '');
        setShowModal(false);
    };

    const filteredPokemon = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className=" font-montserrat flex flex-col gap-5">
            <div className='sticky top-0 backdrop-blur-sm pb-3 px-7 shadow-lg w-full pt-4'>
                <div className="flex items-center justify-between">
                <p className="text-4xl font-semibold">POKE<span className=' text-orange-500 text-4xl font-semibold'>HUB</span></p>
                    <div>
                        <Link to="/saved" className="font-medium text-xl sm:flex-col items-center max-sm:text-orange-500">Saved<span className=' text-orange-500 max-sm:hidden'>Pokemon</span></Link>
                    </div>
                </div>
                <input
                    type="search"
                    placeholder="Search Pokemon by name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className=" p-3 border focus:border-none  border-gray-700 rounded w-full"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-8 px-10">
                {filteredPokemon.map((pokemon, index) => (
                    <div key={index} className="pokemon-card border border-gray-600 transition-all p-4 rounded shadow-xl bg-white hover:bg-gray-50 hover:shadow-2xl  duration-300">
                        <img src={pokemon.image} alt={pokemon.name} className="w-full h-48 object-contain mb-4" />
                        <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
                        <p><strong>Category:</strong> {pokemon.category}</p>
                        <p><strong>Weight:</strong> {pokemon.weight} kg</p>
                        <p><strong>Height:</strong> {pokemon.height} m</p>
                        <button
                            onClick={() => handleSave(pokemon)}
                            className="bg-orange-500 text-white p-2 rounded w-full hover:bg-orange-700 transition duration-300 mt-6"
                        >
                            Save Pokemon
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-white w-96 p-4 rounded shadow-lg text-center">
                            <h2 className="text-xl font-bold mb-4">Please enter an alias for {currentPokemon.name}</h2>
                            <input
                                type="text"
                                placeholder="Alias"
                                value={alias[currentPokemon.name] || ''}
                                onChange={(e) => handleAliasChange(e, currentPokemon.name)}
                                className="mb-2 p-2 border border-gray-700 rounded w-full"
                            />
                            <button
                                onClick={handleConfirmSave}
                                className="bg-orange-500 text-white p-2 rounded w-full hover:bg-orange-700 transition duration-300 mt-6"
                            >
                                Save Pokemon
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white p-2 rounded mt-2 w-full hover:bg-gray-700 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
