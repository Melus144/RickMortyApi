import { Character } from '../domain/Character';

const API_URL = 'https://rickandmortyapi.com/api/character';

export class CharacterService {
  static async getAllCharacters(): Promise<Character[]> {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
  }

  static async getCharacterById(id: number): Promise<Character> {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  }
} 