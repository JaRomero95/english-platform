import FlashCard from 'models/FlashCard';
import React from 'react';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardShow from 'components/flash_cards/FlashCardShow';

interface Props {}

interface State {
  flashCards: FlashCard[];
  currentFlashCardIndex: number;
}

class FlashCardsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {flashCards: [], currentFlashCardIndex: 0};
  }

  componentDidMount() {
    this.getFlashCards();
  }

  componentDidUpdate() {
    // const {flashCards}
    const {currentFlashCardIndex} = this.state;

    if (!currentFlashCardIndex || this.getCurrentFlashCard()) {
      return;
    }

    this.getFlashCards();
  }

  async getFlashCards() {
    const repository = new FlashCardsRepository();
    const flashCards = await repository.index({per_page: 10});
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
    this.setState((state) => ({
      currentFlashCardIndex: state.currentFlashCardIndex + 1,
    }));
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
        <h1>Flash Cards</h1>

        {flashCard && (
          <FlashCardShow key={flashCard.id} flashCard={flashCard} />
        )}

        <button onClick={this.nextCard} disabled={!flashCard}>
          Next card
        </button>
      </div>
    );
  }
}

export default FlashCardsPage;
