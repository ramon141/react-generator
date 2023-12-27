/// <reference types="react" />
import { type VirtualItem, type Virtualizer } from '@tanstack/react-virtual';
import { type MRT_TableInstance } from '../types';
interface Props {
    columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
    table: MRT_TableInstance;
    virtualColumns?: VirtualItem[];
    virtualPaddingLeft?: number;
    virtualPaddingRight?: number;
}
export declare const MRT_TableBody: ({ columnVirtualizer, table, virtualColumns, virtualPaddingLeft, virtualPaddingRight, }: Props) => import("react/jsx-runtime").JSX.Element;
export declare const Memo_MRT_TableBody: import("react").MemoExoticComponent<({ columnVirtualizer, table, virtualColumns, virtualPaddingLeft, virtualPaddingRight, }: Props) => import("react/jsx-runtime").JSX.Element>;
export {};
