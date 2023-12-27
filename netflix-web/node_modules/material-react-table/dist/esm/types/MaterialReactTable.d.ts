import { MRT_AggregationFns } from './aggregationFns';
import { MRT_FilterFns } from './filterFns';
import { MRT_SortingFns } from './sortingFns';
import { type MaterialReactTableProps } from './types';
export { MRT_AggregationFns, MRT_FilterFns, MRT_SortingFns };
export declare const MaterialReactTable: <TData extends Record<string, any> = {}>({ aggregationFns, autoResetExpanded, columnResizeMode, defaultColumn, defaultDisplayColumn, editingMode, enableBottomToolbar, enableColumnActions, enableColumnFilters, enableColumnOrdering, enableColumnResizing, enableDensityToggle, enableExpandAll, enableExpanding, enableFilterMatchHighlighting, enableFilters, enableFullScreenToggle, enableGlobalFilter, enableGlobalFilterRankedResults, enableGrouping, enableHiding, enableMultiRowSelection, enableMultiSort, enablePagination, enablePinning, enableRowSelection, enableSelectAll, enableSorting, enableStickyHeader, enableTableFooter, enableTableHead, enableToolbarInternalActions, enableTopToolbar, filterFns, icons, layoutMode, localization, manualFiltering, manualGrouping, manualPagination, manualSorting, positionActionsColumn, positionExpandColumn, positionGlobalFilter, positionPagination, positionToolbarAlertBanner, positionToolbarDropZone, rowNumberMode, selectAllMode, sortingFns, ...rest }: MaterialReactTableProps<TData>) => import("react/jsx-runtime").JSX.Element;
/**
 * @deprecated Use named exports instead of default export (will be removed in v2)
 * @example import { MaterialReactTable } from 'material-react-table';
 */
export default MaterialReactTable;
