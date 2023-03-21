import GlobalStyle from "./assets/styles/globalStyles";
import { BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routes/private.routes";
import PublicRoutes from "./routes/public.routes";
import { UserProvider } from "./contexts/UserContext";
import useToken from "./hooks/useToken";

function App() {
  const token = undefined; //useToken();

  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyle />
        {token ? <PrivateRoutes /> : <PublicRoutes />}
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
