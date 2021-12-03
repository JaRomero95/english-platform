import BaseRepository from './BaseRepository';

interface Session {
  email: string;
  password: string;
  token?: string; // FIXME: can not override Session typing for create action return type
}

export default class SessionsRepository extends BaseRepository<Session> {
  baseUrl = 'sessions';
}
