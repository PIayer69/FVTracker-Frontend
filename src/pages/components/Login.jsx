import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axiosInstance from "../../axios";

const Login = ({setOverlay}) => {
  const initialForm = Object.freeze({
    username: '',
    password: ''
  });
  const [form, setForm] = useState(initialForm);

  let navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const login = (e) => {
    e.preventDefault();
    axiosInstance
    .post('/token/', form)
    .then(res => {
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      axiosInstance.defaults.headers['Authorization'] = 'JWT ' + res.data.access;
      navigate('/home/');
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="box-container">
        <div className="box-title">
            Logowanie
        </div>
        <form className="box-form" autoComplete="off" onSubmit={e => login(e)}>
            <input type="text" name="username" value={form.username} onChange={(e) => handleChange(e)} placeholder="username"/>
            <input type="password" name="password" value={form.password} onChange={(e) => handleChange(e)} placeholder="hasło"/>
            <input type="submit" value="Zaloguj" />
        </form>
        <div className="box-footer">
            Nie masz jeszcze konta? <span className="link pointer transition" onClick={() => setOverlay((prev) => {return {...prev, login:false}})}>Zarejestruj się</span>
        </div>
        <div className="box-cross pointer" onClick={() => setOverlay((prev) => {return {...prev, enabled:false}})}>x</div>
    </div>
  )
}

export default Login