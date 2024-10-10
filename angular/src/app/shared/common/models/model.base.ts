import { GridApi, ColumnApi } from "ag-grid-community";

export interface PaginationParamsModel {
    totalCount?: number | undefined;
    totalPage?: number | undefined;
    sorting?: string | undefined;
    skipCount?: number | undefined;
    pageSize?: number | undefined;
    pageNum?: number | undefined;
  }

export interface GridParams {
    api: GridApi,
    columnApi: ColumnApi,
    editingStartedValue: string,
    invalidRcCode?: boolean,
    invalidPartCode?: boolean,
}
