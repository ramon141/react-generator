import api from "./axios";
import * as yup from 'yup';

function validPassword(message) {
    return this.test("isValidPassword", message, function (value) {
        const { path, createError } = this;

        if (!value)
            return true;

        // Verificar o comprimento mínimo
        if (value.length < 8) {
            return createError({ path, message: message ?? "A senha deve ter no mínimo 8 caracteres." });
        }

        // Verificar se há pelo menos um dígito
        if (!/[0-9]/.test(value)) {
            return createError({ path, message: message ?? "A senha deve conter pelo menos um dígito." });
        }

        // Verificar se há pelo menos um caractere especial
        if (!/[!@#$%^&*()\-=_+{}[\]|;:",.<>/?]/.test(value)) {
            return createError({ path, message: message ?? "A senha deve conter pelo menos um caractere especial." });
        }

        // Verificar se há pelo menos uma letra minúscula
        if (!/[a-z]/.test(value)) {
            return createError({ path, message: message ?? "A senha deve conter pelo menos uma letra minúscula." });
        }

        return true;
    });
}

yup.addMethod(yup.string, "isValidPassword", validPassword);

const postSchemaValidate = yup.object({
    name: yup.string().required().min(5, "O nome deve conter no mínimo 5 caracteres"),
    email: yup.string().required().email("Email inválido"),
    password: yup.string().nullable().isValidPassword(),
    profile: yup.string().required(),
    institute: yup.string(),
});


function login({ email, password }) {
    const data = {
        email,
        password
    };

    return api.post('/api/login', data);
}

async function post(data) {
    await postSchemaValidate.validate(data, { abortEarly: false })
    return api.post('/api/user', data);
}

function get(id = false) {
    if (id)
        return api.get(`/api/user/${id}`);
    return api.get('/api/user');
}

async function put(id, data) {
    await postSchemaValidate.validate(data, { abortEarly: false })
    return api.put(`/api/user/${id}`, data);
}

async function putPersonal(id, data) {
    await postSchemaValidate.validate(data, { abortEarly: false })
    return api.put(`/api/user/updatePersonal/${id}`, data);
}

function del(id) {
    return api.delete(`/api/user/${id}`);
}

function me() {
    return api.post(`/api/me`);
}

function info() {
    return api.get(`/api/info/periods`);
}

function resetPassword(data) {
    return api.post(`/api/resetPassword`, data);
}

function validateCode(data) {
    return api.post(`/api/validateCode`, data);
}

function updatePassword(data) {
    return api.post(`/api/updatePassword`, data);
}

export const UserAPI = {
    login, post, put, putPersonal, del, get, me, info,
    resetPassword,
    validateCode,
    updatePassword
}

