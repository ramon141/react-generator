from classes.Model import Model
from generators.loopback.read_code.paths import get_paths

def create_api(model: Model):
    path = get_paths()[model.get_name()]
    html = """
import api from "./axios";

async function post(data) {
    return api.post('/""" + path[0]['url'] + """', data);
}

function get(id = false) {
    if (id)
        return api.get(`/""" + path[4]['url'] + """/${id}`);
    return api.get('/""" + path[2]['url'] + """');
}

async function put(id, data) {
    return api.put(`/""" + path[3]['url'] + """/${id}`, data);
}

function del(id) {
    return api.delete(`/""" + path[6]['url'] + """/${id}`);
}

export const """ + model.get_name().capitalize() + """API = {
    post,
    put,
    del,
    get
}
    """
    return html