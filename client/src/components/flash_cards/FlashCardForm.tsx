import React, {useState} from 'react';
import styled from 'styled-components';
import {
  Save as SaveIcon,
  Image as ImageIcon,
  TextFormat as TextFormatIcon,
} from '@mui/icons-material';
import {Divider} from '@mui/material';
import FlashCard from 'models/FlashCard';
import AppInput from 'components/AppInput';
import AppButton from 'components/AppButton';
import AppSlider from 'components/AppSlider';
import AppCheckbox from 'components/AppCheckbox';
import FlashCardShow from 'components/flash_cards/FlashCardShow';
import FlashCardCategorySelect from 'components/flash_cards/FlashCardCategorySelect';
import FlashCardCategory from 'models/FlashCardCategory';

interface Props {
  flashCard: FlashCard;
  flashCardCategories: FlashCardCategory[];
  onSubmit: (flashCard: FlashCard) => void;
}

function formatSliderText(value: number) {
  return `${value}%`;
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
    question_font_scale_percent: flashCard.answer_font_scale_percent,
  } as any;

  return (
    <StyledForm onSubmit={handleSubmit}>
      <SectionTitle>Select a category</SectionTitle>

      <FlashCardCategorySelect
        flashCardCategories={flashCardCategories}
        multiple={false}
        selected={flashCard.flash_card_category_id}
        onSelected={(selected) =>
          onFieldChange('flash_card_category_id', selected)
        }
      />

      <Divider />

      <SectionTitle>Visible</SectionTitle>

      <Row>
        <AppCheckbox
          value={flashCard.visible}
          label={flashCard.visible ? 'Playable Card' : 'No playable card'}
          onChange={(visible) => onFieldChange('visible', visible)}
        />
      </Row>

      <Divider />

      <SectionTitle>Question</SectionTitle>

      <StyledInput
        value={flashCard.question_text}
        placeholder={'Question text'}
        onChange={(value: string) => onFieldChange('question_text', value)}
        maxLength={500}
        textarea
      />

      <StyledInput
        value={flashCard.question_img_url}
        placeholder={'Question image url'}
        startIcon={<ImageIcon />}
        onChange={(value: string) => onFieldChange('question_img_url', value)}
      />

      <StyledSlider
        value={flashCard.question_font_scale_percent}
        valueLabelFormat={formatSliderText}
        step={5}
        startIcon={<TextFormatIcon fontSize="small" />}
        endIcon={<TextFormatIcon fontSize="large" />}
        onChange={(value: number) =>
          onFieldChange('question_font_scale_percent', value)
        }
      />

      <Divider />

      <SectionTitle>Answer</SectionTitle>

      <StyledInput
        value={flashCard.answer_text}
        placeholder={'Answer text'}
        onChange={(value: string) => onFieldChange('answer_text', value)}
        maxLength={500}
        textarea
      />

      <StyledInput
        value={flashCard.answer_img_url}
        placeholder={'Answer image url'}
        startIcon={<ImageIcon />}
        onChange={(value: string) => onFieldChange('answer_img_url', value)}
      />

      <StyledSlider
        value={flashCard.answer_font_scale_percent}
        valueLabelFormat={formatSliderText}
        step={5}
        startIcon={<TextFormatIcon fontSize="small" />}
        endIcon={<TextFormatIcon fontSize="large" />}
        onChange={(value: number) =>
          onFieldChange('answer_font_scale_percent', value)
        }
      />

      <Divider />

      <SectionTitle>Preview</SectionTitle>

      <FlashCardContainer>
        <div>
          <FlashCardShow flashCard={flashCard} flippable={false} />
        </div>

        <div>
          <FlashCardShow flashCard={reverseFlashCard} flippable={false} />
        </div>
      </FlashCardContainer>

      <SubmitButton
        type="submit"
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        Save
      </SubmitButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  position: relative;
`;

const SubmitButton = styled(AppButton)`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  border-radius: 0;
`;

const StyledInput = styled(AppInput)`
  margin-bottom: 1rem !important;
`;

const StyledSlider = styled(AppSlider)`
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const SectionTitle = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  font-size: 0.9em;
  margin-bottom: 1rem;
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
