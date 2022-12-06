import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export class Favorites extends Component {
  state = {
    load: false,
    storedFavs: [],
  };

  componentDidMount() {
    this.handleListFave();
  }

  handleListFave = async () => {
    this.setState({
      load: true,
    });
    const response = await getFavoriteSongs();
    this.setState({
      load: false,
      storedFavs: response,
    });
  };

  render() {
    const {
      storedFavs,
      load,
    } = this.state;
    return (
      <div data-testid="page-favorites">
        { load ? <Loading /> : (
          storedFavs.map(({
            trackName,
            trackNumber,
            trackId,
            previewUrl,
          }) => (
            <div key={ trackName }>
              <MusicCard
                trackName={ trackName }
                trackNumber={ trackNumber }
                trackId={ Number(trackId) }
                previewUrl={ previewUrl }
                musicIndex={ storedFavs }
              />
            </div>
          )))}
      </div>
    );
  }
}
Favorites.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
}.isRequired;
export default Favorites;
