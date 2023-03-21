import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  PublicMain,
  Form,
  LogoBox,
  Text,
  FormBox,
} from "../../assets/styles/styles";
import useSignUp from "../../hooks/api/useSignIn";
import { toast } from "react-toastify";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();
  const { loadingSignUp, signUp } = useSignUp();

  async function handleSignUp(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("As senhas devem ser iguais!");
    } else {
      try {
        await signUp(email, password, username, picture);
        toast("Inscrito com sucesso! Por favor, faça login.");
        navigate("/sign-in");
      } catch (error) {
        toast("Não foi possível fazer o cadastro!");
      }
    }
  }

  return (
    <PublicMain>
      <LogoBox>
        <h1>Titulo</h1>
        <h2>subtitulo</h2>
      </LogoBox>
      <FormBox>
        <Form onSubmit={handleSignUp}>
          <input
            disabled={loadingSignUp}
            type="email"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            disabled={loadingSignUp}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            disabled={loadingSignUp}
            type="password"
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            disabled={loadingSignUp}
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            disabled={loadingSignUp}
            type="text"
            placeholder="picture url"
            onChange={(e) => setPicture(e.target.value)}
            required
          />
          <button disabled={loadingSignUp} type="submit">
            Sign Up
          </button>
        </Form>
        <Link to={`/`}>
          <Text>Switch back to log in</Text>
        </Link>
      </FormBox>
    </PublicMain>
  );
}
