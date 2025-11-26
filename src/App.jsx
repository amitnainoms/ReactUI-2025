import React from "react";
import Welcome from "./Welcome";
import ChatList from "./ChatList";
import DocumentList from "./DocumentList";
import EditUser from "./EditUser";
import Login from "./Login";
import LoginSuccessful from "./LoginSuccessful";
import Register from "./Register";
import RegisterSuccessful from "./RegisterSuccessful";
import UserList from "./UserList";
import Logout from "./Logout";
import Delete from "./Delete";
import PageNotFound from "./PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";


export default class App extends React.Component {
  render() {
  
    return <BrowserRouter>
            <Routes>
                <Route index element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-successful" element={<RegisterSuccessful />} />
                <Route path="/" element={<Nav />}>
                    <Route path="/login-successful" element={<LoginSuccessful />} />
                    <Route path="/edituser" element={<EditUser />} />
                    <Route path="/groupchat" element={<ChatList />} />
                    <Route path="/manageusers" element={<UserList />} />
                    <Route path="/managedocuments" element={<DocumentList />} />
                    <Route path="/delete" element={<Delete />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    
  }
}
