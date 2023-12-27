import { type MouseEvent } from 'react';
import { type MRT_Row, type MRT_TableInstance } from '../types';
interface Props {
    anchorEl: HTMLElement | null;
    handleEdit: (event: MouseEvent) => void;
    row: MRT_Row;
    setAnchorEl: (anchorEl: HTMLElement | null) => void;
    table: MRT_TableInstance;
}
export declare const MRT_RowActionMenu: ({ anchorEl, handleEdit, row, setAnchorEl, table, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
