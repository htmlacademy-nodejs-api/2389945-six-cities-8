import { Users } from './../../../../mocks/users.js';
import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType, User, Location, City } from '../../types/index.js';
import { CityInfo } from '../../../const.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  private validateRawData = (): void => {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  };

  private parseRawDataToOffers = (): Offer[] =>
    this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      premium,
      favorite,
      rating,
      type,
      rooms,
      guests,
      price,
      features,
      user,
      latitude,
      longitude
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: this.parseCity(city),
      previewImage,
      images: this.parseImages(images),
      premium,
      favorite,
      rating: Number(rating),
      type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
      rooms: Number(rooms),
      guests: Number(guests),
      price: Number(price),
      features: this.parseFeatures(features),
      user: this.parseUser(user),
      location: this.parseLocation(latitude, longitude)
    };
  }

  private parseFeatures = (featuresString: string): { name: string }[] =>
    featuresString.split(';').map((name) => ({ name }));

  private parseImages = (imagesString: string): { name: string }[] => imagesString.split(';').map((name) => ({ name }));

  private parseUser = (username: string): User => {
    const userIndex = Users.findIndex((user) => user.name === username);
    if (userIndex === -1) {
      throw new Error(`User "${username}" not found in mock data`);
    }
    return Users[userIndex];
  };

  private parseLocation = (latitude: string, longitude: string): Location =>
    ({ latitude: Number(latitude), longitude: Number(longitude) });

  private parseCity = (city: string): City => {
    const cityIndex = CityInfo.findIndex((cityInfo) => cityInfo.name === city);
    if (cityIndex === -1) {
      throw new Error(`City "${city}" not found in mock data`);
    }
    return CityInfo[cityIndex];
  };

  public read = (): void => {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  };

  public toArray = (): Offer[] => {
    this.validateRawData();
    return this.parseRawDataToOffers();
  };
}
