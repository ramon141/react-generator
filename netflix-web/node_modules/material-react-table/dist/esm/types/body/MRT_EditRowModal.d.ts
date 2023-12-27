import { type MRT_Row, type MRT_TableInstance } from '../types';
interface Props<TData extends Record<string, any> = {}> {
    open: boolean;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_EditRowModal: <TData extends Record<string, any> = {}>({ open, row, table, }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
