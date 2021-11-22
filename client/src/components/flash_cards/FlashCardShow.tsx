import FlashCard from 'models/FlashCard';
import React from 'react';

type FlashCardFace = {
  text: string | null;
  imgUrl: string | null;
};

interface Props {
  flashCard: FlashCard;
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
    this.setState((state) => ({
      cardFront: !state.cardFront,
    }));
  };

  render() {
    const {text, imgUrl} = this.getSelectedFace();

    return (
      <div>
        <h4>Flash Card</h4>

        <div
          onClick={this.flipCard}
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: 'cover',
            width: '300px',
            height: '300px',
            border: '1px solid black',
            borderRadius: '10px',
            verticalAlign: 'center',
            textAlign: 'center',
          }}
        >
          <span>{text}</span>
        </div>
      </div>
    );
  }
}

export default FlashCardShow;
