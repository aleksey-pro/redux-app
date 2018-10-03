import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTracks } from './actions/tracks';
import { Link } from 'react-router';

class App extends Component {
  addTrack = _ => {
    this.props.onAddTrack(this.trackInput.value);
    this.trackInput.value = '';
  };

  findTrack = _ => {
    console.log(this.searchInput.value);
    this.props.onFindTrack(this.searchInput.value);
  };

  render() {
    console.log(this.props.ownProps);
    return (
      <div>
        <div>
          <input
            type="text"
            // так как мы не хотим хранить локальный state и
            // слушать changeEvent как в коде 'Чистый redux', а просто передавать значение из input,
            // при рендере присваивается ссылка на dom элемент input
            ref={input => {
              this.trackInput = input;
            }}
          />
          <button onClick={this.addTrack}>Add track</button>
        </div>
        <div>
          <input
            type="text"
            // так как мы не хотим хранить локальный state и
            // слушать changeEvent как в коде 'Чистый redux', а просто передавать значение из input,
            // при рендере присваивается ссылка на dom элемент input
            ref={input => {
              this.searchInput = input;
            }}
          />
          <button onClick={this.findTrack}>Find track</button>
        </div>
        <div>
          <button onClick={this.props.onGetTracks}>Get tracks</button>
        </div>
        <ul>
          {this.props.tracks.map((track, index) => (
            <li key={index}>
              <Link to={`/tracks/${track.id}`}>{track.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  // state становится досупен через пропс tracks
  //ownProps содержит все даннные из роутера которые могут понадобитья в redux
  (state, ownProps) => ({
    // tracks: state,  ---В случае "плоских" данных
    //tracks: state.tracks, --- без фильтра
    tracks: state.tracks.filter(track => track.name.includes(state.filterTracks)),
    ownProps,
  }),
  // onAddTrack становится досупен в пропсе компоненты
  dispatch => ({
    onAddTrack: name => {
      const payload = {
        id: Date.now().toString(),
        name,
      };
      dispatch({ type: 'ADD_TRACK', payload });
    },
    onFindTrack: name => {
      dispatch({ type: 'FIND_TRACK', payload: name });
    },
    onGetTracks: () => {
      dispatch(getTracks());
    },
  }),
)(App);
