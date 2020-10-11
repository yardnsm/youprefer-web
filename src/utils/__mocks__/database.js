/* eslint-disable class-methods-use-this */

class DatabaseMock {
  async getQuestionsCount() {
    return 100;
  }

  async getQuestion() {
    return {
      firstOption: {
        value: 'First option',
        votes: 100,
        initialVotesValue: 50,
      },
      secondOption: {
        value: 'Second option',
        votes: 100,
        initialVotesValue: 50,
      },
      isAvailable: true,
      isSkippable: false,
      totalSkips: 25,
    };
  }

  async incrementVotes() {
    return undefined;
  }
}

export default new DatabaseMock();
