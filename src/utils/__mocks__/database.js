export const fetchQuestionCount = () => Promise.resolve(100);

export const fetchSingleQuestion = () => Promise.resolve({
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
});

export const incrementQuestionVotes = () => Promise.resolve();
