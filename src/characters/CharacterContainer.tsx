import { useFetchCharacters } from './application/useFetchCharacters';
import { CharacterList } from './components/CharacterList';
import { CharactersProvider } from '../shared/context/CharactersContext';

export const CharacterContainer = () => {
  const { characters, loading, error } = useFetchCharacters();

  return (
    <CharactersProvider>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 my-8">Rick and Morty Characters</h1>
        <CharacterList characters={characters} loading={loading} error={error} />
      </div>
    </CharactersProvider>
  );
}; 