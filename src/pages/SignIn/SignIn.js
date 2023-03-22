import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import pawn from "../../assets/images/pawn.png";
import useSignIn from "../../hooks/api/useSignIn";
import {
  PublicMain,
  Form,
  LogoBox,
  Text,
  FormBox,
} from "../../assets/styles/styles";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserContext);
  const { loadingSignIn, signIn } = useSignIn();

  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      toast("Não foi possível fazer o login!");
    }
  }
  return (
    <PublicMain>
      <LogoBox>
        <img src={pawn} alt="Pawn chess white and green" />
        <h1>MoveMentor</h1>
        <h2>Aprenda xadrez de forma interativa</h2>
      </LogoBox>
      <FormBox>
        <h2>Log In</h2>
        <h3>Faça login em sua conta MoveMentor</h3>

        <Form onSubmit={handleSignIn}>
          <input
            disabled={loadingSignIn}
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            disabled={loadingSignIn}
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loadingSignIn}>
            Log In
          </button>
        </Form>
        <Link to={`/sign-up`}>
          <Text>Ainda não tem uma conta? Inscreva-se gratuitamente!</Text>
        </Link>
      </FormBox>
    </PublicMain>
  );
}
