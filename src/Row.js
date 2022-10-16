import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(
                    (item) =>
                        ((isLargeRow && item.poster_path) ||
                            (!isLargeRow && item.backdrop_path)) && (
                            <img
                                key={item.id}
                                className={`row__poster ${
                                    isLargeRow && "row__posterLarge"
                                }`}
                                src={`${base_url}${
                                    isLargeRow
                                        ? item?.poster_path
                                        : item?.backdrop_path
                                }`}
                                alt={item?.name}
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default Row;
