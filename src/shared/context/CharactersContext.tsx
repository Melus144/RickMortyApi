import { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from '../../characters/domain/Character';

interface CharactersContextType {
  characters: Character[];
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: number) => void;
}

const CharactersContext = createContext<CharactersContextType | undefined>(undefined);

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<Character[]>([]);

  const addFavorite = (character: Character) => {
    setFavorites(prev => [...prev, character]);
  };

  const removeFavorite = (characterId: number) => {
    setFavorites(prev => prev.filter(char => char.id !== characterId));
  };

  return (
    <CharactersContext.Provider value={{ characters, favorites, addFavorite, removeFavorite }}>
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharacters = () => {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharactersProvider');
  }
  return context;
}; 