import { client } from '../db.js';

export const session = client.db('AuthTest').collection('session');
