import SelectReact from 'react-select';

const SELECT_FOCUS = {
    color: "var(--cui-input-focus-color, rgba(44, 56, 74, 0.95))",
    backgroundColor: "var(--cui-input-focus-bg, #fff)",
    borderColor: "var(--cui-input-focus-border-color, #998fed)",
    outline: "0",
    boxShadow: "0 0 0 0.25rem rgba(50, 31, 219, 0.25)",
    border: "none"
}

const SELECT_INVALID = {
    color: "rgba(44, 56, 74, 0.95)",
    backgroundColor: "var(--cui-input-focus-bg, #fff)",
    borderColor: "#e55353",
    '&:hover': {
        color: "rgba(44, 56, 74, 0.95)",
        backgroundColor: "var(--cui-input-focus-bg, #fff)",
        borderColor: "#e55353",
    }
}

export default function Select({ isInvalid, ...props }) {

    return (
        <SelectReact
            {...props}
            noOptionsMessage={() => 'Não há opções'}
            menuPortalTarget={document.body}
            isLoading={typeof props.isLoading === 'boolean' ? props.isLoading : !props?.options || props?.options.length === 0}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    ...(state.isFocused ? SELECT_FOCUS : {}),
                    ...(isInvalid ? SELECT_INVALID : {}),
                })
            }}
        />
    )
}