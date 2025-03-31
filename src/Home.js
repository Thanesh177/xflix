import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Xflix</div>
      <ul>
        <li><a href="#hero">Home</a></li>
        <li>TV Shows</li>
        <li>Movies</li>
        <li>New &amp; Popular</li>
        <li>My List</li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>If you wanna watch, watch</h1>
        <p>If not your loss</p>
      </div>
    </section>
  );
}

function MovieRow({ title, movies }) {
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="movies">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <img src={movie.imageUrl} alt={movie.title} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function Home() {
  // State to hold which JSON file to use ("moviesA" or "moviesB").
  const [selectedJson, setSelectedJson] = useState('moviesA');
  const [moviesData, setMoviesData] = useState([]);

  // Fetch the JSON data whenever selectedJson changes.
  useEffect(() => {
    fetch(`/${selectedJson}.json`)
      .then(response => response.json())
      .then(data => setMoviesData(data))
      .catch(error => console.error("Error loading movies:", error));
  }, [selectedJson]);

  // Secret key combination to toggle JSON data.
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Use Ctrl+Shift+X as the secret combination.
      if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        setSelectedJson(prev => (prev === 'moviesA' ? 'moviesB' : 'moviesA'));
        console.log(`Switched data to: ${selectedJson === 'moviesA' ? 'moviesB' : 'moviesA'}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedJson]);

  // Filter the loaded movies by category.
  const trendingMovies = moviesData.filter(movie => movie.category === 'trending');
  const newReleases = moviesData.filter(movie => movie.category === 'newReleases');

  return (
    <div className="home-container">
      <Navbar />
      <Hero />
      <div className="movie-rows">
        <MovieRow title="Trending Now" movies={trendingMovies} />
        <MovieRow title="New Releases" movies={newReleases} />
      </div>
    </div>
  );
}

export default Home;