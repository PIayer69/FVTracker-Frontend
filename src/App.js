import { useEffect, useState } from "react";

import axiosInstance from './axios';

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    axiosInstance
    .get('posts/')
    .then(res => setPosts(res.data))
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
