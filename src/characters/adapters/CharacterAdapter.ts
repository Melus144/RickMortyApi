import { Character } from '../domain/Character';

export class CharacterAdapter {
  static toDomain(apiData: any): Character {
    return {
      id: apiData.id,
      name: apiData.name,
      species: apiData.species,
      status: apiData.status,
      image: apiData.image,
      url: apiData.url,
    };
  }
} 