import "./App.css";
import Signin from "./Components/Signin";
import NotFound from "./Components/NotFound";
import MainHeader from "./Components/MainHeader";
import Home from "./Components/Home";
import { Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="">
      <Header/>

      <Routes>
        <Route path="/" element={<MainHeader />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Signin text="Sign in" />} />
          <Route path="/signup" element={<Signin text="Sign up" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
