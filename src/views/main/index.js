import React, { Component } from 'react';
import { connect } from 'react-redux';
import lemons from 'assets/img/lemons.png';
import lemonade from 'assets/img/lemonade.png';
import { clickButton, resetState } from './actions';
import {
  Button,
  Container,
  ImgContainer,
  InstructionsContainer,
  Title
} from './styles';

class Main extends Component {
  state = {
    img: lemons
  };

  componentDidMount() {
    this.props.resetState();
  }

  render() {
    const {
      clickButton,
      main: { buttonClick }
    } = this.props;

    return (
      <Container>
        <InstructionsContainer>
          <Title>When life gives you lemons...</Title>
          <Button onClick={() => clickButton()}>Make lemonade!</Button>
        </InstructionsContainer>
        <ImgContainer>
          <img src={buttonClick ? lemonade : lemons} alt="" width="200px" />
        </ImgContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  main: state.main
});

const mapDispatchToProps = {
  clickButton,
  resetState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
