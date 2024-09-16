import useFetch from "../hooks/useFetch";

const FetchingNews = () => {
    const { data, error } = useFetch('news');

    if (error) {
      return <p>An error occurred</p>;
    }
  
    return (
      <>
        {data?.map((news) => {
          return (
            <div key={news.id}>
              <p>{news.headline}</p>
              <p>{news.abstract}</p>
              <p>{news.body}</p>
            </div>
          );
        })}
      </>
    );
  };


  
export default FetchingNews;