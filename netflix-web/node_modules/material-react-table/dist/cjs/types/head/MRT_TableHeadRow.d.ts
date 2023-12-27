import { type VirtualItem } from '@tanstack/react-virtual';
import { type MRT_HeaderGroup, type MRT_TableInstance } from '../types';
interface Props {
    headerGroup: MRT_HeaderGroup;
    table: MRT_TableInstance;
    virtualColumns?: VirtualItem[];
    virtualPaddingLeft?: number;
    virtualPaddingRight?: number;
}
export declare const MRT_TableHeadRow: ({ headerGroup, table, virtualColumns, virtualPaddingLeft, virtualPaddingRight, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
