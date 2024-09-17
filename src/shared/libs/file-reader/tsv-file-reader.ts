import { Users } from './../../../../mocks/users.js';
import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType, User } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      name,
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
      user
    ] = line.split('\t');

    return {
      name,
      description,
      postDate: new Date(postDate),
      city,
      previewImage,
      images: this.parseImages(images),
      premium,
      favorite,
      rating: this.parseStringToNumber(rating),
      type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
      rooms: this.parseStringToNumber(rooms),
      guests: this.parseStringToNumber(guests),
      price: this.parseStringToNumber(price),
      features: this.parseFeatures(features),
      user: this.parseUser(user)
    };
  }

  private parseFeatures(featuresString: string): { name: string }[] {
    return featuresString.split(';').map((name) => ({ name }));
  }

  private parseImages(imagesString: string): { name: string }[] {
    return imagesString.split(';').map((name) => ({ name }));
  }

  private parseStringToNumber(value: string): number {
    return Number.parseInt(value, 10);
  }

  private parseUser(username: string): User {
    const userIndex = Users.findIndex((user) => user.name === username);
    if (userIndex === -1) {
      throw new Error(`User "${username}" not found in mock data`);
    }
    return Users[userIndex];
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
