import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import {IconButton} from '@mui/material';
import {Settings as SettingsIcon} from '@mui/icons-material';
import FlashCard from 'models/FlashCard';

type FlashCardFace = {
  text: string | null;
  imgUrl: string | null;
};

interface Props {
  flashCard: FlashCard;
  onFlip?: () => void;
  onSettings?: () => void;
}

function fillAvailableSquareSpace(domElement: HTMLDivElement) {
  const parentElement = domElement!.parentElement!;
  const availableWidth = parentElement.clientWidth;
  const availableHeight = parentElement.clientHeight;
  const limitedSpace =
    availableWidth < availableHeight ? availableWidth : availableHeight;
  const dimension = `${limitedSpace * 0.85}px`;
  domElement.style.width = dimension;
  domElement.style.height = dimension;
}

function FlashCardShow(props: Props) {
  const [flipped, setFlipped] = useState(false);
  const {onFlip, flashCard, onSettings} = props;
  const cardElement = useRef(null);

  const flipCard = () => {
    onFlip && onFlip();

    setFlipped(!flipped);
  };

  const onSettingsClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    onSettings!();
  };

  const renderCard = ({text, imgUrl}: FlashCardFace) => {
    const alternativeTextClass = imgUrl ? 'alternative-text' : '';

    return (
      <CardContainer onClick={flipCard}>
        {imgUrl && <CardImage src={imgUrl} />}

        {text && <CardText className={alternativeTextClass}>{text}</CardText>}

        {onSettings && (
          <SettingIconContainer>
            <IconButton size="large" onClick={onSettingsClick}>
              <SettingsIcon fontSize="inherit" />
            </IconButton>
          </SettingIconContainer>
        )}
      </CardContainer>
    );
  };

  useEffect(() => {
    fillAvailableSquareSpace(cardElement.current!);

    window.addEventListener('resize', () =>
      fillAvailableSquareSpace(cardElement.current!)
    );
  }, []);

  const containerClass = flipped ? 'flipped' : '';

  return (
    <FlipCardContainer className={containerClass} ref={cardElement}>
      {renderCard({
        text: flashCard.question_text,
        imgUrl: flashCard.question_img_url,
      })}

      {renderCard({
        text: flashCard.answer_text,
        imgUrl: flashCard.answer_img_url,
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
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  backface-visibility: hidden;
  perspective: 1000px;

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

const CardText = styled.span`
  position: relative;
  display: inline-block;
  font-size: 2em;

  &.alternative-text {
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 0 0.5rem;
    border-radius: 10px;
  }
`;

const SettingIconContainer = styled.div`
  position: absolute;
  left: 5px;
  top: 5px;
`;

export default FlashCardShow;
