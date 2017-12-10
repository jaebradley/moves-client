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
});
