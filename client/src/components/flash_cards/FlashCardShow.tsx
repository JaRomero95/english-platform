import React from 'react';
import FlashCard from 'models/FlashCard';
import styled from 'styled-components';

type FlashCardFace = {
  text: string | null;
  imgUrl: string | null;
};

interface Props {
  flashCard: FlashCard;
  onFlip: () => void;
}

interface State {
  cardFront: boolean;
}

class FlashCardShow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {cardFront: true};
  }

  getSelectedFace(): FlashCardFace {
    const flashCard = this.props.flashCard;
    const fieldPrefix = this.state.cardFront ? 'question_' : 'answer_';
    const text = flashCard[`${fieldPrefix}text`];
    const imgUrl = flashCard[`${fieldPrefix}img_url`];

    return {text, imgUrl};
  }

  flipCard = () => {
    this.props.onFlip();

    this.setState((state) => ({
      cardFront: !state.cardFront,
    }));
  };

  render() {
    const {text, imgUrl} = this.getSelectedFace();

    return (
      <CardContainer onClick={this.flipCard}>
        {imgUrl && <CardImage src={imgUrl} />}
        <CardText>{text}</CardText>
      </CardContainer>
    );
  }
}

const CardContainer = styled.div`
  background-color: #fff;
  position: relative;
  width: 100%;
  height: 300px;
  border: 1px solid #aaa;
  box-shadow: 5px 5px 5px #aaa;
  border-radius: 10px;
  text-align: center;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CardImage = styled.img`
  position: absolute;
  top: 3%;
  left: 2%;
  width: 96%;
  height: 94%;
  object-fit: contain;
  background-color: #fafafa;
  border-radius: 10px;
`;

const CardText = styled.span`
  position: relative;
  display: inline-block;
  font-size: 2em;
`;

export default FlashCardShow;
