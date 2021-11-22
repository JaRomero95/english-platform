import FlashCard from 'models/FlashCard';
import BaseRepository from './BaseRepository';

export default class FlashCardsRepository extends BaseRepository<FlashCard> {
  baseUrl = 'flash_cards';
}
