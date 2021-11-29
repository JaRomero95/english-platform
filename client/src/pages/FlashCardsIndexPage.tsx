import React from 'react';
import styled from 'styled-components';
import {Typography, ToggleButtonGroup, ToggleButton} from '@mui/material';
import AppPaper from 'components/AppPaper';
import FlashCard from 'models/FlashCard';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardCategoriesRepository from 'repositories/FlashCardCategoriesRepository';
import FlashCardCategory from 'models/FlashCardCategory';

interface Props {}

interface State {
  flashCards: FlashCard[];
  flashCardCategories: FlashCardCategory[];
  categoryIds: number[];
}

class FlashCardCategories extends React.Component<Props, State> {
  private flashCardsRepository = new FlashCardsRepository();
  private flashCardCategoriesRepository = new FlashCardCategoriesRepository();

  constructor(props: Props) {
    super(props);

    this.state = {flashCards: [], flashCardCategories: [], categoryIds: []};
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

  shouldGetFlashCards(prevState: State): boolean {
    return prevState.categoryIds !== this.state.categoryIds;
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
    const {categoryIds} = this.state;

    if (categoryIds.length) {
      return {category_ids: categoryIds};
    }

    return {};
  }

  onCategorySelected = (event: React.SyntheticEvent, categoryIds: number[]) => {
    this.setState({categoryIds});
  };

  render() {
    const {flashCards, flashCardCategories, categoryIds} = this.state;

    return (
      <div>
        <AppPaper>
          <FilterLabel>Categories</FilterLabel>

          <CategoriesFilterGroup
            color="primary"
            value={categoryIds}
            onChange={this.onCategorySelected}
          >
            {flashCardCategories.map((flashCardCategory) => (
              <ToggleButton
                key={flashCardCategory.id}
                value={flashCardCategory.id}
              >
                {flashCardCategory.name}
              </ToggleButton>
            ))}
          </CategoriesFilterGroup>
        </AppPaper>

        {flashCards.map((flashCard) => (
          <div key={flashCard.id}>
            {flashCard.id} - {flashCard.question_text}
          </div>
        ))}
      </div>
    );
  }
}

const CategoriesFilterGroup = styled(ToggleButtonGroup)`
  flex-wrap: wrap;

  > button {
    flex-grow: 1;
    border-radius: 0;
    border: 1px solid rgba(0, 0, 0, 0.12) !important;
    margin-left: -1px;
    margin-top: -1px;
  }

  &:after {
    content: '';
    flex-grow: 999; // Avoid last row grow
  }
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

export default FlashCardCategories;
