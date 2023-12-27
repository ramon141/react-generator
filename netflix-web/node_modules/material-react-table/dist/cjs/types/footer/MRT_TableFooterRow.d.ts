import { type VirtualItem } from '@tanstack/react-virtual';
import { type MRT_HeaderGroup, type MRT_TableInstance } from '../types';
interface Props {
    footerGroup: MRT_HeaderGroup;
    table: MRT_TableInstance;
    virtualColumns?: VirtualItem[];
    virtualPaddingLeft?: number;
    virtualPaddingRight?: number;
}
export declare const MRT_TableFooterRow: ({ footerGroup, table, virtualColumns, virtualPaddingLeft, virtualPaddingRight, }: Props) => import("react/jsx-runtime").JSX.Element | null;
export {};
