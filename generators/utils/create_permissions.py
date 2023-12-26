def create_permissions(paths, model, route, method, roles):
    for path in paths[model]:
        if path["url"] == route and path["method"] == method.lower():
            path["roles"] = roles

    return paths