import { type VirtualItem } from '@tanstack/react-virtual';
import { type MRT_TableInstance } from '../types';
interface Props {
    table: MRT_TableInstance;
    virtualColumns?: VirtualItem[];
    virtualPaddingLeft?: number;
    virtualPaddingRight?: number;
}
export declare const MRT_TableFooter: ({ table, virtualColumns, virtualPaddingLeft, virtualPaddingRight, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
