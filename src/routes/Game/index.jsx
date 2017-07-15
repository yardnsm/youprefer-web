import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as gameActions } from '../../actions/game';
import { encode, decode } from '../../utils/encode';
import generateRandomInteger from '../../utils/random';

import Title from './components/Title';
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
});

/*
 * Just to be clear - we're relying in the history to swap
 * questions. When the user presses the 'back' or 'forward'
 * buttons to switch question, we're only changing the
 * history state. Thanks to `react-router`, we can listen
 * to history events and decide what to do next.
 */

class GamePage extends React.Component {
  constructor() {
    super();

    // (ノಠ益ಠ)ノ
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

    // Check if we've got the question count
    if (questionCount !== nextProps.questionCount) {
      const { questionId } = match.params;

      // Check if valid number
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

  // ------------------------------------------------

  pushQuestionToHistory(id) {
    this.props.history.push(`/${encode(id)}`);
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

  fetchRandomQuestion(questionCount = this.props.questionCount) {
    this.fetchQuestion(generateRandomInteger(0, questionCount));
  }

  fetchQuestion(id) {
    this.props.fetchQuestion(id);
    this.pushQuestionToHistory(id);
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
        <Title>מה אתה מעדיף?</Title>

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
          handleNextClick={this.handleNextQuestion}
          showNext
        />
      </Wrapper>
    );
  }
}

GamePage.propTypes = {
  questionCount: PropTypes.number.isRequired,
  currentQuestion: PropTypes.object.isRequired,
  prevQuestion: PropTypes.object.isRequired,
  nextQuestion: PropTypes.object.isRequired,
  hasPrev: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,

  goToPrevQuestion: PropTypes.func.isRequired,
  goToNextQuestion: PropTypes.func.isRequired,
  fetchQuestionCount: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  incrementFirstOption: PropTypes.func.isRequired,
  incrementSecondOption: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
