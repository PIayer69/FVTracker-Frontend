import { useState, useEffect } from "react"

import '../assets/posts.css';
import axiosInstance from "../../axios"
import MonthPosts from "./MonthPosts";


const Posts = () => {
  const [posts, setPosts] = useState({});

  //State by which posts are displayed and requested
  //Defaults to curent year
  const [year, setYear] = useState(new Date().getFullYear());


  useEffect(() => {
      axiosInstance
      .get('/posts/' + year + '/')
      .then(res => {
          res.data ? setPosts(res.data) : setPosts([]);
          console.log(res.data);
      })
  }, [year])

  return (
    <div>
        Your posts:
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Wysłane</th>
              <th>Pobrane</th>
              <th>Wyprodukowane</th>
              <th>Opcje</th>

            </tr>
          </thead>
          <tbody>
            {
                Object.entries(posts).length
                ? Object.keys(posts).map((key, index) => <MonthPosts key={key} setPosts={setPosts} posts={posts[key]} month={key} />)
                : <tr><td colSpan={5}>Nie ma żadnych wpisów</td></tr>
            }
          </tbody>
        </table>
    </div>
  )
}

export default Posts