import React from 'react';
import styled from 'styled-components';
import AppPaper from 'components/AppPaper';
import AppInput from 'components/AppInput';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardCategorySelect from 'components/flash_cards/FlashCardCategorySelect';

export interface Filters {
  categoryIds: number[];
  questionText: string;
  answerText: string;
}

interface Props {
  flashCardCategories: FlashCardCategory[];
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

interface State {}

class FlashCardFilters extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {categoryIds: []};
  }

  onCategorySelected = (categoryIds: any) => {
    this.props.onFiltersChange({
      ...this.props.filters,
      categoryIds,
    });
  };

  onTextFieldChange = (value: string, name: 'questionText' | 'answerText') => {
    this.props.onFiltersChange({
      ...this.props.filters,
      [name]: value,
    });
  };

  render() {
    const {flashCardCategories, filters} = this.props;

    return (
      <div>
        <AppPaper>
          <FilterLabel>Categories</FilterLabel>

          <FlashCardCategorySelect
            flashCardCategories={flashCardCategories}
            selected={filters.categoryIds}
            onSelected={this.onCategorySelected}
            multiple
          />

          <FieldContainer>
            <FilterLabel>Question text</FilterLabel>
            <AppInput
              value={filters.questionText}
              onChange={(event) =>
                this.onTextFieldChange(event, 'questionText')
              }
            />
          </FieldContainer>

          <FieldContainer>
            <FilterLabel>Answer text</FilterLabel>
            <AppInput
              value={filters.answerText}
              onChange={(event) => this.onTextFieldChange(event, 'answerText')}
            />
          </FieldContainer>
        </AppPaper>
      </div>
    );
  }
}

const FieldContainer = styled.div`
  margin-top: 1rem;
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

export default FlashCardFilters;
