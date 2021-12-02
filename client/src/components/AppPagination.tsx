import React from 'react';
import {Pagination} from '@mui/material';
import styled from 'styled-components';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function AppPagination({page, totalPages, onChange}: Props) {
  return (
    <Container>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, page) => onChange(page)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export default AppPagination;
