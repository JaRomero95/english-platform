import React from 'react';
import FlashCard from 'models/FlashCard';
import styled from 'styled-components';

interface Props {
  flashCard: FlashCard;
}

interface State {}

class FlashCardAdminItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      flashCard: {question_text, question_img_url, answer_text, answer_img_url},
    } = this.props;

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
      </Container>
    );
  }
}

const Container = styled.div`
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #eee;
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

  > span {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0 1rem;
  }
`;

export default FlashCardAdminItem;
