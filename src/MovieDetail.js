import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DatasetContext } from './DatasetContext';
import './MovieDetail.css';

function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { dataset } = useContext(DatasetContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the active JSON file based on the dataset context.
  useEffect(() => {
    fetch(`/${dataset}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movies:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [dataset]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  // Find the movie with the matching ID.
  const movie = movies.find(m => m.id === movieId);
  if (!movie) {
    return (
      <div className="movie-detail-container">
        <div className="back-link">
          <Link to="/">← Back to Home</Link>
        </div>
        <p>Movie not found.</p>
      </div>
    );
  }

  // Calculate indices for navigation.
  const currentIndex = movies.findIndex(m => m.id === movieId);
  const nextIndex = (currentIndex + 1) % movies.length;
  const prevIndex = (currentIndex - 1 + movies.length) % movies.length; // ensures wrap-around
  const nextMovieId = movies[nextIndex].id;
  const prevMovieId = movies[prevIndex].id;

  const handleNext = () => {
    navigate(`/movie/${nextMovieId}`);
  };

  const handlePrev = () => {
    navigate(`/movie/${prevMovieId}`);
  };

  return (
    <div className="movie-detail-container">
      <div className="back-link">
        <Link to="/">← Back to Home</Link>
      </div>
      <div className="movie-detail-content">
        <h1 className="movie-title">{movie.title}</h1>
        <p className="movie-description">{movie.description}</p>
        {movie.videoUrl ? (
          <div className="video-wrapper">
            <video key={movie.id} className="movie-video" controls>
              <source src={movie.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <p className="no-video">No video available.</p>
        )}
        <div className="navigation-buttons">
          <button className="prev-button" onClick={handlePrev}>
            Previous
          </button>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;