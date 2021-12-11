import {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import FlashCard from 'models/FlashCard';

interface Props {
  flashCard: FlashCard;
  fillAvailableSpace?: boolean;
  flippable?: boolean;
  onFlip?: () => void;
}

function calcFontSize(availableWidth: number, fontScalePercent: number) {
  const maxScaleFactor = 28;

  const scaleFactor = (maxScaleFactor / 100) * fontScalePercent;

  const minDivisor = 5;
  const maxDivisor = maxScaleFactor + minDivisor;

  const divisor = maxDivisor - scaleFactor;

  return availableWidth / divisor;
}

function FlashCardShow(props: Props) {
  const [availableWidth, setAvailableWidth] = useState(0);
  const [questionTimeout, setQuestionTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [answerTimeout, setAnswerTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [questionFontSize, setQuestionFontSize] = useState(10);
  const [answerFontSize, setAnswerFontSize] = useState(10);
  const [flipped, setFlipped] = useState(false);

  const {
    onFlip,
    flashCard,
    fillAvailableSpace = true,
    flippable = true,
  } = props;

  const cardElement = useRef(null);

  const getAvailableWidth = (domElement: HTMLDivElement) => {
    if (!domElement) return;

    const parentElement = domElement.parentElement!;
    const availableWidth = parentElement.clientWidth;
    const availableHeight = parentElement.clientHeight;
    const limitedSpace =
      availableWidth < availableHeight ? availableWidth : availableHeight;
    const dimension = limitedSpace * 0.85;
    setAvailableWidth(dimension);
  };

  const flipCard = () => {
    if (!flippable) return;

    onFlip && onFlip();

    setFlipped(!flipped);
  };

  useEffect(() => {
    clearTimeout(questionTimeout!);

    const timeout = setTimeout(() => {
      const fontSize = calcFontSize(
        availableWidth,
        flashCard.question_font_scale_percent
      );

      setQuestionFontSize(fontSize);
    }, 200);

    setQuestionTimeout(timeout);
  }, [availableWidth, flashCard.question_font_scale_percent]);

  useEffect(() => {
    clearTimeout(answerTimeout!);

    const timeout = setTimeout(() => {
      const fontSize = calcFontSize(
        availableWidth,
        flashCard.answer_font_scale_percent
      );

      setAnswerFontSize(fontSize);
    }, 200);

    setAnswerTimeout(timeout);
  }, [availableWidth, flashCard.answer_font_scale_percent]);

  const renderCard = ({
    text,
    imgUrl,
    fontSize,
  }: {
    text: string | null;
    imgUrl: string | null;
    fontSize: number;
  }) => {
    const needOverlay: boolean = !!text && !!imgUrl;

    return (
      <CardContainer onClick={flipCard}>
        {imgUrl && <CardImage src={imgUrl} />}

        {needOverlay && <Overlay />}

        {text && <CardText style={{fontSize}}>{text}</CardText>}
      </CardContainer>
    );
  };

  useEffect(() => {
    if (!fillAvailableSpace) return;

    const styleDimension = `${availableWidth}px`;

    const domElement: HTMLDivElement = cardElement.current!;

    domElement.style.width = styleDimension;
    domElement.style.height = styleDimension;
  }, [availableWidth, fillAvailableSpace]);

  useEffect(() => {
    getAvailableWidth(cardElement.current!);

    window.addEventListener('resize', () =>
      getAvailableWidth(cardElement.current!)
    );
  }, [cardElement]);

  const containerClass = flipped ? 'flipped' : '';

  return (
    <FlipCardContainer className={containerClass} ref={cardElement}>
      {renderCard({
        text: flashCard.question_text,
        imgUrl: flashCard.question_img_url,
        fontSize: questionFontSize,
      })}

      {renderCard({
        text: flashCard.answer_text,
        imgUrl: flashCard.answer_img_url,
        fontSize: answerFontSize,
      })}
    </FlipCardContainer>
  );
}

const FlipCardContainer = styled.div`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  transition: transform 0.3s;
  transform-style: preserve-3d;
  width: 320px;
  height: 320px;
  margin: 0 auto;

  &.flipped {
    transform: rotateY(180deg);
  }
`;

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fff;
  border: 1px solid #aaa;
  box-shadow: 5px 5px 5px #aaa;
  border-radius: 10px;
  text-align: center;
  padding: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  backface-visibility: hidden;
  perspective: 1000px;
  overflow: hidden;

  &:last-child {
    transform: rotateY(180deg);
  }
`;

const CardImage = styled.img`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  object-fit: cover;
  background-color: #fafafa;
  border-radius: 10px;
`;

const Overlay = styled.div`
  display: block;
  position: absolute;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);

  & + * {
    padding: 0.3em;
  }
`;

const CardText = styled.pre`
  font-family: inherit;
  width: 100%;
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export default FlashCardShow;
