import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = 'http://localhost:3000/';

const useFetch = (url: unknown) => {

  const [data, setData] = useState();


  useEffect(() => {
    

    const getData = async () => {
      try {
        const response = await axios.get(`${baseURL}${url}`);
        console.log(`Fetched Data: `, response.data);
        setData(response.data);
      } catch (error) {
        console.log('An error occurred:', error);
      }
    };

    getData();
  }, [url]);

  return {data};
}

export default useFetch;