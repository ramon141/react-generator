import { type RefObject } from 'react';
import { type MRT_Cell, type MRT_TableInstance } from '../types';
interface Props {
    cell: MRT_Cell;
    rowRef: RefObject<HTMLTableRowElement>;
    table: MRT_TableInstance;
}
export declare const MRT_TableBodyRowGrabHandle: ({ cell, rowRef, table }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
