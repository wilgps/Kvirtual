import React from "react";
import Register from "../../components/Register";
import { IUser } from "../../models/user";
import api from "../../services/Api";

interface UpdateUserProps {}

interface UpdateUserState {
  user: IUser;
}

class UpdateUser extends React.Component<UpdateUserProps, UpdateUserState> {
  componentDidMount = () => {
    this.getCurrentUser();
  };
  getCurrentUser = async () => {
    try {
      const response = await api.get("/user");
      console.log(response);
      // response.data;
    } catch (error) {}
  };
  render() {
    return (
      <div className="page">
        <div className="page-container register-container">
          <div className="container">
            <Register></Register>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateUser;
