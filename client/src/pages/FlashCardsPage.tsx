import FlashCard from 'models/FlashCard';
import React from 'react';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardCategoriesRepository from 'repositories/FlashCardCategoriesRepository';
import FlashCardShow from 'components/flash_cards/FlashCardShow';
import FlashCardCategorySelect from 'components/flash_cards/FlashCardCategorySelect';
import AppPageTitle from 'components/AppPageTitle';
import AppButton from 'components/AppButton';
import FlashCardCategory from 'models/FlashCardCategory';

interface Props {}

interface State {
  flashCards: FlashCard[];
  currentFlashCardIndex: number;
  flashCardCategories: FlashCardCategory[];
  categoryIds: number[];
  counted: boolean;
  finished: boolean;
  viewedCardIds: number[];
}

const initialState = {
  flashCards: [],
  viewedCardIds: [],
  flashCardCategories: [],
  categoryIds: [],
  currentFlashCardIndex: 0,
  counted: false,
  finished: false,
};

class FlashCardsPage extends React.Component<Props, State> {
  private repository = new FlashCardsRepository();
  private categoriesRepository = new FlashCardCategoriesRepository();

  constructor(props: Props) {
    super(props);

    this.state = {...initialState};
  }

  reset = () => {
    this.setState({
      flashCards: [],
      viewedCardIds: [],
      currentFlashCardIndex: 0,
      counted: false,
      finished: false,
    });
  };

  componentDidMount() {
    this.getFlashCards();
    this.getFlashCardCategories();
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
    if (this.needMoreFlashCards()) {
      this.getFlashCards();
    }
  }

  needMoreFlashCards(): boolean {
    const {currentFlashCardIndex, flashCards, finished} = this.state;

    if (finished) {
      return false;
    }

    const limitToRequestMore = flashCards.length - 2;

    return currentFlashCardIndex >= limitToRequestMore;
  }

  async getFlashCards() {
    const {categoryIds} = this.state;

    const params: {[key: string]: any} = {per_page: 10};

    if (categoryIds.length) params.flash_card_category_ids = categoryIds;

    const {data} = await this.repository.index(params);

    const cardsToAdd = this.removeViewedCards(data);

    this.setState((state) => ({
      flashCards: [...state.flashCards, ...cardsToAdd],
      viewedCardIds: [...state.viewedCardIds, ...cardsToAdd.map((c) => c.id!)],
      finished: !cardsToAdd.length,
    }));
  }

  async getFlashCardCategories() {
    const {data} = await this.categoriesRepository.index({per_page: 0});

    this.setState({
      flashCardCategories: data,
    });
  }

  removeViewedCards(flashCards: FlashCard[]): FlashCard[] {
    const {viewedCardIds} = this.state;

    return flashCards.filter(({id}: FlashCard) => !viewedCardIds.includes(id!));
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

    this.repository.update(flashCard!.id!, {
      last_answer_datetime: new Date().toISOString(),
    });

    this.setState({counted: true});
  };

  onFlip = () => {
    this.countCardAsViewed();
  };

  onCategorySelected = (categoryIds: any) => {
    this.setState({categoryIds});
    this.reset();
  };

  render() {
    const {viewedCardIds, flashCardCategories, categoryIds} = this.state;

    const flashCard = this.getCurrentFlashCard();

    if (!flashCard) {
      if (viewedCardIds.length) {
        return (
          <div>
            <p>There are not more cards</p>

            <AppButton onClick={this.reset}>Start again</AppButton>
          </div>
        );
      } else {
        return (
          <div>
            <p>There are any cards. Create one.</p>
          </div>
        );
      }
    }

    return (
      <div>
        <AppPageTitle>Flash Cards</AppPageTitle>

        <FlashCardCategorySelect
          flashCardCategories={flashCardCategories}
          selected={categoryIds}
          onSelected={this.onCategorySelected}
          multiple
        />

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
