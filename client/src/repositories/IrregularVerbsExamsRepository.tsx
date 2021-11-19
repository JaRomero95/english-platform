import IrregularVerbResult from 'models/IrregularVerbResult';
import BaseRepository from './BaseRepository';

type IrregularVerbExam = IrregularVerbResult[];

export default class IrregularVerbsExamsRepository extends BaseRepository<IrregularVerbExam> {
  baseUrl = 'irregular_verbs_exams';
}
