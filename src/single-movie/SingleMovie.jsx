import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { getMovies } from "../movieReducer";
import { Link } from "react-router-dom";
import { addReviewAction } from "../reviewReducer";

const SingleMovie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const reviews = useSelector((state) => state.reviews.list);
  const [reviewText, setReviewText] = useState("");
  const [page] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGEwYWQ0MmY4ZDE5M2I1NzY4NjA4NjI5MGNmY2NiNyIsInN1YiI6IjY1NzgyYWM4ZWM4YTQzMDExYTNhNmEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGEwYWQ0MmY4ZDE5M2I1NzY4NjA4NjI5MGNmY2NiNyIsInN1YiI6IjY1NzgyYWM4ZWM4YTQzMDExYTNhNmEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KwYrytkItqPKfolYFpO2p3cDEUHLmaln2xBAII7WrE4",
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
        }));
        dispatch(getMovies(movieList));
        console.log(movieList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [page, dispatch]);

  const { title } = useParams();
  const movie = useSelector((state) =>
    state.movies.list.find((movie) => movie.title === title)
  );

  if (!movie) {
    return <h2>Film nie został znaleziony</h2>;
  }

  const addReview = (e) => {
    e.preventDefault();
    dispatch(addReviewAction(reviewText));
    setReviewText("");
    console.log(reviews);
  };

  return (
    <>
      <div className="movie-inf">
        <Link to={`/`}>
          <button>All</button>
        </Link>
        <div className="movie-content">
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-inf">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
        </div>

        <h2>Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.title}>{review.reviewText}</li>
          ))}
        </ul>
        <form onSubmit={addReview}>
          <input
            type="text"
            name="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button type="submit">Add a review</button>
        </form>
      </div>
    </>
  );
};

export default SingleMovie;
