import { useState, useEffect } from "react"

import '../assets/posts.css';
import axiosInstance from "../../axios"
import MonthPosts from "./MonthPosts";
import Post from './Post';


const Posts = () => {
  const [posts, setPosts] = useState({});

  //State by which posts are filtered
  //Defaults to cuurent year
  const [year, setYear] = useState(new Date().getFullYear());

  //Filtered post are stored here
  const [yearPosts, setYearPosts] = useState([]);


  //Effect used to filter posts by set year
  //Ran when posts are changed
  useEffect(() => {
    setYearPosts(posts[year])
  }, [posts, year]);

    useEffect(() => {
        axiosInstance
        .get('/posts/')
        .then(res => {
            res.data ? setPosts(res.data) : setPosts([]);
        })
    }, [])

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

            </tr>
          </thead>
          <tbody>
            {
                yearPosts 
                ? yearPosts.map((month) => Object.keys(month).map((key, index) => <MonthPosts key={key} setPosts={setPosts} posts={month[key]} month={key} />))
                : <tr><td>Nie ma żadnych wpisów</td></tr>
            }
          </tbody>
        </table>
    </div>
  )
}

export default Posts