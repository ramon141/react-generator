import { type DragEventHandler } from 'react';
import { type IconButtonProps } from '@mui/material/IconButton';
import { type MRT_TableInstance } from '../types';
interface Props<TData extends Record<string, any> = {}> {
    iconButtonProps?: IconButtonProps;
    onDragStart: DragEventHandler<HTMLButtonElement>;
    onDragEnd: DragEventHandler<HTMLButtonElement>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_GrabHandleButton: <TData extends Record<string, any> = {}>({ iconButtonProps, onDragEnd, onDragStart, table, }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
