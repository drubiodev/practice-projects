import { client } from '../db.js';

export const user = client.db('AuthTest').collection('user');
