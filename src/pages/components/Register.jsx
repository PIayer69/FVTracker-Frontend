import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from '../../axios';

const Register = ({setOverlay}) => {
  const initialForm = Object.freeze({
    username: '',
    email: '',
    password: '',
    password1: ''
  });
  const [form, setForm] = useState(initialForm);
  const [info, setInfo] = useState();

  let navigate = useNavigate();

  const handleChange = (e) => {
    setInfo();
    setForm((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const register = (e) => {
    setInfo();
    e.preventDefault();
    if(form.username === '' || form.email === '' || form.password === '' || form.password1 === ''){
      setInfo('Wypełnij wszystkie pola');
      return null;
    }
    if(form.password !== form.password1){
      setInfo('Hasła są różne');
      return null;
    }
    axiosInstance
    .post('/register/', form)
    .then(res => {
      if(res.status === 201){
        setInfo('Konto utworzone pomyślnie')
        navigate('/home/');
      }
    }) //Navigate to home page (when created)
    .catch(err => setInfo(err.response.data))
  }

  return (
    <div className="box-container">
        <div className="box-title">
            Rejestracja
        </div>
        <form className="box-form" autoComplete="off" onSubmit={(e) => register(e)}>
            <input type="text" name="username" value={form.username} onChange={(e) => handleChange(e)} placeholder="username"/>
            <input type="email" name="email" value={form.email} onChange={(e) => handleChange(e)} placeholder="email"/>
            <input type="password" name="password" value={form.password} onChange={(e) => handleChange(e)} placeholder="hasło"/>
            <input type="password" name="password1" value={form.password1} onChange={(e) => handleChange(e)} placeholder="hasło ponownie"/>
            <input type="submit"  value="Zarejestruj się" />
        </form>
        { info && <div className="box-error">{info}</div> }
        <div className="box-footer">
            Masz już konto? <span className="link pointer transition" onClick={() => setOverlay((prev) => {return {...prev, login:true}})}>Zaloguj się</span>
        </div>
        <div className="box-cross pointer" onClick={() => setOverlay((prev) => {return {...prev, enabled:false}})}>x</div>
    </div>
  )
}

export default Register