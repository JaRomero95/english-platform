import styled from 'styled-components';
import AppPaper from 'components/AppPaper';
import AppInput from 'components/AppInput';
import AppSelect from 'components/AppSelect';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardCategorySelect from 'components/flash_cards/FlashCardCategorySelect';

export interface Filters {
  categoryIds: number[];
  questionText: string;
  answerText: string;
  visible: any;
}

interface Props {
  flashCardCategories: FlashCardCategory[];
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

function FlashCardFilters(props: Props) {
  const onCategorySelected = (categoryIds: any) => {
    props.onFiltersChange({
      ...props.filters,
      categoryIds,
    });
  };

  const onFieldChange = (value: string, name: string) => {
    props.onFiltersChange({
      ...props.filters,
      [name]: value,
    });
  };

  const {flashCardCategories, filters} = props;

  return (
    <div>
      <AppPaper>
        <FilterLabel>Categories</FilterLabel>

        <FlashCardCategorySelect
          flashCardCategories={flashCardCategories}
          selected={filters.categoryIds}
          onSelected={onCategorySelected}
          multiple
        />

        <FieldContainer>
          <FilterLabel>Question text</FilterLabel>
          <AppInput
            value={filters.questionText}
            onChange={(event) => onFieldChange(event, 'questionText')}
          />
        </FieldContainer>

        <FieldContainer>
          <FilterLabel>Answer text</FilterLabel>
          <AppInput
            value={filters.answerText}
            onChange={(event) => onFieldChange(event, 'answerText')}
          />
        </FieldContainer>

        <FieldContainer>
          <FilterLabel>Playable cards</FilterLabel>
          <AppSelect
            value={filters.visible}
            onChange={(value) => onFieldChange(value, 'visible')}
            options={[
              {label: 'All', value: ''},
              {label: 'Playable', value: 'true'},
              {label: 'No playable', value: 'false'},
            ]}
          />
        </FieldContainer>
      </AppPaper>
    </div>
  );
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
