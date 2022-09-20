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
  const [availableYears, setAvailableYears] = useState([2021, 2022]);

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
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

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
              <th colSpan={2}>Produkcja (Falownik)</th>
              <th colSpan={2}>Pobrane (1.8.0)</th>
              <th colSpan={2}>Wysłane (2.8.0)</th>
              <th colSpan={2}>Autokonsumpcja (kWh)</th>
              <th colSpan={2}>Zużycie (kWh)</th>
              <th colSpan={2}>Nadmiar/niedobór energii (kWh)</th>
              <th rowSpan={2}>Zaoszczędzone środki</th>
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
            {months.map((month) => <MonthPosts key={month} month={months[month]} post={posts[month + 1]} year={year} setPosts={setPosts}/>)}
          </tbody>
        </table>
    </div>
  )
}

export default Posts