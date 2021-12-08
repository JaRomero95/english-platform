import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {Add as AddIcon} from '@mui/icons-material';
import FlashCard from 'models/FlashCard';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardCategoriesRepository from 'repositories/FlashCardCategoriesRepository';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardAdminItem from 'components/flash_cards/FlashCardAdminItem';
import FlashCardFilters from 'components/flash_cards/FlashCardFilters';
import FlashCardCreate from 'components/flash_cards/FlashCardCreate';
import FlashCardEdit from 'components/flash_cards/FlashCardEdit';
import AppPagination from 'components/AppPagination';
import AppButton from 'components/AppButton';
import {Filters} from 'components/flash_cards/FlashCardFilters';

const flashCardsRepository = new FlashCardsRepository();
const flashCardCategoriesRepository = new FlashCardCategoriesRepository();

const buildFilters = (searchParams: URLSearchParams): Filters => {
  const categoryIdsParam = searchParams.get('categoryIds');
  const categoryIds = categoryIdsParam
    ? categoryIdsParam.split(',').map((id) => parseInt(id))
    : [];

  return {
    categoryIds,
    questionText: searchParams.get('questionText') || '',
    answerText: searchParams.get('answerText') || '',
  };
};

const getNumberParam = (
  searchParams: URLSearchParams,
  paramName: string,
  defaultValue: number
): number => {
  const param = searchParams.get(paramName);
  return param ? parseInt(param) : defaultValue;
};

function FlashCardCategories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [flashCardToEdit, setFlashCardToEdit] = useState<FlashCard | null>(
    null
  );
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [flashCardCategories, setFlashCardCategories] = useState<
    FlashCardCategory[]
  >([]);

  const perPage = getNumberParam(searchParams, 'per_page', 12);
  const page = getNumberParam(searchParams, 'page', 1);

  const setFilters = (filters: Filters) => {
    const urlSearchParams = new URLSearchParams(filters as any);
    setSearchParams(urlSearchParams);
  };

  const setPage = (page: number) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set('page', page.toString());
    setSearchParams(urlSearchParams);
  };

  const filters = buildFilters(searchParams);

  const getFlashCardParams = () => {
    const {categoryIds, questionText, answerText} = filters;

    const params: {[name: string]: string | number | Array<number>} = {
      per_page: perPage,
      page,
    };

    if (categoryIds.length) params.flash_card_category_ids = categoryIds;
    if (questionText) params.question_text = questionText;
    if (answerText) params.answer_text = answerText;

    return params;
  };

  const calcTotalPages = (totalElements: number) => {
    return Math.ceil(totalElements / perPage);
  };

  const getFlashCards = async () => {
    const {data, meta} = await flashCardsRepository.index(getFlashCardParams());

    setTotalPages(calcTotalPages(meta.total_elements));
    setFlashCards(data);
  };

  const getFlashCardCategories = async () => {
    const {data} = await flashCardCategoriesRepository.index();
    setFlashCardCategories(data);
  };

  const onFlashCardCreate = () => {
    getFlashCards();
    setShowCreateDialog(false);
  };

  const onFlashCardUpdate = () => {
    getFlashCards();
    setFlashCardToEdit(null);
  };

  useEffect(() => {
    getFlashCardCategories();

    setFilters({
      categoryIds: [],
      questionText: '',
      answerText: '',
    });
  }, []);

  useEffect(() => {
    getFlashCards();
  }, [searchParams, page, perPage]);

  // TODO: display category to identify easily cards without category
  // TODO: Add a "no category" filter
  // TODO: Add margin to create button
  // TODO: Custom order for this page

  return (
    <div>
      <FlashCardFilters
        flashCardCategories={flashCardCategories}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <CreateButton
        startIcon={<AddIcon />}
        onClick={() => setShowCreateDialog(true)}
      >
        Create Flash Card
      </CreateButton>

      <FlashCardsContainer>
        {flashCards.map((flashCard) => (
          <RowWrapper
            onClick={() => setFlashCardToEdit(flashCard)}
            key={flashCard.id}
          >
            <FlashCardAdminItem flashCard={flashCard} />
          </RowWrapper>
        ))}
      </FlashCardsContainer>

      <AppPagination page={page} totalPages={totalPages} onChange={setPage} />

      <FlashCardCreate
        open={showCreateDialog}
        onClose={onFlashCardCreate}
        flashCardCategories={flashCardCategories}
      />

      {flashCardToEdit && (
        <FlashCardEdit
          open={!!flashCardToEdit}
          onClose={onFlashCardUpdate}
          flashCardCategories={flashCardCategories}
          flashCard={flashCardToEdit}
        />
      )}
    </div>
  );
}

const FlashCardsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
`;

const RowWrapper = styled.div`
  cursor: pointer;
`;

const CreateButton = styled(AppButton)`
  margin-top: 1rem;
`;

export default FlashCardCategories;
