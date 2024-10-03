import { City } from './shared/types/index.js';

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum OfferTypes {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel',
}

export const CityInfo: City[] = [
  { name: Cities.Paris, location: { latitude: 48.85661, longitude: 2.351499 } },
  {
    name: Cities.Cologne,
    location: { latitude: 50.938361, longitude: 6.959974 },
  },
  {
    name: Cities.Brussels,
    location: { latitude: 50.846557, longitude: 4.351697 },
  },
  {
    name: Cities.Amsterdam,
    location: { latitude: 52.370216, longitude: 4.895168 },
  },
  {
    name: Cities.Hamburg,
    location: { latitude: 53.550341, longitude: 10.000654 },
  },
  {
    name: Cities.Dusseldorf,
    location: { latitude: 51.225402, longitude: 6.776314 },
  },
];
