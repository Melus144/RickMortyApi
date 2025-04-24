import { Character } from '../domain/Character';
import { CharacterCard } from './CharacterCard';
import { Spinner } from '../../shared/components/Spinner';
import { ErrorBox } from '../../shared/components/ErrorBox';

interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export const CharacterList = ({ characters, loading, error }: CharacterListProps) => {
  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  if (characters.length === 0) return <div>No characters found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}; 