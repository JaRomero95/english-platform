import React from 'react';
import {Paper} from '@mui/material';
import styled from 'styled-components';

interface Props {
  className?: string;
}

class AppPaper extends React.Component<Props> {
  render() {
    const {children, className} = this.props;

    return <StyledPaper className={className}>{children}</StyledPaper>;
  }
}

const StyledPaper = styled(Paper)`
  padding: 1rem;
`;

export default AppPaper;
