import { useState, useEffect } from "react"
import axiosInstance from "../../axios"

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
    let filtered = [];
    Object.keys(posts).forEach((key) => {
        if (new Date(key).getFullYear() === year) posts[key].map((obj) => filtered.push(obj));
    });
    setYearPosts(filtered);
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
        {
            yearPosts.length 
            ? yearPosts.map((post) => <Post data={post} />)
            : 'Nie ma żadnych wpisów'
        }
    </div>
  )
}

export default Posts