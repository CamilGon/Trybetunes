import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    artistInput: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      artistInput: value,
    });
  };

  render() {
    const {
      artistInput,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artist-input"
            placeholder="Nome do artista ou banda"
            data-testid="search-artist-input"
            value={ artistInput }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            name="button"
            data-testid="search-artist-button"
            disabled={ artistInput.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
