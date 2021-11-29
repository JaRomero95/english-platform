import React from 'react';
import {Paper} from '@mui/material';
import styled from 'styled-components';

interface Props {}

class AppPaper extends React.Component<Props> {
  render() {
    const {children} = this.props;

    return <StyledPaper>{children}</StyledPaper>;
  }
}

const StyledPaper = styled(Paper)`
  padding: 1rem;
`;

export default AppPaper;
