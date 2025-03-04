import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artistInput: '',
    loading: false,
    albuns: [],
    album: '',
    activeButton: false };

  shouldComponentUpdate() {
    const { albuns } = this.state;
    return (albuns);
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
      album: value,
    });
  };

  handleButton = async () => {
    const { artistInput } = this.state;
    this.setState({
      loading: true,
    });
    const response = await searchAlbumsAPI(artistInput);
    this.setState({
      artistInput: '',
      loading: false,
      activeButton: true,
      albuns: response,
    });
  };

  handleAlbums = () => {
    const { activeButton, albuns } = this.state;
    const album = albuns
      .map(({
        artista,
        collectionName,
        artistaUrl,
        collectionId,
      }) => (
        <div
          key={ `${collectionId}` }
        >
          <img
            src={ artistaUrl }
            alt={ collectionName }
          />
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
          >
            <h4>{ collectionName }</h4>
          </Link>
          <h5>{ artista }</h5>

        </div>));
    if (activeButton && albuns.length > 0) {
      return album;
    }
    if (activeButton && albuns.length === 0) {
      return <h2>Nenhum álbum foi encontrado</h2>;
    }
  };

  render() {
    const {
      loading,
      artistInput,
      album,
      activeButton,
    } = this.state;
    const minLength = 2;

    return (
      <div className="page-search">
        <Header />
        { loading === true ? (loading) : (
          <form className="search-artist">
            <input
              className="search-artist-input"
              type="text"
              name="artistInput"
              placeholder="Digite o nome do artista ou banda"
              value={ artistInput }
              onChange={ this.handleChange }
            />
            <button
              className="search-artist-button"
              type="button"
              name="button"
              disabled={ artistInput.length < minLength }
              onClick={ this.handleButton }
            >
              Procurar
            </button>
          </form>
        )}
        <div>
          { activeButton ? <h2>{`Resultado de álbuns de: ${album}`}</h2> : null }
          { this.handleAlbums() }
        </div>

      </div>
    );
  }
}

export default Search;
