import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

const SongDetail = ({ data, params }) => {
  const { song } = data;

  return (
    !song
      ? <div>Loading...</div>
      : <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={params.id} />
      </div>
  );
}

export default graphql(fetchSong, {
  options: ({ params }) => { return { variables: { id: params.id } } }
})(SongDetail);
