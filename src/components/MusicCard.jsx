import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    load: false,
    getFave: [],
  };

  async componentDidMount() {
    this.handleFavorites();
  }

  handleFavorites = async () => {
    this.setState({
      load: true,
    });
    const response = await getFavoriteSongs();
    this.setState({
      load: false,
      getFave: response,
    });
  };

  handleChange = async ({ target }) => {
    const { single } = this.props;
    const { checked } = target;
    if (checked) {
      this.setState({
        load: true,
      });
      await addSong(single);
    } else {
      this.setState({
        load: true,
      });
      await removeSong(single);
    }
    const response = await getFavoriteSongs();
    this.setState({
      load: false,
      getFave: response,
    });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    const {
      load,
      getFave,
    } = this.state;
    return (
      <div>
        {load ? <Loading /> : (
          <div>
            <h1>{trackName}</h1>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>

            </audio>
            <label htmlFor={ trackId }>
              Favoritar
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name={ trackId }
                id={ trackId }
                checked={ getFave
                  .some((music) => music.trackId === trackId) }
                onChange={ this.handleChange }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
}.isRequired;

export default MusicCard;
