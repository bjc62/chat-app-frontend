import { UserProvider } from "./context/UserContext";
import HomePage from "./components/HomePage";

function App() {
  return (
    <UserProvider>
      <HomePage></HomePage>
    </UserProvider>
  );
}

export default App;
