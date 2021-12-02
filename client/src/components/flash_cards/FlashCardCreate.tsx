import FlashCard from 'models/FlashCard';
import React, {useState} from 'react';
import AppFullScreenDialog from 'components/AppFullScreenDialog';
import FlashCardForm from 'components/flash_cards/FlashCardForm';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardsRepository from 'repositories/FlashCardsRepository';

interface Props {
  open: boolean;
  onClose: () => void;
  flashCardCategories: FlashCardCategory[];
}

const repository = new FlashCardsRepository();

function FlashCardCreate(props: Props) {
  const [flashCard, setFlashCard] = useState<FlashCard>({
    question_text: '',
    question_img_url: '',
    answer_text: '',
    answer_img_url: '',
    flash_card_category_id: null,
  });

  const onCreateFlashCard = async (flashCard: FlashCard) => {
    const response = await repository.create(flashCard);

    props.onClose();
  };

  return (
    <AppFullScreenDialog {...props} title="Create Flash Card">
      <FlashCardForm
        flashCard={flashCard}
        flashCardCategories={props.flashCardCategories}
        onSubmit={onCreateFlashCard}
      />
    </AppFullScreenDialog>
  );
}

export default FlashCardCreate;
