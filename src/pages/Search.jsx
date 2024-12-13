import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artistInput: '',
    loading: false,
    albuns: [],
    album: '',
    activeButton: false,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
      album: value,
    });
  };

  handleButton = async () => {
    const { artistInput } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(artistInput);
    console.log(response);
    this.setState({
      artistInput: '',
      loading: false,
      activeButton: true,
      albuns: response,
    });
  };

  handleAlbums = () => {
    const { activeButton, albuns } = this.state;

    if (activeButton && albuns.length > 0) {
      return albuns.map((album) => (
        <div
          className="album-artist-card"
          key={ album.collectionId }
        >
          <h5 className="artist-name">{album.artistName}</h5>
          <img
            src={ album.artworkUrl100 }
            alt={ album.collectionName }
          />

          <Link
            className="collection-name"
            to={ `/album/${album.collectionId}` }
          >
            <h4 className="collection-name">{ album.collectionName }</h4>
          </Link>

        </div>
      ));
    }
    if (activeButton && albuns.length === 0) {
      return <h2 className="alert-message">Nenhum álbum foi encontrado</h2>;
    }

    return null;
  };

  render() {
    const { loading, artistInput, album, activeButton } = this.state;
    const minLength = 2;

    return (
      <div className="page-search">
        <Header />
        {loading ? (Loading) : (
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
              disabled={ artistInput.length < minLength }
              onClick={ this.handleButton }
            >
              Procurar
            </button>
          </form>
        )}

        {activeButton && album && (
          <h2 className="title-results">{`Resultado de álbuns de: ${album}`}</h2>
        )}
        <div className="field-results">
          {this.handleAlbums()}
        </div>
      </div>
    );
  }
}

export default Search;
