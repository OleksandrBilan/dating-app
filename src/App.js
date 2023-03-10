import { AppRoutes } from "./Components/AppRoutes/AppRoutes";
import { AuthService } from "./Services/auth";

import "./styles.css";

function App() {
  const token = AuthService.getToken();
  if (token) {
    AuthService.setAuthTokenToAxios(token);
  }

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
