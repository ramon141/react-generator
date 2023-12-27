import { toast } from 'react-toastify';


export const toastPromisse = (promisse, messages, configurations = {}) => {

    const CONFIG = {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        closeButton: true,
        ...configurations
    };

    const id = toast.loading(messages.pending, CONFIG);

    promisse
        .then((data) => {
            if (typeof messages.success === 'string') {
                toast.update(id, { ...CONFIG, render: messages.success, type: "success", isLoading: false });
            } else {
                const message = messages.success(data);
                if (message)
                    toast.update(id, { ...CONFIG, render: message, type: "success", isLoading: false });
                else
                    toast.dismiss(id);

            }
        })
        .catch((error) => {
            if (typeof messages.error === 'string') {
                toast.update(id, { ...CONFIG, render: messages.error, type: "error", isLoading: false });
            } else {
                const message = messages.error(error);
                if (message)
                    toast.update(id, { ...CONFIG, render: message, type: "error", isLoading: false });
                else
                    toast.dismiss(id);
            }
        })
}


export const toastError = (message, configurations = {}) => {

    const CONFIG = {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        closeButton: true,
        type: "error",
        ...configurations
    };

    toast.error(message, CONFIG);
}