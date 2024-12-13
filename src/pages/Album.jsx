import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    song: {},
    album: [],
    favoriteSong: [],
  };

  componentDidMount() {
    this.requestMusic();
  }

  requestMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const allMusic = [...response];
    const music = allMusic.shift();
    const favoriteMusic = await getFavoriteSongs();
    this.setState({
      song: music,
      album: allMusic,
      favoriteSong: favoriteMusic,
    });
  };

  render() {
    const { song, album, favoriteSong } = this.state;
    return (
      <div className="page-search">
        <Header />
        <div>
          <span
            className="title-results"
          >
            { song.collectionName }
          </span>
          <div className="field-results">
            <span
              className="album-artist-card"
            >
              { song.artistName }
            </span>
          </div>

          <div className="field-results">
            {
              album.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  single={ music }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  musicSave={ favoriteSong }
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
