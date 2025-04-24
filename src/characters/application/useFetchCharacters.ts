import { useState, useEffect } from 'react';
import { Character } from '../domain/Character';
import { CharacterService } from '../services/CharacterService';
import { CharacterAdapter } from '../adapters/CharacterAdapter';

export const useFetchCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await CharacterService.getAllCharacters();
        const adaptedCharacters = data.map(CharacterAdapter.toDomain);
        setCharacters(adaptedCharacters);
      } catch (err) {
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
}; 