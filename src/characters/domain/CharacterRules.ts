import { Character } from './Character';

export const isFavorite = (character: Character, favorites: Character[]): boolean => {
  return favorites.some(fav => fav.id === character.id);
};

export const filterCharacters = (characters: Character[], searchTerm: string): Character[] => {
  if (!searchTerm) return characters;
  return characters.filter(character => 
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}; 