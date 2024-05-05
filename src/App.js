import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import "../src/App.css";
import Navbar from "./components/common/Navbar";
import MessageAlert from "./components/common/MessageAlert";
import RegForm from "./components/users/UserRegForm";
import UserList from "./components/users/UserList";
import UserDetailsView from "./components/users/UserDetailsView";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/index";
import configureStore from "./store/configureStore"; // Import configureStore

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/edit/:userId",
    element: <RegForm />,
  },
  {
    path: "/new",
    element: <RegForm />,
  },
  {
    path: "/details",
    element: <UserDetailsView />,
  },
]);

function App() {
  const store = configureStore(); // Create Redux store

  return (
    <div className="App">
      <Provider store={store}>
        {/* Wrap the app with Provider and pass the store */}

        <ThemeProvider theme={theme}>
          <React.StrictMode>
            <Navbar />
            <MessageAlert />
            <RouterProvider router={router} />
          </React.StrictMode>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
