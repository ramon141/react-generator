import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './scss/style.scss'
import ForgetPassword from './views/pages/ForgetPassword';
import CodeValidate from './views/pages/CodeValidate';
import DigitPassword from './views/pages/DigitPassword';
import OurTeam from './views/pages/OurTeam';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<DefaultLayout />} />
            <Route exact path="/register" name="Cadastrar" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/forget-password" name="Esqueci minha senha" element={<ForgetPassword />} />
            <Route exact path="/digit-password" name="Digitar Senha" element={<DigitPassword />} />
            <Route exact path="/code-validate" name="Validar Código" element={<CodeValidate />} />
            <Route exact path="/our-team" name="Validar Código" element={<OurTeam />} />


            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>

        <ToastContainer />
      </HashRouter>
    )
  }
}

export default App
