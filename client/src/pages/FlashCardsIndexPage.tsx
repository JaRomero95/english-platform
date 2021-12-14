import {useState, useEffect, useMemo} from 'react';
import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {Add as AddIcon} from '@mui/icons-material';
import {CircularProgress} from '@mui/material';
import FlashCard from 'models/FlashCard';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardCategoriesRepository from 'repositories/FlashCardCategoriesRepository';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardShow from 'components/flash_cards/FlashCardShow';
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
    visible: searchParams.get('visible') || '',
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

function FlashCardsIndexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lastRequest, setLastRequest] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [flashCardToEdit, setFlashCardToEdit] = useState<FlashCard | null>(
    null
  );
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [flashCardCategories, setFlashCardCategories] = useState<
    FlashCardCategory[]
  >([]);

  const perPage = getNumberParam(searchParams, 'per_page', 24);
  const page = getNumberParam(searchParams, 'page', 1);

  const indexedCategories = useMemo(() => {
    const indexedCategories: {[id: number]: FlashCardCategory} = {};

    flashCardCategories.forEach((category) => {
      indexedCategories[category.id!] = category;
    });

    return indexedCategories;
  }, [flashCardCategories]);

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
    const {categoryIds, questionText, answerText, visible} = filters;

    const params: {[name: string]: string | boolean | number | Array<number>} =
      {
        per_page: perPage,
        page,
        order_field: 'updated_at',
        order_dir: 'asc',
      };

    if (categoryIds.length) params.flash_card_category_ids = categoryIds;
    if (questionText) params.question_text = questionText;
    if (answerText) params.answer_text = answerText;
    if (visible) params.visible = visible === 'true';

    return params;
  };

  const calcTotalPages = (totalElements: number) => {
    return Math.ceil(totalElements / perPage);
  };

  const getFlashCards = async () => {
    setLoading(true);

    const {data, meta} = await flashCardsRepository.index(
      getFlashCardParams(),
      {skipLoading: true}
    );

    setTotalPages(calcTotalPages(meta.total_elements));
    setFlashCards(data);
    setLoading(false);
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
      visible: '',
    });
  }, []);

  useEffect(() => {
    clearTimeout(lastRequest!);

    const timeoutReference = setTimeout(() => {
      getFlashCards();
    }, 500);

    setLastRequest(timeoutReference);
  }, [searchParams, page, perPage]);

  const hasCards = !!flashCards.length;

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

      {loading && (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      )}

      {!loading && !hasCards && <p>No cards found</p>}

      {!loading && hasCards && (
        <>
          <FlashCardsContainer>
            {flashCards.map((flashCard) => {
              const flashCardCategory =
                indexedCategories[flashCard.flash_card_category_id!];

              const reverseFlashCard: FlashCard = {
                question_text: flashCard.answer_text,
                question_img_url: flashCard.answer_img_url,
                question_font_scale_percent:
                  flashCard.answer_font_scale_percent,
              } as any;

              return (
                <FlashCardContainer
                  onClick={() => setFlashCardToEdit(flashCard)}
                  key={flashCard.id}
                >
                  <div className="fronface">
                    <FlashCardShow
                      flashCard={flashCard}
                      flippable={false}
                      fillAvailableSpace={false}
                    />
                  </div>

                  <div className="backface">
                    <FlashCardShow
                      flashCard={reverseFlashCard}
                      flippable={false}
                      fillAvailableSpace={false}
                    />
                  </div>

                  {flashCardCategory && (
                    <CategoryName>
                      <div>{flashCardCategory.name}</div>
                    </CategoryName>
                  )}
                </FlashCardContainer>
              );
            })}
          </FlashCardsContainer>

          <AppPagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </>
      )}

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

const FlashCardContainer = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;

  > div > div {
    height: 150px;
    width: 150px;

    > div {
      box-shadow: none !important;
    }
  }

  > .fronface > div > div {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-right: 0;
  }

  > .backface > div > div {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
`;

const CategoryName = styled.div`
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 20px;

  > * {
    display: inline-block;
    font-size: 0.7em;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0 0.3rem;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
`;

const CreateButton = styled(AppButton)`
  margin-top: 1rem;
`;

const LoadingContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

export default FlashCardsIndexPage;
