import FlashCard from 'models/FlashCard';
import React from 'react';
import AppFullScreenDialog from 'components/AppFullScreenDialog';
import FlashCardForm from 'components/flash_cards/FlashCardForm';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import LoadingStoreContext from 'providers/LoadingStoreContext';

interface Props {
  open: boolean;
  flashCard: FlashCard;
  flashCardCategories: FlashCardCategory[];
  onUpdate?: (flashCard: FlashCard) => void;
  onClose: () => void;
}

const repository = new FlashCardsRepository();

function FlashCardEdit(props: Props) {
  const {open, flashCard, flashCardCategories, onClose, onUpdate} = props;

  const loadingStore = React.useContext(LoadingStoreContext);

  const onUpdateFlashCard = async (flashCard: FlashCard) => {
    // FIXME: additional loading to avoid screen jumps
    loadingStore!.incrementLoading();

    const updatedFlashCard = await repository.update(flashCard.id!, flashCard);

    if (onUpdate) onUpdate(updatedFlashCard);

    onClose();

    // FIXME: remove additional loading with a small delay to prevent screen jump
    setTimeout(() => loadingStore!.decrementLoading(), 200);
  };

  return (
    <AppFullScreenDialog open={open} onClose={onClose} title="Edit Flash Card">
      <FlashCardForm
        flashCard={flashCard}
        flashCardCategories={flashCardCategories}
        onSubmit={onUpdateFlashCard}
      />
    </AppFullScreenDialog>
  );
}

export default FlashCardEdit;
