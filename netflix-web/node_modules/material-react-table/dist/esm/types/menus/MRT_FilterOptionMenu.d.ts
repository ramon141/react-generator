import { type MRT_Header, type MRT_InternalFilterOption, type MRT_Localization, type MRT_TableInstance } from '../types';
export declare const mrtFilterOptions: (localization: MRT_Localization) => MRT_InternalFilterOption[];
interface Props<TData extends Record<string, any> = {}> {
    anchorEl: HTMLElement | null;
    header?: MRT_Header<TData>;
    onSelect?: () => void;
    setAnchorEl: (anchorEl: HTMLElement | null) => void;
    setFilterValue?: (filterValue: any) => void;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_FilterOptionMenu: <TData extends Record<string, any> = {}>({ anchorEl, header, onSelect, setAnchorEl, setFilterValue, table, }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
