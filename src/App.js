import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import StudentDetails from "./features/students/StudentDetails";
import StudentList from "./features/students/StudentList";
import { ToastContainer } from "react-toastify";
import BatchList from "./features/batches/BatchList";
import { Home } from "./components/Home/Home";
import Footer from "./components/footer/Footer";
import Login from "./features/admin/Login";
import Header from "./components/header/Header";
function App() {
  return (
    <BrowserRouter>
      <div className="appWrapper">
        <Header></Header>
        <Routes>
          <Route path="" element={<Navigate to="/home" />}></Route>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="home" element={<Home />}></Route>
          {/* <Route path="students" element={<StudentList />}></Route>
          <Route path="students/details" element={<StudentDetails />}></Route>
          <Route path="batches" element={<BatchList />}></Route>
          <Route path="login" element={<Login />}></Route> */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
