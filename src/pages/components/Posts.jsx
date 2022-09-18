import { useState, useEffect } from "react";

import '../assets/posts.css';
import axiosInstance from "../../axios"
import MonthPosts from "./MonthPosts";


const Posts = () => {
  const [posts, setPosts] = useState({});

  //State by which posts are displayed and requested
  //Defaults to curent year
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  //Years that are available to select
  const [availableYears, setAvailableYears] = useState([]);

  //State that holds all post for every requested year
  const [allPosts, setAllPosts] = useState({});

  const months = Array.from({length: 12}, (item, i) => i);

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


  const addPost = (form) => {
    //Check if form doesn't have empty fields
    if(Object.values(form).includes('')) {
      //Show message here !!!
      console.log('Empty fields');
      return;
    }
    axiosInstance
    .post('/posts/', JSON.stringify(form))
    .then(res => {
      console.log(res.data);
    })
  }

  return (
    <div className="posts-container">
        <span className="posts-top-container">
          Twoje wpisy:
          <div className="year-select-container">
            Wybierz rok:
            <select name="year" value={year} onChange={(e) => setYear(e.target.value)} className='year-select transition pointer'>
              {
                availableYears.map(year => (<option key={year} value={year}>{year}</option>))
              }
            </select>
          </div>
        </span>
        <table>
          <thead>
            <tr>
              <th></th>
              <th colSpan={2}>Wysłane</th>
              <th colSpan={2}>Pobrane</th>
              <th colSpan={2}>Wyprodukowane</th>
              <th colSpan={2}>Autokonsumpcja</th>
              <th colSpan={2}>Zużycie</th>
              <th colSpan={2}>Nadmiar/niedobór energii</th>
            </tr>
            <tr>
              <th>Data</th>
              <th>Ogólnie</th>
              <th>Miesiąc</th>
              <th>Ogólnie</th>
              <th>Miesiąc</th>
              <th>Ogólnie</th>
              <th>Miesiąc</th>
              <th>Miesiąc</th>
              <th>%</th>
              <th>Miesiąc</th>
              <th>Średnie dzienne</th>
              <th>kWh</th>
              <th>PLN</th>
            </tr>
          </thead>

          <tbody>
            {months.map((month) => <MonthPosts key={month} month={months[month]} post={posts[month - 1]} setPosts={setPosts}/>)}
          </tbody>
        </table>
    </div>
  )
}

export default Posts