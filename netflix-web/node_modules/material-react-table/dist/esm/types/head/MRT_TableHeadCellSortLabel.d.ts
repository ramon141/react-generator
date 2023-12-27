import { type MRT_Header, type MRT_TableInstance } from '../types';
import { type TableCellProps } from '@mui/material/TableCell';
interface Props {
    header: MRT_Header;
    table: MRT_TableInstance;
    tableCellProps?: TableCellProps;
}
export declare const MRT_TableHeadCellSortLabel: ({ header, table, tableCellProps, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
