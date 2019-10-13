import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withRipple from '../../hoc/withRipple';

const Wrapper = withRipple(styled.a`
  margin: 0 auto;
  padding: 0.5px 0;

  text-decoration: none;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 120px;
  height: 120px;
  border-radius: 50%;
`);

const Icon = styled.div`
  width: 3em;
  height: 3em;

  border-radius: 50%;
  margin-bottom: 10px;

  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.25);

  background-color: ${props => props.color};
  background-image: linear-gradient(to bottom left, transparent, rgba(0, 0, 0, 0.2));

  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 1.5em;
    height 1.5em;
  }
`;

const Text = styled.h3`
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
`;

const ShareButton = ({
  color, text, iconUrl, onClick,
}) => (
  <Wrapper onClick={onClick}>

    <Icon color={color} iconUrl={iconUrl}>
      <img src={iconUrl} alt={text} />
    </Icon>

    <Text>{text}</Text>
  </Wrapper>
);

ShareButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ShareButton.defaultProps = {
  onClick: () => {},
  color: '#222222',
};

export default ShareButton;
