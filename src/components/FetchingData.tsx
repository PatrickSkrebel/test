import useFetch from "../hooks/useFetch";

const FetchingData = () => {
    const { data, error } = useFetch('teamstats');

    if (error) {
      return <p>An error occurred</p>;
    }
  
    return (
      <>
        {data?.map((team) => {
          return (
            <div key={team.id}>
              <p>{team.wins}</p>
              <p>{team.losses}</p>
            </div>
          );
        })}
      </>
    );
  };


  
export default FetchingData;