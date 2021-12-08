import styled from 'styled-components';
import {ToggleButtonGroup, ToggleButton} from '@mui/material';
import FlashCardCategory from 'models/FlashCardCategory';

interface Props {
  flashCardCategories: FlashCardCategory[];
  multiple: boolean;
  selected: number | number[] | null;
  onSelected: (selected: number | number[]) => void;
}

function FlashCardCategorySelect(props: Props) {
  const {multiple, flashCardCategories, selected, onSelected} = props;

  return (
    <Container>
      {flashCardCategories.length ? (
        <CategoriesFilterGroup
          exclusive={!multiple}
          color="primary"
          value={selected}
          onChange={(event, values) => onSelected(values)}
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
      ) : (
        <div>No categories yet</div>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 1rem;
`;

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

export default FlashCardCategorySelect;
