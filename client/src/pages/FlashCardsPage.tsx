import FlashCard from 'models/FlashCard';
import React from 'react';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardShow from 'components/flash_cards/FlashCardShow';
import AppPageTitle from 'components/AppPageTitle';

interface Props {}

interface State {
  flashCards: FlashCard[];
  currentFlashCardIndex: number;
  counted: boolean;
}

class FlashCardsPage extends React.Component<Props, State> {
  private repository = new FlashCardsRepository();

  constructor(props: Props) {
    super(props);

    this.state = {flashCards: [], currentFlashCardIndex: 0, counted: false};
  }

  componentDidMount() {
    this.getFlashCards();
  }

  componentDidUpdate() {
    const {currentFlashCardIndex} = this.state;

    if (!currentFlashCardIndex || this.getCurrentFlashCard()) {
      return;
    }

    this.getFlashCards();
  }

  async getFlashCards() {
    const flashCards = await this.repository.index({per_page: 10});

    this.setState({
      flashCards,
      currentFlashCardIndex: 0,
    });
  }

  getCurrentFlashCard(): FlashCard | null {
    const {flashCards, currentFlashCardIndex} = this.state;
    return flashCards[currentFlashCardIndex];
  }

  nextCard = () => {
    this.countCardAsViewed();

    this.setState((state) => ({
      currentFlashCardIndex: state.currentFlashCardIndex + 1,
      counted: false,
    }));
  };

  countCardAsViewed = () => {
    if (this.state.counted) {
      return;
    }

    const flashCard = this.getCurrentFlashCard();

    this.repository.update(flashCard!.id);

    this.setState({counted: true});
  };

  onFlip = () => {
    this.countCardAsViewed();
  };

  hasMoreCards() {
    const {currentFlashCardIndex, flashCards} = this.state;
    const limit = flashCards.length - 1;
    return currentFlashCardIndex < limit;
  }

  render() {
    const flashCard = this.getCurrentFlashCard();

    return (
      <div>
        <AppPageTitle>Flash Cards</AppPageTitle>

        {flashCard && (
          <FlashCardShow
            key={flashCard.id}
            flashCard={flashCard}
            onFlip={this.onFlip}
          />
        )}

        <button onClick={this.nextCard} disabled={!flashCard}>
          Next card
        </button>
      </div>
    );
  }
}

export default FlashCardsPage;
