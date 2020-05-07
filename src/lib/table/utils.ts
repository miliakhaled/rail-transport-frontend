import { useState } from "react";

export interface PaginationType {
  rowPerPage: number;
  page: number;
  onRowPerPageChange: (rowPerPage: number) => void;
  onPageChange: (rowPerPage: number) => void;
}

export const usePagination = (
  rows: number = 10,
  p: number = 0
): PaginationType => {
  const [rowPerPage, setRowPerPage] = useState<number>(rows);
  const [page, setPage] = useState<number>(p);
  return {
    rowPerPage,
    page,
    onRowPerPageChange: setRowPerPage,
    onPageChange: setPage,
  };
};
