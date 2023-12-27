import Login from './views/pages/login/Login';
import RegisterUser from './views/User/RegisterUser';
import ListUser from './views/User/ListUser';
import EditUser from './views/User/EditUser';
import Profile from './views/User/Profile';
//end imports

const routes = [
  { path: '/', exact: true, name: 'Início', element: Login },

  /*Usuário*/
  { path: '/user-register', name: 'Registrar Usuário', element: RegisterUser, exact: true },
  { path: '/user-list', name: 'Listar Usuários', element: ListUser, exact: true },
  { path: '/user-edit/:id', name: 'Editar Usuário', element: EditUser, exact: true },
  { path: '/profile', name: 'Indicações por Curso', element: Profile, exact: true },

  //end routes
]

export default routes
