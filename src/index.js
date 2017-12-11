import axios from 'axios';

class MovesClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.httpClient = axios.create({
      baseURL: 'https://api.moves-app.com/api/1.1',
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  /*
  https://dev.moves-app.com/docs/api_activities
  */

  async getActivities() {
    return this.httpClient({
      method: 'get',
      url: '/activities',
    }).then(response => response.data);
  }

  /*
  https://dev.moves-app.com/docs/api_profile
  */

  async getUserProfile() {
    return this.httpClient({
      method: 'get',
      url: '/user/profile',
    }).then(response => response.data);
  }

  /*
  https://dev.moves-app.com/docs/api_summaries

  date in yyyyMMdd or yyyy-MM-dd format
  week in yyyy-’W’ww format, for example 2013-W09
  month in yyyyMM or yyyy-MM format

  updatedSince: if true, return only days which data has been updated since
                given timestamp in ISO 8601 (yyyyMMdd’T’HHmmssZ) format
  timeZone: use the given time zone ID for the date period and timestamps,
            overriding the users current time zone
  */

  async getDailySummary(calendarInterval, updatedSince = null, timeZone = null) {
    return this.httpClient({
      method: 'get',
      url: `/user/summary/daily/${calendarInterval}`,
      params: {
        updatedSince,
        timeZone,
      },
    }).then(response => response.data);
  }

  async getDailySummaryForDate(date, updatedSince = null, timeZone = null) {
    return this.getDailySummary(date, updatedSince, timeZone);
  }

  async getDailySummaryForWeek(week, updatedSince = null, timeZone = null) {
    return this.getDailySummary(week, updatedSince, timeZone);
  }

  async getDailySummaryForMonth(month, updatedSince = null, timeZone = null) {
    return this.getDailySummary(month, updatedSince, timeZone);
  }

  async getDailySummaryForDateRange(startDate, endDate, updatedSince = null, timeZone = null) {
    return this.httpClient({
      method: 'get',
      url: '/user/summary/daily',
      params: {
        from: startDate,
        to: endDate,
        updatedSince,
        timeZone,
      },
    }).then(response => response.data);
  }

  async getPastDailySummaries(previousDaysCount, updatedSince = null, timeZone = null) {
    return this.httpClient({
      method: 'get',
      url: '/user/summary/daily',
      params: {
        pastDays: previousDaysCount,
        updatedSince,
        timeZone,
      },
    }).then(response => response.data);
  }
}

export default MovesClient;
