import {useState} from 'react';
import styled from 'styled-components';
import {Save as SaveIcon} from '@mui/icons-material';
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

  // TODO: Add submit functionality to save on enter
  // TODO: Separate fields to easy go to target text/img field without confusions cause both are text fields
  // TODO: Change flash card style to show both faces at the same time

  return (
    <div>
      <FlashCardCategorySelect
        flashCardCategories={flashCardCategories}
        multiple={false}
        selected={flashCard.flash_card_category_id}
        onSelected={(selected) =>
          onFieldChange('flash_card_category_id', selected)
        }
      />

      <AppInput
        value={flashCard.question_text}
        placeholder={'Question Text'}
        onChange={(value: string) => onFieldChange('question_text', value)}
      />

      <AppInput
        value={flashCard.question_img_url}
        placeholder={'Question Img Url'}
        onChange={(value: string) => onFieldChange('question_img_url', value)}
      />

      <AppInput
        value={flashCard.answer_text}
        placeholder={'Answer Text'}
        onChange={(value: string) => onFieldChange('answer_text', value)}
      />

      <AppInput
        value={flashCard.answer_img_url}
        placeholder={'Answer Img Url'}
        onChange={(value: string) => onFieldChange('answer_img_url', value)}
      />

      <FlashCardShow flashCard={flashCard} />

      <SaveButton startIcon={<SaveIcon />} onClick={() => onSubmit(flashCard)}>
        Save
      </SaveButton>
    </div>
  );
}

const SaveButton = styled(AppButton)`
  margin-top: 1rem;
`;

export default FlashCardCreate;
