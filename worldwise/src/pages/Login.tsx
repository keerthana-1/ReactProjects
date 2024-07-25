import { FormEvent, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { PageNav } from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const contextValue= useAuth();
  const navigate=useNavigate();

  function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(email && password) contextValue.login(email,password)
  }

  useEffect(function(){
    if(contextValue.isAuthenticated) navigate("/app",{replace:true});
  },[contextValue.isAuthenticated,navigate])

  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}
