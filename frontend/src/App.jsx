import Home from "@/pages/home";
import Routing from "@/routes/Router";
import { AuthProvider } from "@/services/authAPI/authProvideAPI";
import { ChatContextProvider } from "./contexts/ChatContext";
import { useContext } from "react";

function App() {

  return (
    <AuthProvider>

      <Routing>
        <Home />
      </Routing>

    </AuthProvider>
  );
}

export default App;
