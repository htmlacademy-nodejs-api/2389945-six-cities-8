import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
  getFixedRandomString,
} from '../../helpers/index.js';
import { OfferTypes, CityInfo, Rating } from '../../../const.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;

const MIN_ADULTS = 1;
const MAX_ADULTS = 10;

const IMAGES_COUNT = 6;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getFixedRandomString(
      this.mockData.previewImages,
      IMAGES_COUNT
    );
    const cityInfo = getRandomItem(CityInfo);
    const cityName = cityInfo.name;
    const isPremium = Boolean(generateRandomValue(0, 1)).toString();
    const isFavorite = Boolean(generateRandomValue(0, 1)).toString();
    const rating = generateRandomValue(Rating.Min, Rating.Max, 1).toString();
    const type = getRandomItem(Object.keys(OfferTypes));
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const user = getRandomItem(this.mockData.users);
    const latitude = String(cityInfo.location.latitude);
    const longitude = String(cityInfo.location.longitude);

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title,
      description,
      postDate,
      cityName,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      user,
      latitude,
      longitude,
    ].join('\t');
  }
}
