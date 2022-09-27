import { useState, useEffect } from "react";

import '../assets/posts.css';
import axiosInstance from "../../axios"
import MonthPosts from "./MonthPosts";


const Posts = () => {
  const [posts, setPosts] = useState({});
  const [settings, setSettings] = useState({});

  //State by which posts are displayed and requested
  //Defaults to curent year
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  // years available to select from
  // Default: 2013 - current year
  const [startYear, endYear] = [2013, currentYear]
  const availableYears = Array.from({length: endYear - startYear + 1}, (item, i) => startYear + i).reverse()

  //State that holds all post for every requested year
  const [allPosts, setAllPosts] = useState({});

  const [settlementMonths, setSettlementMonths] = useState([]);

  const months = Array.from({length: 12}, (item, i) => i + 1);


  useEffect(() => {
    setAllPosts((prev) => ({...prev, [year]: posts}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);


  useEffect(() => {
    //Check if year is cached in allPosts
    //If it is we're using posts previously remembered
    if(year in allPosts){
      setPosts(allPosts[year]);
    } //In other case we call an API
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

  useEffect(() => {
    axiosInstance
    .get('/user/1/')
    .then(res => {
      if(res.status === 200){
        setSettings(res.data);
        console.log('Settings successfuly loaded');
      };
    })
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const period = settings.settlement_period;
    const month = settings.settlement_month;
    const settlement_months = Array.from({length: 12/period}).map((item, i) => months[(month + i * period - 1)%12]);
    settlement_months.sort((a, b) => a-b);
    setSettlementMonths(settlement_months);
  // eslint-disable-next-line
  }, [settings]);


  //Calling API which returns recalculated posts for set year
  const recalculatePosts = () => {
    axiosInstance
    .patch('posts/', JSON.stringify({year: year}))
    .then(res => {
      setPosts(res.data)
    })
  }

  return (
    <div className="posts-container">
        <span className="posts-top-container">
          Twoje wpisy:
          <div className="options-container">
            <div className="recalculate-btn pointer" onClick={recalculatePosts}>Przelicz</div>
            <div className="year-select-container">
              Wybierz rok:
              <select name="year" value={year} onChange={(e) => setYear(e.target.value)} className='year-select pointer'>
                {
                  availableYears.map(year => (<option key={year} value={year}>{year}</option>))
                }
              </select>
            </div>
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
              <th colSpan={2}>Nadmiar/niedobór energii (miesiąc)</th>
              <th></th>
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
              <th>Zaoszczędzone środki</th>
            </tr>
          </thead>

          <tbody>
            {months.map((month) => <MonthPosts key={month} month={months[month - 1]} post={posts[month]} year={year} setPosts={setPosts} settings={settings} settlementMonth={settlementMonths.includes(month)} />)}
          </tbody>
        </table>
    </div>
  )
}

export default Posts