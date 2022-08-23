const Login = ({setOverlay}) => {
  return (
    <div className="box-container">
        <div className="box-title">
            Logowanie
        </div>
        <form className="box-form" autoComplete="off">
            <input type="text" name="username" placeholder="username"/>
            <input type="password" name="password" placeholder="hasło"/>
            <input type="submit" value="Zaloguj" />
        </form>
        <div className="box-footer">
            Nie masz jeszcze konta? <span className="link pointer" onClick={() => setOverlay((prev) => {return {...prev, login:false}})}>Zarejestruj się</span>
        </div>
        <div className="box-cross pointer" onClick={() => setOverlay((prev) => {return {...prev, enabled:false}})}>x</div>
    </div>
  )
}

export default Login