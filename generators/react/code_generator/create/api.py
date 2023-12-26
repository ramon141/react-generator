from classes.Model import Model

def create_api(model: Model):
    path = model.get_name().lower()
    html = """
import api from "./axios";

async function post(data) {
    return api.post('/""" + path + """', data);
}

function get(id = false) {
    if (id)
        return api.get(`/""" + path + """/${id}`);
    return api.get('/""" + path + """');
}

async function put(id, data) {
    return api.put(`/""" + path + """/${id}`, data);
}

function del(id) {
    return api.delete(`/""" + path + """/${id}`);
}

export const """ + model.get_name() + """API = {
    post,
    put,
    del,
    get
}
    """
    return html