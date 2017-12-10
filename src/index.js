import axios from 'axios';

import { BASE_URL } from './constants';

class MovesClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.httpClient = axios.create({
      baseURL: BASE_URL,
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  async getActivities() {
    return this.httpClient({
      method: 'get',
      url: '/activities',
    }).then(response => response.data);
  }
}

export default MovesClient;
