import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/core/Header";
import AllUsers from "./components/user/AllUsers";
import EditProfile from "./components/user/EditUserProfile";
import CreateUser from "./components/user/CreateUser";
import DeleteAccountModal from "./components/user/DeleteAccountModal";
import AssignUserRole from "./components/user/AssignUserRole";
import ViewUserProfile from "./components/user/ViewUserProfile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import TodoList from "./components/todo/TodoList";
import { useSelector } from "react-redux";
import { getLoggedUser } from "./features/usersManagementSlice";

function MainRouter() {
  const loggedUser = useSelector(getLoggedUser);

  return (
    <Router>
      {loggedUser && !loggedUser.error && loggedUser.user && <Header />}
      <AssignUserRole />
      <DeleteAccountModal />
      <Routes>
        <Route
          path="/"
          element={
            loggedUser?.user?.role === "admin" ? (
              <AllUsers />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            loggedUser?.user ? <TodoList /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/viewProfile" element={<ViewUserProfile />} />
        <Route path="/addUser" element={<CreateUser />} />
        <Route
          path="*"
          element={
            loggedUser?.user ? (
              <Navigate
                replace
                to={loggedUser?.user?.role === "admin" ? "/" : "/dashboard"}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default MainRouter;
