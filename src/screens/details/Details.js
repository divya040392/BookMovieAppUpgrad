/**
 * This component shows the details of the movie with its trailer video when the released movie
 * tile is clicked in the home page. This page also allows the user to book a show of the same movie
 */

import React, { useState, useEffect } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

const styles = () => ({
  opts: {
    height: '300',
    width: '700',
    playerVars: {
      autoplay: 1,
    },
  },
});

const Details = (props) => {
  const [movie, setMovie] = useState({
    genres: [],
    trailer_url: '',
    artists: [],
  });
  const [starIcons, setStarIcons] = useState([
    {
      id: 1,
      stateId: 'star1',
      color: 'black',
    },
    {
      id: 2,
      stateId: 'star2',
      color: 'black',
    },
    {
      id: 3,
      stateId: 'star3',
      color: 'black',
    },
    {
      id: 4,
      stateId: 'star4',
      color: 'black',
    },
    {
      id: 5,
      stateId: 'star5',
      color: 'black',
    },
  ]);

  useEffect(() => {
    // Get the Movie details
    axios.get(props.baseUrl + 'movies/' + props.match.params.id).then((res) => {
      setMovie(res.data);
    });
  }, []);

  // Navigates to artist wiki page
  const artistClickHandler = (url) => {
    window.location = url;
  };

  // Add ratings
  const starClickHandler = (id) => {
    let starIconList = [];
    for (let star of starIcons) {
      let starNode = star;
      if (star.id <= id) {
        starNode.color = 'yellow';
      } else {
        starNode.color = 'black';
      }
      starIconList.push(starNode);
    }
    setStarIcons(starIconList);
  };

  const opts = {
    height: '300',
    width: '700',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="wrapper">
      <Header
        id={props.match.params.id}
        baseUrl={props.baseUrl}
        showBookShowButton="true"
      />
      <div className="back">
        <Typography>
          <Link to="/"> &#60; Back to Home</Link>
        </Typography>
      </div>
      <div className="flex-containerDetails">
        <div className="left-details">
          <img src={movie.poster_url} alt={movie.title} />
        </div>

        <div className="middle-details">
          <div>
            <h2>{movie.title} </h2>
          </div>
          <br />
          <div>
            <Typography>
              <span className="bold">Genres: </span> {movie.genres.join(', ')}
            </Typography>
          </div>
          <div>
            <Typography>
              <span className="bold">Duration:</span> {movie.duration}{' '}
            </Typography>
          </div>
          <div>
            <Typography>
              <span className="bold">Release Date:</span>{' '}
              {new Date(movie.release_date).toDateString()}{' '}
            </Typography>
          </div>
          <div>
            <Typography>
              <span className="bold"> Rating:</span> {movie.critics_rating}{' '}
            </Typography>
          </div>
          <div className="marginTop16">
            <Typography>
              <span className="bold">Plot:</span>{' '}
              <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}{' '}
            </Typography>
          </div>
          <div className="trailerContainer">
            <Typography>
              <span className="bold">Trailer:</span>
            </Typography>
            <YouTube videoId={movie.trailer_url.split('?v=')[1]} opts={opts} />
          </div>
        </div>

        <div className="right-details">
          <Typography>
            <span className="bold">Rate this movie: </span>
          </Typography>
          {starIcons.map((star) => (
            <StarBorderIcon
              className={star.color}
              key={'star' + star.id}
              onClick={() => starClickHandler(star.id)}
            />
          ))}

          <div className="bold marginBottom16 marginTop16">
            <Typography>
              <span className="bold">Artists:</span>
            </Typography>
          </div>
          <div className="paddingRight">
            <ImageList rowHeight={160} cols={2}>
              {movie.artists != null &&
                movie.artists.map((artist) => (
                  <ImageListItem
                    className="gridTile"
                    onClick={() => artistClickHandler(artist.wiki_url)}
                    key={artist.id}
                  >
                    <img
                      src={artist.profile_url}
                      alt={artist.first_name + ' ' + artist.last_name}
                    />
                    <ImageListItemBar
                      title={artist.first_name + ' ' + artist.last_name}
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Details);
