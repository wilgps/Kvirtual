import React from "react";
import RegisterComponent from "../../components/Register";
import "./index.css";
interface RegisterPageProps {}

interface RegisterPageState {}

class RegisterPage extends React.Component<
  RegisterPageProps,
  RegisterPageState
> {
  constructor(props: RegisterPageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="page">
        <div className="page-container register-container">
          <div className="container">
            <RegisterComponent></RegisterComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
