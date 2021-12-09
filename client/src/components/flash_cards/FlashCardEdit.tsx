import FlashCard from 'models/FlashCard';
import React from 'react';
import AppFullScreenDialog from 'components/AppFullScreenDialog';
import FlashCardForm from 'components/flash_cards/FlashCardForm';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import LoadingStoreContext from 'providers/LoadingStoreContext';

interface Props {
  open: boolean;
  onClose: () => void;
  flashCard: FlashCard;
  flashCardCategories: FlashCardCategory[];
}

const repository = new FlashCardsRepository();

function FlashCardEdit(props: Props) {
  const loadingStore = React.useContext(LoadingStoreContext);

  const onUpdateFlashCard = async (flashCard: FlashCard) => {
    // FIXME: additional loading to avoid screen jumps
    loadingStore!.incrementLoading();

    await repository.update(flashCard.id!, flashCard);

    props.onClose();

    // FIXME: remove additional loading with a small delay to prevent screen jump
    setTimeout(() => loadingStore!.decrementLoading(), 200);
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
