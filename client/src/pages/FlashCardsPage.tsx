import React, {useState, useEffect} from 'react';
import FlashCard from 'models/FlashCard';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {
  ArrowForward as ArrowForwardIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
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
  }, [currentFlashCardIndex, flashCards]);

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
    // TODO: add button to reset the game after finish
    return (
      <EmptyStateMessage>
        {viewedCardIds.length ? 'There are not more cards' : 'No cards found'}
      </EmptyStateMessage>
    );
  };

  const flashCard = getCurrentFlashCard();

  return (
    <Container>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter by categories</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FlashCardCategorySelect
            flashCardCategories={flashCardCategories}
            selected={categoryIds}
            onSelected={onCategorySelected}
            multiple
          />
        </AccordionDetails>
      </StyledAccordion>

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

const StyledAccordion = styled(Accordion)`
  margin-bottom: 0 !important;
`;

const StyledButton = styled(AppButton)`
  height: 6vh;
  border-radius: 0 !important;
`;

const FlashCardContainer = styled.div`
  flex-grow: 2;
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const EmptyStateMessage = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  width: 100%;
`;

export default FlashCardsPage;
