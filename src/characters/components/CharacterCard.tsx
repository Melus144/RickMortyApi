import { Character } from '../domain/Character';
import { useCharacters } from '../../shared/context/CharactersContext';
import { isFavorite } from '../domain/CharacterRules';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useCharacters();
  const isFav = isFavorite(character, favorites);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={character.image} alt={character.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-gray-800 mb-2">{character.name}</div>
        <p className="text-gray-700 text-base">
          Status: {character.status}
        </p>
        <p className="text-gray-700 text-base">
          Species: {character.species}
        </p>
        <button
          onClick={handleFavoriteClick}
          className={`mt-4 px-4 py-2 rounded ${
            isFav
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isFav ? 'Remove Favorite' : 'Add Favorite'}
        </button>
      </div>
    </div>
  );
}; 