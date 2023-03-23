import GlobalStyle from "./assets/styles/globalStyles";
import { BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routes/private.routes";
import PublicRoutes from "./routes/public.routes";
import useToken from "./hooks/useToken";

function App() {
  const token = useToken();

  return (
      <BrowserRouter>
        <GlobalStyle />
        {token ? <PrivateRoutes /> : <PublicRoutes />}
      </BrowserRouter>
  );
}

export default App;
