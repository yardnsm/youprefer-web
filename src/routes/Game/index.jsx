import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import { actions as gameActions } from '../../actions/game';
import styles from './styles';
import { encode, decode } from '../../utils/encode';
import { generateRandomInteger } from '../../utils/random';

import LoadingQuestions from './components/LoadingQuestions';
import NavigationButtons from './components/NavigationButtons';
import QuestionContainer from './containers/QuestionContainer';

const mapStateToProps = ({ game: { questions } }) => ({
  questionCount: questions.count,
  currentQuestion: questions.current,

  prevQuestion: questions.prev.slice(-1)[0],
  nextQuestion: questions.next[0],

  hasPrev: !!questions.prev.length,
  hasNext: !!questions.next.length,
});

const mapDispatchToProps = dispatch => ({
  goToPrevQuestion: () => { dispatch(gameActions.prevQuestion()); },
  goToNextQuestion: () => { dispatch(gameActions.nextQuestion()); },

  fetchQuestionCount: () => { dispatch(gameActions.fetchQuestionCount()) },
  fetchQuestion: (id) => { dispatch(gameActions.fetchQuestion(id)); },

  incrementFirstOption: (question) => { dispatch(gameActions.incrementFirstOption(question)); },
  incrementSecondOption: (question) => { dispatch(gameActions.incrementSecondOption(question)); },
});

class GamePage extends React.Component {
  constructor() {
    super();

    this.handlePrevQuestion = this.handlePrevQuestion.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleHistoryUpdate = this.handleHistoryUpdate.bind(this);
    this.fetchRandomQuestion = this.fetchRandomQuestion.bind(this);
    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  componentDidMount() {
    const { history, fetchQuestionCount } = this.props;

    fetchQuestionCount();

    this.unlistenForHistory = history.listen((location, action) => {
      if (action === 'PUSH') {
        return;
      }

      const {
        match,
        hasPrev,
        hasNext,
        prevQuestion,
        nextQuestion,
        goToPrevQuestion,
        goToNextQuestion
      } = this.props;

      let { questionId } = match.params;

      questionId = decode(parseInt(questionId, 10));

      if (hasPrev && prevQuestion.id === questionId) {
        goToPrevQuestion();
      } else if (hasNext && nextQuestion.id === questionId) {
        goToNextQuestion();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { match, history, questionCount } = this.props;

    if (questionCount !== nextProps.questionCount) {
      const { questionId } = match.params;
      if (questionId) {
        if (/^(\d)+$/.test(questionId)) {
          this.fetchQuestion(decode(parseInt(questionId, 10)));
        } else {
          history.push('not-found');
        }
      } else {
        this.fetchRandomQuestion(nextProps.questionCount);
      }
    }
  }

  componentWillUnmount() {
    this.unlistenForHistory();
  }

  handlePrevQuestion() {
    const { prevQuestion, goToPrevQuestion } = this.props;

    this.handleHistoryUpdate(prevQuestion.id);
    goToPrevQuestion();
  }

  handleNextQuestion() {
    const { nextQuestion, goToNextQuestion } = this.props;

    this.handleHistoryUpdate(nextQuestion.id);
    goToNextQuestion();
  }

  handleHistoryUpdate(id) {
    this.props.history.push(`/${encode(id)}`);
  }

  fetchRandomQuestion(questionCount = this.props.questionCount) {
    this.fetchQuestion(generateRandomInteger(0, questionCount));
  }

  fetchQuestion(id) {
    this.props.fetchQuestion(id);
    this.handleHistoryUpdate(id);
  }

  render() {
    const {
      classes,
      currentQuestion,
      hasPrev,
      hasNext,
      incrementFirstOption,
      incrementSecondOption,
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <h2 className={classes.title}>מה אתה מעדיף?</h2>

        {currentQuestion ?

          <QuestionContainer
            question={currentQuestion}
            handleFirstOptionSelect={() => incrementFirstOption(currentQuestion)}
            handleSecondOptionSelect={() => incrementSecondOption(currentQuestion)}
          /> :
          <LoadingQuestions />}

        <NavigationButtons
          handlePrevClick={this.handlePrevQuestion}
          showPrev={hasPrev}
          handleNextClick={hasNext ? this.handleNextQuestion : () => { this.fetchRandomQuestion() }}
          showNext
        />
      </div>
    );
  }
}

GamePage.propTypes = {
  currentQuestion: PropTypes.object,
  hasPrev: PropTypes.bool,
  hasNext: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(GamePage),
);
