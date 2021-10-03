import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LyricList = ({ lyrics, mutate }) => {
  const onLike = (id, likes) => {
    mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  const renderLyrics = () => {
    return lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }


  return (
    <ul className="collection">
      {renderLyrics()}
    </ul>
  );

}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
