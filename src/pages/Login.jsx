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
      <div className="login-container">
        { loading === true ? (<h1>Carregando...</h1>) : (
          <form className="login-form">
            <input
              className="login-name-input"
              type="text"
              name="login"
              placeholder="Usuário"
              value={ login }
              onChange={ this.handleChange }
            />

            <button
              className="login-button-input"
              type="button"
              name="button"
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
