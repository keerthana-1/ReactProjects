import { useEffect, useRef, useState } from "react";
import './index.css';
import StarRating from "./StarRating";
import { useMovie } from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr:any) =>
  arr.reduce((acc:any, cur:any, i:any, arr:any) => acc + cur / arr.length, 0);

const KEY="790c93de"

export default function App() {
  // const [watched, setWatched] = useState(tempWatchedData);
 
  const [query, setQuery] = useState("");
  const [selectedId,setSelectedId] = useState("");
  
  const [watched, setWatched] = useLocalStorageState([],"watched")

  function handleSelectedMovie(id:any){
    setSelectedId((selectedId)=> id===selectedId?null:id);
  }

  function handleCloseDetails(){
    setSelectedId("")
  }

  function handleWatchedMovie(newWatchedMovie:any){
    setWatched((watched:any)=>[...watched,newWatchedMovie])
  }

  function handleDeleteWatched(id:any){
    setWatched((watched:any)=>watched.filter((movie:any)=>movie.imdbID!==id))
  }

  

  const {movies,isLoading,error} = useMovie(query);
  
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        /> */}
        <Box>
          {/* { isLoading? <Loader></Loader> : <MovieList movies={movies} />} */}

          {isLoading && <Loader></Loader>}
          {!isLoading && !error && <MovieList movies={movies} onMovieSelected={handleSelectedMovie}/> }
          {error && <ErrorMessage message={error}></ErrorMessage>}

        </Box>
        <Box>
          {
            selectedId? <MovieDetails watched={watched} selectedId={selectedId} onCloseDetails={handleCloseDetails} onAddWatched={handleWatchedMovie}></MovieDetails>
            :
            <>
            <WatchedSummary watched={watched} />
            <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched}/>
            </>
          }
          
        </Box>
      </Main>
    </>
  );
}



function Loader(){
  return(
    <p className="loader">Loading...</p>
  )
}

function ErrorMessage({message}:any){
  return(
    <p className="error"><span>⛔️</span>{message}</p>
  )
}


function NavBar({ children }:any) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({query,setQuery}:any) {
  
  const inputele=useRef<HTMLInputElement>(null);


  useKey("Enter",function(){
    if(document.activeElement === inputele.current) return;
        if(inputele.current!==null)
           inputele.current.focus()
           setQuery("")
  })
  
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputele}
    />
  );
}

function NumResults({ movies }:any) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }:any) {
  return <main className="main">{children}</main>;
}

function Box({ children }:any) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies ,onMovieSelected}:any) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie:any) => (
        <Movie movie={movie} key={movie.imdbID} onMovieSelected={onMovieSelected} />
      ))}
    </ul>
  );
}
function Movie({ movie,onMovieSelected }:any) {
  return (
    <li key={movie.imdbID} onClick={()=>{onMovieSelected(movie.imdbID)}}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

interface MovieDetailsData {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

function MovieDetails({selectedId,onCloseDetails,onAddWatched,watched}:any){

  const [movie,setMovie]=useState<Partial<MovieDetailsData>>({})
  const [loading,setLoading] = useState(false)
  const [userRating,setUserRating]=useState(0)
  const isWatched = watched.map((movie:any)=>movie.imdbID).includes(selectedId)
  const watchedUserRating=watched.find((movie:any)=>movie.imdbID===selectedId)?.userRating

  const {
    Title: title = '',
    Year: year = '',
    Poster: poster = '',
    Runtime: runtime = '',
    imdbRating = '',
    Plot: plot = '',
    Released: released = '',
    Actors: actors = '',
    Director: director = '',
    Genre: genre = '',
  } = movie || {};

  const ratingCount=useRef(0);

  useEffect(function(){
    if (userRating>0) {
      ratingCount.current=ratingCount.current+1
    }

  },[userRating])

  function handleAddToWatch(){

    const newWatchedMovie={
      imdbId:selectedId,
      title,
      year,
      poster,
      imdbRating:Number(imdbRating),
      runtime:Number(runtime.split(" ").at(0)),
      userRating,
      userRatingDecisionCount:ratingCount.current
    }

    onAddWatched(newWatchedMovie)
    onCloseDetails()
  }

  useEffect(function (){

    async function fetchMovieDetails(){

      setLoading(true)
      const res= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data= await res.json()
      setMovie(data)
      setLoading(false)
      
    }
    fetchMovieDetails();
  },[selectedId])

 
  useKey("Escape",onCloseDetails)

  useEffect(function(){
    if(!title) return
    document.title = `Movie | ${title}`

    return function(){
      document.title="usePopcorn"
    }
  },[title])

  return(

    loading ? 

    <Loader></Loader> :

    <div className="details">
      <header>
    <button className="btn-back" onClick={onCloseDetails}>&larr;</button>
    <img src={poster} alt="image"></img>
    <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} Rating
              </p>
            </div>
            </header>
          <section>
            <div className="rating">
                 {isWatched ? <p> you rated this movie {watchedUserRating} </p> : 
                 <>
                 <StarRating
                    maxRating={10}
                    size={24} 
                    onSetRating={setUserRating}
                  />

                    {userRating>0 && <button className="btn-add" onClick={handleAddToWatch}> + Add to watched</button>}
           
                 </>
                 
                 } 
                  </div>
            <p>
              <em>{plot}</em>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </p>
          </section>
    </div>
  )
}

function WatchedSummary({ watched }:any) {
  const avgImdbRating = average(watched.map((movie:any) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie:any) => movie.userRating));
  const avgRuntime = average(watched.map((movie:any) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched,onDeleteWatched }:any) {
  return (
    <ul className="list">
      {watched.map((movie:any) => (
        <WatchedMovie  onDeleteWatched={ onDeleteWatched} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie,onDeleteWatched }:any) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={()=>onDeleteWatched(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}

// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }