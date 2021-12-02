import FlashCard from 'models/FlashCard';
import React, {useState} from 'react';
import AppFullScreenDialog from 'components/AppFullScreenDialog';
import FlashCardForm from 'components/flash_cards/FlashCardForm';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardsRepository from 'repositories/FlashCardsRepository';

interface Props {
  open: boolean;
  onClose: () => void;
  flashCard: FlashCard;
  flashCardCategories: FlashCardCategory[];
}

const repository = new FlashCardsRepository();

function FlashCardEdit(props: Props) {
  const onUpdateFlashCard = async (flashCard: FlashCard) => {
    await repository.update(flashCard.id!, flashCard);

    props.onClose();
  };

  return (
    <AppFullScreenDialog {...props} title="Edit Flash Card">
      <FlashCardForm
        flashCard={props.flashCard}
        flashCardCategories={props.flashCardCategories}
        onSubmit={onUpdateFlashCard}
      />
    </AppFullScreenDialog>
  );
}

export default FlashCardEdit;
