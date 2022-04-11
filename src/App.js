import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(()=>{

    fetchMoviesHandler();

  },[fetchMoviesHandler])

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
    try{
      const response = await fetch("https://swapi.dev/api/films/");
      
      if(!response.ok ){
        throw new Error('Something Went Wrong!');
      }
      
      const data = await response.json();
      const transformedMovies = data.results.map((result) => {
        return {
          id: result.episode_id,
          title: result.title,
          openingText: result.opening_crawl,
          releaseDate: result.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch(error){
      setError(error.message);
    }
		setIsLoading(false);
	}, [])

  let content = <p>Found No Movies</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }

  if(error){
    content = <p>{error}</p>;
  }

  if (isLoading){
    content = <p>Loading...</p>;
  }

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{content}
			</section>
		</React.Fragment>
	);
}

export default App;
