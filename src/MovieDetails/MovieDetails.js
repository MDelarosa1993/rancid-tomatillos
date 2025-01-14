import './MovieDetails.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${movieId}`)
      .then(response => response.json())
      .then(movieDetails => {
        console.log(movieDetails)
        setDetails({
          ...movieDetails,
          genre_ids: JSON.parse(movieDetails.genre_ids), // Parse genre_ids
        });
      })
      .catch(error => {
        console.log('Error fetching movie details:', error);
      });
  }, [movieId]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='movie-details'>
        <div className='image-container'>
          <img src={details.backdrop_path} alt={details.title} />
        </div>
        <h2>{details.title}</h2>
        <div className="genre-button-container">
          {details.genre_ids.map((genre, index) => (
            <button key={index} className="genre-button">
              {genre}
            </button>
          ))}
        </div>

        <p>{ details.overview }</p>
      </div>
    </div>
  );
}

export default MovieDetails;
