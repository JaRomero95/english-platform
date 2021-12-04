import React, {useState, useEffect} from 'react';
import FlashCard from 'models/FlashCard';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardCategoriesRepository from 'repositories/FlashCardCategoriesRepository';
import FlashCardShow from 'components/flash_cards/FlashCardShow';
import FlashCardCategorySelect from 'components/flash_cards/FlashCardCategorySelect';
import FlashCardEdit from 'components/flash_cards/FlashCardEdit';
import AppButton from 'components/AppButton';
import AppPaper from 'components/AppPaper';
import FlashCardCategory from 'models/FlashCardCategory';

const repository = new FlashCardsRepository();
const categoriesRepository = new FlashCardCategoriesRepository();

function FlashCardsPage() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [viewedCardIds, setViewedCardIds] = useState<number[]>([]);
  const [flashCardCategories, setFlashCardCategories] = useState<
    FlashCardCategory[]
  >([]);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [currentFlashCardIndex, setCurrentFlashCardIndex] = useState<number>(0);
  const [counted, setCounted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const reset = () => {
    setFlashCards([]);
    setViewedCardIds([]);
    setCurrentFlashCardIndex(0);
    setCounted(false);
    setFinished(false);
  };

  useEffect(() => {
    getFlashCards();
    getFlashCardCategories();
  }, []);

  useEffect(() => {
    addKeyListeners();

    return removeKeyListeners;
  }, []);

  const addKeyListeners = () => {
    document.addEventListener('keydown', onKeyDown);
  };

  const removeKeyListeners = () => {
    document.removeEventListener('keydown', onKeyDown);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      nextCard();
    }
  };

  useEffect(() => {
    if (needMoreFlashCards()) getFlashCards();
  }, [currentFlashCardIndex]);

  const needMoreFlashCards = (): boolean => {
    if (finished) return false;

    const limitToRequestMore = flashCards.length - 2;

    return currentFlashCardIndex >= limitToRequestMore;
  };

  const getFlashCards = async () => {
    const params: {[key: string]: any} = {per_page: 10};

    if (categoryIds.length) params.flash_card_category_ids = categoryIds;

    const {data} = await repository.index(params);

    const cardsToAdd = removeViewedCards(data);

    setFlashCards([...flashCards, ...cardsToAdd]);
    setViewedCardIds([...viewedCardIds, ...cardsToAdd.map((c) => c.id!)]);
    setFinished(!cardsToAdd.length);
  };

  const getFlashCardCategories = async () => {
    const {data} = await categoriesRepository.index({per_page: 0});

    setFlashCardCategories(data);
  };

  const removeViewedCards = (flashCards: FlashCard[]): FlashCard[] => {
    return flashCards.filter(({id}: FlashCard) => !viewedCardIds.includes(id!));
  };

  const getCurrentFlashCard = (): FlashCard | null => {
    return flashCards[currentFlashCardIndex];
  };

  const nextCard = () => {
    countCardAsViewed();
    setCurrentFlashCardIndex(currentFlashCardIndex + 1);
    setCounted(false);
  };

  const countCardAsViewed = () => {
    if (counted) return;

    const flashCard = getCurrentFlashCard();

    repository.update(flashCard!.id!, {
      last_answer_datetime: new Date().toISOString(),
    });

    setCounted(true);
  };

  const onFlip = () => {
    countCardAsViewed();
  };

  const onCategorySelected = (categoryIds: any) => {
    setCategoryIds(categoryIds);
    reset();
  };

  const emptyState = () => {
    if (viewedCardIds.length) {
      return (
        <div>
          <p>There are not more cards</p>

          <AppButton onClick={reset}>Start again</AppButton>
        </div>
      );
    } else {
      return (
        <div>
          <p>There are any cards. Create one.</p>
        </div>
      );
    }
  };

  const flashCard = getCurrentFlashCard();

  if (!flashCard) {
    if (viewedCardIds.length) {
      return (
        <div>
          <p>There are not more cards</p>

          <AppButton onClick={reset}>Start again</AppButton>
        </div>
      );
    } else {
      return (
        <div>
          <p>There are any cards. Create one.</p>
        </div>
      );
    }
  }

  return (
    <Container>
      <StyledPaper>
        <PaperTitle>Filter by categories</PaperTitle>

        <FlashCardCategorySelect
          flashCardCategories={flashCardCategories}
          selected={categoryIds}
          onSelected={onCategorySelected}
          multiple
        />
      </StyledPaper>

      <FlashCardContainer>
        {flashCard ? (
          <>
            <FlashCardShow
              key={flashCard.id}
              flashCard={flashCard}
              onFlip={onFlip}
              onSettings={() => setShowEditModal(true)}
            />

            <FlashCardEdit
              open={showEditModal}
              flashCard={flashCard}
              flashCardCategories={flashCardCategories}
              onClose={() => setShowEditModal(false)}
            />
          </>
        ) : (
          emptyState()
        )}
      </FlashCardContainer>

      <StyledButton
        onClick={nextCard}
        disabled={!flashCard}
        endIcon={<ArrowForwardIcon />}
        size="large"
      >
        Next card
      </StyledButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledButton = styled(AppButton)`
  height: 6vh;
  border-radius: 0;
`;

const StyledPaper = styled(AppPaper)`
  padding-top: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0;
`;

const PaperTitle = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.8 em;
  font-weight: bold;
  text-transform: uppercase;
`;

const FlashCardContainer = styled.div`
  flex-grow: 2;
  display: flex;
  align-items: center;
`;

export default FlashCardsPage;
