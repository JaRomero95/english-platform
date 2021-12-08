import React from 'react';
import FlashCard from 'models/FlashCard';
import styled from 'styled-components';
import FlashCardCategory from 'models/FlashCardCategory';

interface Props {
  flashCard: FlashCard;
  flashCardCategory: FlashCardCategory | null;
}

function FlashCardAdminItem(props: Props) {
  const {
    flashCard: {question_text, question_img_url, answer_text, answer_img_url},
    flashCardCategory,
  } = props;

  return (
    <Container>
      <FlexContainer>
        <CardFace style={{backgroundImage: `url(${question_img_url})`}}>
          {question_text && <span>{question_text}</span>}
        </CardFace>

        <CardFace style={{backgroundImage: `url(${answer_img_url})`}}>
          {answer_text && <span>{answer_text}</span>}
        </CardFace>
      </FlexContainer>

      {flashCardCategory && (
        <CategoryName>
          <div>{flashCardCategory.name}</div>
        </CategoryName>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #eee;
`;

const CategoryName = styled.div`
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

const FlexContainer = styled.div`
  display: flex;
`;

const CardFace = styled.div`
  width: 130px;
  height: 130px;
  min-width: 130px;
  min-height: 130px;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  > span {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0 1rem;
  }

  &:first-child {
    border-right: 1px solid #eee;
  }
`;

export default FlashCardAdminItem;
