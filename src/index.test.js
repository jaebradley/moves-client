import MovesClient from './index';

describe('Moves Client Integration Test', () => {
  const client = new MovesClient(process.env.ACCESS_TOKEN);

  describe('#getActivities', () => {
    it('should return activities', async () => {
      const activities = await client.getActivities();
      expect(activities).not.toBeUndefined();
      // This value may change in the future
      expect(activities.length).toEqual(88);

      const firstActivity = activities[0];
      expect(firstActivity).toEqual({
        activity: 'aerobics',
        geo: false,
        place: true,
        color: 'bc4fff',
        units: 'duration,calories',
      });
    });
  });

  describe('#getUserProfile', () => {
    it('should return user profile', async () => {
      const userProfile = await client.getUserProfile();
      expect(userProfile).not.toBeUndefined();
      // Sanity check - nothing terribly revealing here...I think?
      expect(userProfile.profile).toEqual({
        firstDate: '20170217',
        currentTimeZone: { id: 'America/New_York', offset: -18000 },
        localization: {
          language: 'en-US',
          locale: 'en_US',
          firstWeekDay: 1,
          metric: false,
        },
        caloriesAvailable: false,
        platform: 'ios',
      });
    });
  });

  describe('#getDailySummaryForDate', () => {
    it('should return daily summary for date', async () => {
      const date = new Date('June 1, 2017').toISOString().substring(0, 10);
      const summary = await client.getDailySummaryForDate(date);
      expect(summary).not.toBeUndefined();
      expect(summary.length).toEqual(1);
    });
  });

  describe('#getDailySummaryForWeek', () => {
    it('should return daily summary for week', async () => {
      const summary = await client.getDailySummaryForWeek('2017-W20');
      expect(summary).not.toBeUndefined();
      expect(summary.length).toEqual(7);
    });
  });

  describe('#getDailySummaryForMonth', () => {
    it('should return daily summary for month', async () => {
      const summary = await client.getDailySummaryForMonth('2017-06');
      expect(summary).not.toBeUndefined();
      expect(summary.length).toEqual(30);
    });

    it('should throw for invalid month', async () => {
      try {
        await client.getDailySummaryForMonth('foobar');
      } catch (e) {
        expect(e).not.toBeUndefined();
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('Request failed with status code 400');
      }
    });
  });

  describe('#getDailySummaryForDateRange', () => {
    it('should return daily summary for date range', async () => {
      const summary = await client.getDailySummaryForDateRange('2017-06-01', '2017-06-30');
      expect(summary).not.toBeUndefined();
      expect(summary.length).toEqual(30);
    });
  });

  describe('#getPastDailySummaries', () => {
    it('should return daily summary for past days', async () => {
      const summary = await client.getPastDailySummaries(10);
      expect(summary).not.toBeUndefined();
      expect(summary.length).toEqual(10);
    });
  });
});
