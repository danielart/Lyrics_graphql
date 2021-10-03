import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

const SongList = ({ data, mutate }) => {
  const { songs, loading, refetch } = data;
  const onSongDelete = (id) => {
    mutate({ variables: { id } }).then(() => refetch());
  }

  const renderSongs = () => {
    return songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link
            style={{ fontWeight: 900, color: "black", textTransform: "uppercase" }}
            to={`/songs/${id}`}>
            {title}
          </Link>
          <i
            className="material-icons"
            onClick={() => onSongDelete(id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  return (
    loading
      ? <div>Loading...</div>
      : <div>
        <ul className="collection">
          {renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div >
  );
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);
