import { type MRT_TableInstance } from '../types';
interface Props<TData extends Record<string, any> = {}> {
    anchorEl: HTMLElement | null;
    isSubMenu?: boolean;
    setAnchorEl: (anchorEl: HTMLElement | null) => void;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_ShowHideColumnsMenu: <TData extends Record<string, any> = {}>({ anchorEl, setAnchorEl, table, }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
