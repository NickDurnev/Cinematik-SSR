const MoviePage = ({ params }: { params: { movieId: string } }) => {
  const { movieId } = params;
  return <div>Movie: {movieId}</div>;
};

export default MoviePage;
