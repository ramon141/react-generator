import { type RefObject } from 'react';
import { type MRT_Column, type MRT_TableInstance } from '../types';
interface Props {
    column: MRT_Column;
    table: MRT_TableInstance;
    tableHeadCellRef: RefObject<HTMLTableCellElement>;
}
export declare const MRT_TableHeadCellGrabHandle: ({ column, table, tableHeadCellRef, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
