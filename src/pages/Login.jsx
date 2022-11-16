import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    login: '',
    loading: false,
    loginField: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleButton = async () => {
    const { login } = this.state;
    this.setState({
      loading: true,
      loginField: false,
    });
    await createUser({ name: login });
    this.setState({
      loading: false,
      loginField: true,
    });
  };

  render() {
    const {
      login,
      loading,
      loginField,
    } = this.state;
    const minLength = 3;
    return (
      <div data-testid="page-login">
        { loading === true ? (<h1>Carregando...</h1>) : (
          <form>
            <label htmlFor="nome">
              Nome:
              <input
                type="text"
                name="login"
                placeholder="Login do usuário"
                data-testid="login-name-input"
                value={ login }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              name="button"
              data-testid="login-submit-button"
              onClick={ this.handleButton }
              disabled={ login.length < minLength }
            >
              Entrar
            </button>
          </form>
        )}
        { loginField && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
