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
});
