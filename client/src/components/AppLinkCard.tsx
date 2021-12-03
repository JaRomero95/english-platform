import React from 'react';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import LinkOptions from 'models/LinkOptions';

class HomePage extends React.Component<LinkOptions> {
  render() {
    const {path, title, icon} = this.props;

    return (
      <LinkWrapper to={path!}>
        <StyledPaper>
          <IconWrapper>{icon}</IconWrapper>

          <PaperTitle>{title}</PaperTitle>
        </StyledPaper>
      </LinkWrapper>
    );
  }
}

const IconWrapper = styled.div`
  margin-right: 0.6rem;
  svg {
    font-size: 2.8em;
  }
`;

const LinkWrapper = styled(Link)`
  display: inline-block;
  width: 100%;
  text-decoration: none;
  margin-bottom: 1.5rem;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

const PaperTitle = styled.span`
  display: block;
  font-size: 1.8em;
`;

export default HomePage;
