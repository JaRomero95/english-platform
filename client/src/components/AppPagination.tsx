import React from 'react';
import {Pagination} from '@mui/material';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function AppPagination({page, totalPages, onChange}: Props) {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(event, page) => onChange(page)}
    />
  );
}

export default AppPagination;
