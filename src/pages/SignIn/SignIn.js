import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
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
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </LogoBox>
      <FormBox>
        <Form onSubmit={handleSignIn}>
          <input
            disabled={loadingSignIn}
            type="email"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            disabled={loadingSignIn}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loadingSignIn}>
            Log In
          </button>
        </Form>
        <Link to={`/sign-up`}>
          <Text>First time? Create an account!</Text>
        </Link>
      </FormBox>
    </PublicMain>
  );
}
