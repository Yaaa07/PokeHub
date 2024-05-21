import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../src/pages/Homepage';
import SavedPokemonPage from '../src/pages/SavedPokemon';
import { PokemonProvider } from '../src/context/PokemonContext';

const App = () => {
  return (
    <PokemonProvider>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/saved" element={<SavedPokemonPage/>}/>
          </Routes>
      </Router>
    </PokemonProvider>
  );
};

export default App;
