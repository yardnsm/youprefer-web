import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import injectSheet from 'jss-inject-sheet';
import { actions as gameActions } from '../../actions/game';
import styles from './styles';

import LoadingQuestions from './components/LoadingQuestions';
import NavigationButtons from './components/NavigationButtons';
import QuestionContainer from './containers/QuestionContainer';

const mapStateToProps = ({ game: { questions } }) => ({
  currentQuestion: questions.current,
  hasPrev: !!questions.prev.length,
  hasNext: !!questions.next.length,
});

const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => { dispatch(gameActions.fetchQuestion(id)) },
  nextQuestion: () => { dispatch(gameActions.nextQuestion()) },
  prevQuestion: () => { dispatch(gameActions.prevQuestion()) },
  incrementOptionVotes: (option, question) => {
    dispatch(gameActions.incrementOptionVotes(option, question))
  },
});

const getRandomNumber = () => Math.round(Math.random() * 392);

class GamePage extends React.Component {
  constructor() {
    super();

    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.match;
    if (params.qid) {
      this.fetchQuestion(parseInt(params.qid));
    } else {
      this.fetchQuestion(getRandomNumber());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      console.log('location changed!');
    }
  }

  fetchQuestion(id) {
    this.props.fetchQuestion(id);
    this.props.history.push(`/${id}`);
  }

  render() {

    const {
      classes,
      currentQuestion,
      hasPrev,
      hasNext,
      fetchQuestion,
      incrementOptionVotes,
      nextQuestion,
      prevQuestion
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <h2 className={classes.title}>מה אתה מעדיף?</h2>

        {currentQuestion ?

          <QuestionContainer
            question={currentQuestion}
            handleFirstOptionSelect={() => incrementOptionVotes('first', currentQuestion)}
            handleSecondOptionSelect={() => incrementOptionVotes('second', currentQuestion)} /> :
          <LoadingQuestions />}

        <NavigationButtons
          handlePrevClick={prevQuestion}
          showPrev={hasPrev}
          handleNextClick={hasNext ? nextQuestion : () => this.fetchQuestion(getRandomNumber())}
          showNext={true} />
      </div>
    );
  }
}

GamePage.propTypes = {
  currentQuestion: PropTypes.object,
  hasPrev: PropTypes.bool,
  hasNext: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(GamePage)
);
