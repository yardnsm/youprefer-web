import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as gameActions } from '../../actions/game';
import { mask, unmask } from '../../utils/mask';
import generateRandomInteger from '../../utils/random';
import { isNumber } from '../../utils/validations';
import LocalPropTypes from '../../prop-types';

import {
  gameTitle,
} from '../../config/strings';

import Title from '../../components/Title';
import AdsenseAdContainer from '../../containers/AdsenseAdContainer';
import Wrapper from './components/Wrapper';
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

  fetchQuestionCount: () => { dispatch(gameActions.fetchQuestionCount()); },
  fetchQuestion: (id) => { dispatch(gameActions.fetchQuestion(id)); },

  incrementFirstOption: (question) => { dispatch(gameActions.incrementFirstOption(question)); },
  incrementSecondOption: (question) => { dispatch(gameActions.incrementSecondOption(question)); },

  removeCurrentQuestion: () => { dispatch(gameActions.removeCurrentQuestion()); },
});

/*
 * Just to be clear - we're relying in the history to swap questions. When the
 * user presses the 'back' or 'forward' buttons to switch question, we're only
 * changing the history state. Thanks to `react-router`, we can listen to
 * history events and decide what to do next.
 */

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    // (ノಠ益ಠ)ノ
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handlePrevQuestion = this.handlePrevQuestion.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.pushQuestionToHistory = this.pushQuestionToHistory.bind(this);
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
        goToNextQuestion,
      } = this.props;

      let { questionId } = match.params;

      questionId = unmask(questionId);

      if (hasPrev && prevQuestion.id === questionId) {
        goToPrevQuestion();
      } else if (hasNext && nextQuestion.id === questionId) {
        goToNextQuestion();
      }
    });

    // Nah.
    // document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillReceiveProps(nextProps) {
    const {
      match, history, questionCount, removeCurrentQuestion,
    } = this.props;

    // Check if question shouldn't be available
    if (nextProps.currentQuestion) {
      if (!nextProps.currentQuestion.payload.isAvailable) {
        removeCurrentQuestion();
        this.fetchRandomQuestion();
      }
    }

    // Check if we've got the question count
    if (questionCount !== nextProps.questionCount) {
      const { questionId } = match.params;

      // Check if valid number
      if (questionId) {
        if (isNumber(questionId) && unmask(questionId) <= nextProps.questionCount) {
          this.fetchQuestion(unmask(questionId));
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
    // document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  // ------------------------------------------------

  handleKeyDown(evt) {
    switch (evt.keyCode) {
      case 39: // left
        this.handlePrevQuestion();
        break;

      case 37: // right
        this.handleNextQuestion();
        break;

      default:
        break;
    }
  }

  pushQuestionToHistory(id) {
    const { history } = this.props;

    history.push(`/${mask(id)}`);
  }

  handlePrevQuestion() {
    const { prevQuestion, history } = this.props;

    if (prevQuestion) {
      history.goBack();
    }
  }

  handleNextQuestion() {
    const { nextQuestion, history } = this.props;

    if (nextQuestion) {
      history.goForward();
    } else {
      this.fetchRandomQuestion();
    }
  }

  // eslint-disable-next-line react/destructuring-assignment
  fetchRandomQuestion(questionCount = this.props.questionCount) {
    this.fetchQuestion(generateRandomInteger(0, questionCount));
  }

  fetchQuestion(id) {
    const { fetchQuestion } = this.props;

    this.pushQuestionToHistory(id);
    fetchQuestion(id);
  }

  // ------------------------------------------------

  render() {
    const {
      currentQuestion,
      hasPrev,
      incrementFirstOption,
      incrementSecondOption,
    } = this.props;

    return (
      <Wrapper>
        <Title>{gameTitle}</Title>

        {currentQuestion ? (
          <div>
            <QuestionContainer
              question={currentQuestion}
              handleFirstOptionSelect={() => incrementFirstOption(currentQuestion)}
              handleSecondOptionSelect={() => incrementSecondOption(currentQuestion)}
            />
            <NavigationButtons
              handlePrevClick={this.handlePrevQuestion}
              showPrev={hasPrev}
              handleNextClick={this.handleNextQuestion}
              showNext
            />
          </div>
        ) : (
          <LoadingQuestions />
        )}

        <AdsenseAdContainer />
      </Wrapper>
    );
  }
}

GamePage.propTypes = {
  questionCount: PropTypes.number,

  currentQuestion: LocalPropTypes.question,
  prevQuestion: LocalPropTypes.question,
  nextQuestion: LocalPropTypes.question,

  hasPrev: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,

  goToPrevQuestion: PropTypes.func.isRequired,
  goToNextQuestion: PropTypes.func.isRequired,
  fetchQuestionCount: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  incrementFirstOption: PropTypes.func.isRequired,
  incrementSecondOption: PropTypes.func.isRequired,
  removeCurrentQuestion: PropTypes.func.isRequired,

  // react-router shit
  history: PropTypes.shape({
    listen: PropTypes.func,
    push: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

GamePage.defaultProps = {
  questionCount: 0,
  currentQuestion: null,
  prevQuestion: null,
  nextQuestion: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
