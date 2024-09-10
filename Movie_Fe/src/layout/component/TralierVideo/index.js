function TrailerVideo({ movieDetail }) {
    return (
        <iframe
            src={`https://www.youtube-nocookie.com/embed/${movieDetail.trailerCode}`}
            width="100%"
            height="100%"
            style={{ borderRadius: '10px', overflow: 'hidden' }}
            title="video"
        ></iframe>
    );
}

export default TrailerVideo;
