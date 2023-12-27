import axios from "axios";
import { useEffect, useState } from "react";

const Usefetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios(url);
        setData(res.data);
      } catch (err) {
        setErr(err);
      }
    };
    fetch()
  }, [url]);

  return { data, loading, err };
};

export default Usefetch;
