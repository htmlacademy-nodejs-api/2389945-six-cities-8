import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { OfferTypes } from '../../../const.js';
import { CityInfo } from '../../../const.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const images = getRandomItems<string>(this.mockData.previewImages).join(';');
    const city = getRandomItem(CityInfo);
    const type = getRandomItem([OfferTypes]);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const user = getRandomItem(this.mockData.users);
    const latitude = String(city.location.latitude);
    const longitude = String(city.location.longitude);

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title,
      description,
      postDate,
      city,
      images,
      type,
      rooms,
      guests,
      price,
      goods,
      user,
      latitude,
      longitude
    ].join('\t');
  }
}
