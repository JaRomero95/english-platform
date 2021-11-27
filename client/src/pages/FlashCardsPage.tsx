import FlashCard from 'models/FlashCard';
import React from 'react';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardShow from 'components/flash_cards/FlashCardShow';
import AppPageTitle from 'components/AppPageTitle';
import AppButton from 'components/AppButton';

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
    this.addKeyListeners();
  }

  componentWillUnmount() {
    this.removeKeyListeners();
  }

  addKeyListeners() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  removeKeyListeners() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      this.nextCard();
    }
  };

  componentDidUpdate() {
    const {currentFlashCardIndex, flashCards} = this.state;

    const limitToRequestMore = flashCards.length - 2;

    if (currentFlashCardIndex >= limitToRequestMore) {
      this.getFlashCards();
    }
  }

  async getFlashCards() {
    const flashCards = await this.repository.index({per_page: 10});

    this.setState((state) => ({
      flashCards: [...state.flashCards, ...flashCards],
    }));
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

        <ButtonContainer>
          <AppButton
            onClick={this.nextCard}
            disabled={!flashCard}
            endIcon={<ArrowForwardIcon />}
            size="large"
          >
            Next card
          </AppButton>
        </ButtonContainer>
      </div>
    );
  }
}

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

export default FlashCardsPage;
