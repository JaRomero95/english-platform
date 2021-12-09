import React, {useState} from 'react';
import styled from 'styled-components';
import {Save as SaveIcon, Image as ImageIcon} from '@mui/icons-material';
import FlashCard from 'models/FlashCard';
import AppInput from 'components/AppInput';
import AppButton from 'components/AppButton';
import FlashCardShow from 'components/flash_cards/FlashCardShow';
import FlashCardCategorySelect from 'components/flash_cards/FlashCardCategorySelect';
import FlashCardCategory from 'models/FlashCardCategory';

interface Props {
  flashCard: FlashCard;
  flashCardCategories: FlashCardCategory[];
  onSubmit: (flashCard: FlashCard) => void;
}

function FlashCardCreate(props: Props) {
  const {flashCard: initialFlashCard, flashCardCategories, onSubmit} = props;
  const [flashCard, setFlashCard] = useState({...initialFlashCard});

  const onFieldChange = (fieldName: string, value: any) => {
    setFlashCard({
      ...flashCard,
      [fieldName]: value,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(flashCard);
  };

  const reverseFlashCard: FlashCard = {
    question_text: flashCard.answer_text,
    question_img_url: flashCard.answer_img_url,
  } as any;

  // TODO: Separate fields to easy go to target text/img field without confusions cause both are text fields
  // TODO: Change flash card style to show both faces at the same time

  return (
    <form onSubmit={handleSubmit}>
      <SectionTitle>Select a category</SectionTitle>

      <FlashCardCategorySelect
        flashCardCategories={flashCardCategories}
        multiple={false}
        selected={flashCard.flash_card_category_id}
        onSelected={(selected) =>
          onFieldChange('flash_card_category_id', selected)
        }
      />

      <SectionTitle>Question</SectionTitle>

      <StyledInput
        value={flashCard.question_text}
        placeholder={'Question text'}
        onChange={(value: string) => onFieldChange('question_text', value)}
      />

      <StyledInput
        value={flashCard.question_img_url}
        placeholder={'Question image url'}
        startIcon={<ImageIcon />}
        onChange={(value: string) => onFieldChange('question_img_url', value)}
      />

      <SectionTitle>Answer</SectionTitle>

      <StyledInput
        value={flashCard.answer_text}
        placeholder={'Answer text'}
        onChange={(value: string) => onFieldChange('answer_text', value)}
      />

      <StyledInput
        value={flashCard.answer_img_url}
        placeholder={'Answer image url'}
        startIcon={<ImageIcon />}
        onChange={(value: string) => onFieldChange('answer_img_url', value)}
      />

      <SectionTitle>Preview</SectionTitle>

      <FlashCardContainer>
        <div>
          <FlashCardShow flashCard={flashCard} flippable={false} />
        </div>

        <div>
          <FlashCardShow flashCard={reverseFlashCard} flippable={false} />
        </div>
      </FlashCardContainer>

      <SaveButton type="submit" startIcon={<SaveIcon />} onClick={handleSubmit}>
        Save
      </SaveButton>
    </form>
  );
}

const StyledInput = styled(AppInput)`
  margin-bottom: 1rem !important;
`;

const SaveButton = styled(AppButton)``;

const SectionTitle = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9em;
`;

const FlashCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    height: 220px;
    width: 220px;
  }

  @media (min-width: 650px) {
    flex-direction: row;

    > div {
      width: 300px;
      height: 300px;
    }
  }
`;

export default FlashCardCreate;
