import React from 'react';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';

interface Props {
  path: string;
  title: string;
  icon: JSX.Element;
}

class HomePage extends React.Component<Props> {
  render() {
    const {path, title, icon} = this.props;

    return (
      <LinkWrapper to={path}>
        <StyledPaper>
          <PaperTitle>{title}</PaperTitle>

          <IconWrapper>{icon}</IconWrapper>
        </StyledPaper>
      </LinkWrapper>
    );
  }
}

const IconWrapper = styled.div`
  > {
    font-size: 50px;
    width: 60px;
  }
`;

const LinkWrapper = styled(Link)``;

const StyledPaper = styled(Paper)`
  width: 17em;
  height: 17em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PaperTitle = styled.span`
  display: block;
  font-size: 2em;
`;

export default HomePage;
