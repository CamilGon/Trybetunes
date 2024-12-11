import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    login: '',

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

      loginField: false,
    });
    await createUser({ name: login });
    this.setState({

      loginField: true,
    });
  };

  render() {
    const {
      login,
      loginField,
    } = this.state;
    const minLength = 3;
    return (
      <div className="login-container">
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

        { loginField && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
