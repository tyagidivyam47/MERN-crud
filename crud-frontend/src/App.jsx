/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Home";
import Spinner from "./Spinner/Spinner";
import { Link } from "react-router-dom";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  // console.log(data);

  const fetchDataHandler = async () => {
    setLoading(true);
    const fetchedData = await axios.get(
      "http://localhost:8080/users/all"
    ).catch((err) => {
      setErr(true);
    });
    await setData(fetchedData.data.Users);
    console.log(fetchedData.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataHandler();
  }, []);

  return (
    <div className="App">
      <button>
        <Link to="/add">
          Add User
        </Link>
      </button>

      {loading && <Spinner />}
      {err && <h1>Something went wrong...</h1>}
      {!loading && !err && <Home uData={data} />}
    </div>
  );
}

export default App;
