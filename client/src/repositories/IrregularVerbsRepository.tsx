import IrregularVerb from 'models/IrregularVerb';
import BaseRepository from './BaseRepository';

export default class IrregularVerbsRepository extends BaseRepository<IrregularVerb> {
  baseUrl = 'irregular_verbs';
}
