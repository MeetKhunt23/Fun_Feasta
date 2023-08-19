import "./App.css";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Eventdetails from "./components/eventdetails/Eventdetails";
import Signup from "./components/authentication/signup";
import Singleevent from "./components/singleevent/singleevent";
import Login from "./components/authentication/login";
import Bookings from "./components/bookings/bookings";
import Addevent from "./components/addevent/addevent";
import Adminpanel from "./components/adminpanel/adminpanel";
import Admineventtickets from "./components/admineventticket/admineventtickets";
import Likedlist from "./components/likedlist/likedlist";
import Signuppage from "./components/authentication/signuppage";
import Signupp from "./components/authentication/signupp";
import Userprofile from "./components/authentication/userprofile";
import Updateprofile from "./components/authentication/updateprofile";
import Changepassword from "./components/authentication/changepassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventdetails/:id" element={<Eventdetails />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signupp" element={<Signupp/>} />
          <Route path="/eventdetail/:id" element={<Singleevent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mybookings" element={<Bookings />} />
          <Route path="/addevent" element={<Addevent />} />
          <Route path="/adminpanel" element={<Adminpanel />} />
          <Route path="/admineventtickets/:id" element={<Admineventtickets />} />\
          <Route path="/myliked_events" element={<Likedlist/>} />
          <Route path="/userprofile" element={<Userprofile/>} />
          <Route path="/updateprofile" element={<Updateprofile/>} />
          <Route path="/changepassword" element={<Changepassword/>} />


        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
