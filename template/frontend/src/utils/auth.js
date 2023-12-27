import { toast } from "react-toastify";
import { UserAPI } from "src/api/User";

export const isAuthenticable = () => !!sessionStorage.getItem('token');

export let TOKEN = sessionStorage.getItem('token');
export let ROLE = sessionStorage.getItem('profile');
export let NAME = sessionStorage.getItem('name');
export let EMAIL = sessionStorage.getItem('email');
export let PICTURE = sessionStorage.getItem('picture') === "undefined" ? null : sessionStorage.getItem('picture');
export let PERIOD_REQUEST = sessionStorage.getItem('oppened_period_request') === "null" ? null : parseInt(sessionStorage.getItem('oppened_period_request'));
export let PERIOD_INDICATION = sessionStorage.getItem('oppened_period_indication') === "null" ? null : parseInt(sessionStorage.getItem('oppened_period_indication'));
export let PERIOD_ACCEPT = sessionStorage.getItem('oppened_period_accept') === "null" ? null : parseInt(sessionStorage.getItem('oppened_period_accept'));


export const login = async (response) => {
    const {
        access_token,
        profile,
        name,
        email,
        picture
    } = response.data;

    sessionStorage.setItem('token', access_token);
    sessionStorage.setItem('profile', profile);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('picture', picture);

    TOKEN = access_token;
    ROLE = profile;
    NAME = name;
    EMAIL = email;
    PICTURE = picture || PICTURE;

    const { oppened_period_request, oppened_period_indication, oppened_period_accept } = (await UserAPI.info()).data;

    sessionStorage.setItem('oppened_period_request', oppened_period_request);
    sessionStorage.setItem('oppened_period_indication', oppened_period_indication);
    sessionStorage.setItem('oppened_period_accept', oppened_period_accept);

    PERIOD_REQUEST = !oppened_period_request ? null : parseInt(oppened_period_request);
    PERIOD_INDICATION = !oppened_period_indication ? null : parseInt(oppened_period_indication);
    PERIOD_ACCEPT = !oppened_period_accept ? null : parseInt(oppened_period_accept);
}


export const logout = () => {
    TOKEN = '';
    ROLE = '';
    NAME = '';
    EMAIL = '';
    PERIOD_REQUEST = '';
    PERIOD_INDICATION = '';
    PERIOD_ACCEPT = '';
    PICTURE = '';

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('profile');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('picture');
    sessionStorage.removeItem('oppened_period_request');
    sessionStorage.removeItem('oppened_period_indication');

    window.location.href = '/';
}

export const reloadInformations = () => {
    // UserAPI.me().then((response) => {
    //     login({
    //         data: {
    //             ...response.data,
    //             access_token: TOKEN
    //         }
    //     });
    // })
}

export const tokenExpired = () => {
    if (sessionStorage.getItem('token')) {
        setTimeout(() => logout(), 1000);
        toast.error('Você precisa entrar novamente no sistema.');
    }
}