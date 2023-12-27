import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

const ICONS_STYLE = {
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: 20
};

export default function Table({ columns, data, onEdit, onDelete, canEdit, canDelete, arrayLater, ...config }) {

    const actionsConfig = {
        size: 100,
        enableColumnActions: false,
        enableColumnOrdering: false,
        muiTableBodyCellProps: {
            align: 'center',
        }
    };

    if (onEdit)
        columns.push({
            ...actionsConfig,
            size: 10,
            header: null,
            id: 'edit',
            accessorFn: (row) => canEdit && canEdit(row) ?
                <div onClick={() => onEdit(row)} style={ICONS_STYLE}> <AiFillEdit color="#3399ff" /> </div> :
                false,
        });

    if (onDelete)
        columns.push({
            ...actionsConfig,
            size: 10,
            header: null,
            id: 'delete',
            accessorFn: (row) => !!canDelete && canDelete(row) ?
                <div onClick={() => onDelete(row)} style={ICONS_STYLE}> <BsFillTrashFill color="#eb4d45" /> </div> :
                false,
        });

    if (arrayLater)
        columns = columns.concat(arrayLater);

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            enableColumnFilterModes
            enableColumnOrdering
            enableGlobalFilter={true}
            enableSorting={true}
            localization={MRT_Localization_PT_BR}
            muiTablePaperProps={{
                elevation: 0, //change the mui box shadow
                //customize paper styles
                sx: {
                    borderRadius: '0',
                    border: '1px solid #e0e0e0',
                    boxShadow: 'none'
                },
            }}
            muiTableProps={{
                sx: {
                    tableLayout: 'fixed',
                },
            }}
            enableColumnResizing
            {...config}
        />
    );
}