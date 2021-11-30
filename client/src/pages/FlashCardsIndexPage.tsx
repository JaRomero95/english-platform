import React from 'react';
import styled from 'styled-components';
import FlashCard from 'models/FlashCard';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardCategoriesRepository from 'repositories/FlashCardCategoriesRepository';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardAdminItem from 'components/flash_cards/FlashCardAdminItem';
import FlashCardFilters from 'components/flash_cards/FlashCardFilters';
import {Filters} from 'components/flash_cards/FlashCardFilters';

interface Props {}

interface State extends Filters {
  flashCards: FlashCard[];
  flashCardCategories: FlashCardCategory[];
}

class FlashCardCategories extends React.Component<Props, State> {
  private flashCardsRepository = new FlashCardsRepository();
  private flashCardCategoriesRepository = new FlashCardCategoriesRepository();

  constructor(props: Props) {
    super(props);

    this.state = {
      flashCards: [],
      flashCardCategories: [],
      categoryIds: [],
      questionText: '',
      answerText: '',
    };
  }

  componentDidMount() {
    this.getFlashCards();
    this.getFlashCardCategories();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.shouldGetFlashCards(prevState)) {
      this.getFlashCards();
    }
  }

  onFiltersChange = (filters: Filters) => {
    this.setState(filters);
  };

  shouldGetFlashCards(prevState: State): boolean {
    const fieldsToCheck = [
      'categoryIds',
      'questionText',
      'answerText',
    ] as const;

    return fieldsToCheck.some(
      (fieldName: typeof fieldsToCheck[number]) =>
        prevState[fieldName] !== this.state[fieldName]
    );
  }

  async getFlashCardCategories() {
    const flashCardCategories =
      await this.flashCardCategoriesRepository.index();
    this.setState({flashCardCategories});
  }

  async getFlashCards() {
    const flashCards = await this.flashCardsRepository.index(
      this.flashCardParams()
    );

    this.setState({flashCards});
  }

  flashCardParams() {
    const {categoryIds, questionText, answerText} = this.state;

    const params: {[name: string]: string | Array<number>} = {};

    if (categoryIds.length) params.flash_card_category_ids = categoryIds;
    if (questionText) params.question_text = questionText;
    if (answerText) params.answer_text = answerText;

    return params;
  }

  onCategorySelected = (event: React.SyntheticEvent, categoryIds: number[]) => {
    this.setState({categoryIds});
  };

  render() {
    const {
      flashCards,
      flashCardCategories,
      categoryIds,
      questionText,
      answerText,
    } = this.state;

    return (
      <div>
        <FlashCardFilters
          flashCardCategories={flashCardCategories}
          filters={{categoryIds, questionText, answerText}}
          onFiltersChange={this.onFiltersChange}
        />

        <FlashCardsContainer>
          {flashCards.map((flashCard) => (
            <FlashCardAdminItem key={flashCard.id} flashCard={flashCard} />
          ))}
        </FlashCardsContainer>
      </div>
    );
  }
}

const FlashCardsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
`;

export default FlashCardCategories;
