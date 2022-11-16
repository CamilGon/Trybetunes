import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading === true ? (<div>Carregando...</div>)
          : (<div data-testid="header-user-name">{userName}</div>) }
      </header>
    );
  }
}
export default Header;
