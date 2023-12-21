import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "./movieReducer";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmZiMTRmZWRjMjM0YWU2MjAwYWZkZjk5M2JkOTkyNiIsInN1YiI6IjY1NzgyYWM4ZWM4YTQzMDExYTNhNmEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0tq-yLD_p8gbnTiDYxmpkeRTSsUQ7Iu_e4ujldVr5O8",
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
          options
        );
        const data = await response.json();
        const movieList = data.results.map((movie) => ({
          title: movie.title,
          image: movie.poster_path,
          overview: movie.overview,
          page: page,
        }));
        console.log(movieList);
        dispatch(getMovies(movieList));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [page, dispatch]);

  const handlePageChange = (direction) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
    } else if (direction === "right") {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="pages">
        <button onClick={() => handlePageChange("left")}>⬅</button>
        <h2>Page {page}</h2>
        <button onClick={() => handlePageChange("right")}>➡</button>
      </div>
      <div className="movie-grid">
        {movies
          .filter((movie) => movie.page === page)
          .map((movie, index) => {
            return (
              <Link to={`/movie/${movie.title}`} key={index}>
                <div className="movie-card">
                  <img className="poster"
                    src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
                    alt={movie.title}
                  />
                  <h2>{movie.title}</h2>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default MovieList;
