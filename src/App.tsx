import { UserProvider } from "./context/UserContext";
import HomePage from "./components/HomePage";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <UserProvider>
      <HomePage></HomePage>
    </UserProvider>
  );
}

export default App;
