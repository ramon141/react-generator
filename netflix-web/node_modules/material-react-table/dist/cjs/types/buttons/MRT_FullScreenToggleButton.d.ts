import { type IconButtonProps } from '@mui/material/IconButton';
import { type MRT_TableInstance } from '../types';
interface Props<TData extends Record<string, any> = {}> extends IconButtonProps {
    table: MRT_TableInstance<TData>;
}
export declare const MRT_FullScreenToggleButton: <TData extends Record<string, any> = {}>({ table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
