import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import FlashCard from 'models/FlashCard';
import FlashCardsRepository from 'repositories/FlashCardsRepository';
import FlashCardCategoriesRepository from 'repositories/FlashCardCategoriesRepository';
import FlashCardCategory from 'models/FlashCardCategory';
import FlashCardAdminItem from 'components/flash_cards/FlashCardAdminItem';
import FlashCardFilters from 'components/flash_cards/FlashCardFilters';
import AppPagination from 'components/AppPagination';
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
  const [totalPages, setTotalPages] = useState(1);
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [flashCardCategories, setFlashCardCategories] = useState<
    FlashCardCategory[]
  >([]);

  const perPage = getNumberParam(searchParams, 'per_page', 10);
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

  return (
    <div>
      <FlashCardFilters
        flashCardCategories={flashCardCategories}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <FlashCardsContainer>
        {flashCards.map((flashCard) => (
          <FlashCardAdminItem key={flashCard.id} flashCard={flashCard} />
        ))}

        <AppPagination page={page} totalPages={totalPages} onChange={setPage} />
      </FlashCardsContainer>
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

export default FlashCardCategories;
