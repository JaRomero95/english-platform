import React from 'react';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import LinkOptions from 'models/LinkOptions';
import stylesConfig from 'config/styles';

interface Props extends LinkOptions {
  className?: string;
}

function HomePage(props: Props) {
  const {path, title, icon, className, disabled = false} = props;

  return (
    <LinkWrapper to={path!} className={className}>
      <StyledPaper>
        <IconWrapper>{icon}</IconWrapper>

        <PaperTitle>{title}</PaperTitle>
      </StyledPaper>

      {disabled && (
        <DisabledLayer
          onClick={(event: React.SyntheticEvent) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <span>Coming Soon</span>
        </DisabledLayer>
      )}
    </LinkWrapper>
  );
}

const IconWrapper = styled.div`
  margin-right: 0.6rem;
  background-color: ${stylesConfig.PRIMARY_COLOR};
  padding: 1rem 0 1rem 20%;
  position: relative;
  height: 80px;

  svg {
    font-size: 60px;
    position: absolute;
    right: -30px;
    top: 10px;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 0.2rem;
  }
`;

const LinkWrapper = styled(Link)`
  position: relative;
  display: inline-block;
  width: 100%;
  text-decoration: none;
`;

const DisabledLayer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: not-allowed;

  > span {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 0.5rem;
    font-size: 0.8em;
    color: ${stylesConfig.PRIMARY_COLOR};
    animation: blink 3s infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

const PaperTitle = styled.span`
  display: block;
  padding-left: 30px;
  font-size: 1.2em;

  @media (min-width: 450px) {
    font-size: 1.4em;
  }
`;

export default HomePage;
