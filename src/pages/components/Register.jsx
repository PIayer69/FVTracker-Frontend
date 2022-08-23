const Register = ({setOverlay}) => {
  return (
    <div className="box-container">
        <div className="box-title">
            Rejestracja
        </div>
        <form className="box-form">
            <input type="text" name="username" placeholder="username"/>
            <input type="email" name="email" placeholder="email"/>
            <input type="password" name="password" placeholder="hasło"/>
            <input type="password" name="password1" placeholder="hasło ponownie"/>
            <input type="submit" value="Zaloguj" />
        </form>
        <div className="box-footer">
            Masz już konto? <span className="link pointer" onClick={() => setOverlay((prev) => {return {...prev, login:true}})}>Zaloguj się</span>
        </div>
        <div className="box-cross pointer" onClick={() => setOverlay((prev) => {return {...prev, enabled:false}})}>x</div>
    </div>
  )
}

export default Register