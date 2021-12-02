import React from 'react';
import FlashCard from 'models/FlashCard';
import styled from 'styled-components';

type FlashCardFace = {
  text: string | null;
  imgUrl: string | null;
};

interface Props {
  flashCard: FlashCard;
  onFlip?: () => void;
}

interface State {
  flipped: boolean;
}

class FlashCardShow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {flipped: false};
  }

  flipCard = () => {
    const {onFlip} = this.props;

    onFlip && onFlip();

    this.setState((state) => ({
      flipped: !state.flipped,
    }));
  };

  renderCard({text, imgUrl}: FlashCardFace) {
    const alternativeTextClass = imgUrl ? 'alternative-text' : '';

    return (
      <CardContainer onClick={this.flipCard}>
        {imgUrl && <CardImage src={imgUrl} />}
        {text && <CardText className={alternativeTextClass}>{text}</CardText>}
      </CardContainer>
    );
  }

  render() {
    const {
      props: {flashCard},
      state: {flipped},
    } = this;

    const frontCard = {
      text: flashCard.question_text,
      imgUrl: flashCard.question_img_url,
    };

    const backCard = {
      text: flashCard.answer_text,
      imgUrl: flashCard.answer_img_url,
    };

    const containerClass = flipped ? 'flipped' : '';

    return (
      <FlipCardContainer className={containerClass}>
        {this.renderCard(frontCard)}
        {this.renderCard(backCard)}
      </FlipCardContainer>
    );
  }
}

const FlipCardContainer = styled.div`
  position: relative;
  transition: transform 0.3s;
  transform-style: preserve-3d;
  width: 320px;
  height: 320px;
  margin: 0 auto;

  &.flipped {
    transform: rotateY(180deg);
  }
`;

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fff;
  border: 1px solid #aaa;
  box-shadow: 5px 5px 5px #aaa;
  border-radius: 10px;
  text-align: center;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  backface-visibility: hidden;
  perspective: 1000px;

  &:last-child {
    transform: rotateY(180deg);
  }
`;

const CardImage = styled.img`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  object-fit: cover;
  background-color: #fafafa;
  border-radius: 10px;
`;

const CardText = styled.span`
  position: relative;
  display: inline-block;
  font-size: 2em;

  &.alternative-text {
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 0 0.5rem;
    border-radius: 10px;
  }
`;

export default FlashCardShow;
