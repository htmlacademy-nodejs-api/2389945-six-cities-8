import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { Users } from './../../../../mocks/users.js';
import { FileReader } from './file-reader.interface.js';
import {
  Offer,
  User,
  Location,
  City,
  Goods,
} from '../../types/index.js';
import { CityInfo, OfferTypes } from '../../../const.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      goods,
      user,
      latitude,
      longitude,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: this.parseCity(city),
      previewImage,
      images: this.parseImages(images),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rating: Number(rating),
      type: OfferTypes[type as OfferTypes],
      rooms: Number(rooms),
      guests: Number(guests),
      price: Number(price),
      goods: this.parseGoods(goods),
      user: this.parseUser(user),
      location: this.parseLocation(latitude, longitude),
    };
  }

  private parseGoods = (goodsString: string): Goods[] =>
    goodsString.split(';').map((good) => good as Goods);

  private parseImages = (imagesString: string): string[] =>
    imagesString.split(';');

  private parseUser = (username: string): User => {
    const userIndex = Users.findIndex((user) => user.name === username);
    if (userIndex === -1) {
      throw new Error(`User "${username}" not found in mock data`);
    }
    return Users[userIndex];
  };

  private parseLocation = (latitude: string, longitude: string): Location => ({
    latitude: Number(latitude),
    longitude: Number(longitude),
  });

  private parseCity = (city: string): City => {
    const cityIndex = CityInfo.findIndex((cityInfo) => cityInfo.name === city);
    if (cityIndex === -1) {
      throw new Error(`City "${city}" not found in mock data`);
    }
    return CityInfo[cityIndex];
  };

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
