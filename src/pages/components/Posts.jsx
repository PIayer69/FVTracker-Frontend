import { useState, useEffect } from "react"

import '../assets/posts.css';
import axiosInstance from "../../axios"
import MonthPosts from "./MonthPosts";
import PostSaveEdit from "./PostSaveEdit";


const Posts = () => {
  const [posts, setPosts] = useState({});
  const initialForm = Object.freeze({
    date: '',
    sent: '',
    received: '',
    produced: '',
    user: 1
  });

  //State by which posts are displayed and requested
  //Defaults to curent year
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  //If set to true inputs for new post are shown 
  const [newPost, setNewPost] = useState(true);

  //Years that are available to select
  const [availableYears, setAvailableYears] = useState([]);

  //State that holds all post for every requested year
  const [allPosts, setAllPosts] = useState({});

  useEffect(() => {
    setAllPosts((prev) => ({...prev, [year]: posts}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts])


  useEffect(() => {
    //Check if year is cached in allPosts
    //If it is we're using posts previously remembered
    if(year in allPosts){
      setPosts(allPosts[year]);
    } 
    
    //In other case we call an API
    else{
      axiosInstance
      .get('/posts/' + year + '/')
      .then(res => {
          //Setting needed data
          res.data ? setPosts(res.data.posts) : setPosts([]);
          setAvailableYears(res.data.years);
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);


  const toggleNewPost = () => {
    setNewPost(prev => !prev);
  }

  const addPost = (form) => {
    console.log(JSON.stringify(form))
    axiosInstance
    .post('/posts/', JSON.stringify(form))
    .then(res => {
      console.log(res.data);
    })
  }

  return (
    <div>
        Your posts:
        Select year:
        <select name="year" value={year} onChange={(e) => setYear(e.target.value)} id="">
          {
            availableYears.map(year => (<option key={year} value={year}>{year}</option>))
          }
        </select>
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
              newPost && <PostSaveEdit onAccept={addPost} onCancel={toggleNewPost} initialForm={initialForm}/>
            }
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