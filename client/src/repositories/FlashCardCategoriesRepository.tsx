import FlashCardCategory from 'models/FlashCardCategory';
import BaseRepository from './BaseRepository';

export default class FlashCardCategoriesRepository extends BaseRepository<FlashCardCategory> {
  baseUrl = 'flash_card_categories';
}
