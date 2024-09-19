import { Users } from './../../../../mocks/users.js';
import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer, Image, User, Location, City, Goods } from '../../types/index.js';
import { CityInfo, OfferTypes } from '../../../const.js';

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
      isPremium,
      favorite,
      rating,
      type,
      rooms,
      guests,
      price,
      goods,
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
      isPremium,
      favorite,
      rating: Number(rating),
      type: OfferTypes[type as OfferTypes],
      rooms: Number(rooms),
      guests: Number(guests),
      price: Number(price),
      goods: this.parseGoods(goods),
      user: this.parseUser(user),
      location: this.parseLocation(latitude, longitude)
    };
  }

  private parseGoods = (goodsString: string): Goods[] =>
    goodsString.split(';').map((good) => good as Goods);

  private parseImages = (imagesString: string): Image[] =>
    imagesString.split(';').map((name) => ({ name }));

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
