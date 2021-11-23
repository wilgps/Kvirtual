import React, { FormEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { IUser } from "../../models/user";
import api from "../../services/Api";

interface RegisterComponentProps extends RouteComponentProps {
  user?: IUser;
}

interface RegisterComponentState {}

class RegisterComponent extends React.Component<
  RegisterComponentProps,
  RegisterComponentState
> {
  state: {
    Id: number;
    Name: string;
    Email: string;
    Password: string;
    isInload: boolean;
    error: string;
  };
  constructor(props: RegisterComponentProps) {
    super(props);
    if (!!props.user) {
      this.state = {
        Id: props.user.Id,
        Name: props.user.Name,
        Email: props.user.Email,
        Password: props.user.Password,
        isInload: false,
        error: "",
      };
    } else
      this.state = {
        Id: 0,
        Name: "",
        Email: "",
        Password: "",
        isInload: false,
        error: "",
      };
  }
  handleRedirect = () => {
    const {  history } = this.props;
    let url = "/";    
    history.push(url);
  };
  ValidateUser = (): boolean => {
    let isValid = true;
    let msg: string[] = [];

    if (!this.state.Name) {
      msg.push("O nome é obrigatorio.");
      isValid = isValid && false;
    }
    if (!this.state.Email) {
      isValid = isValid && false;
      msg.push("O e-mail é obrigatorio.");
    }

    if (!this.state.Password) {
      isValid = isValid && false;
      msg.push("O senha é obrigatorio.");
    } else {
      if (this.state.Password.length < 6) {
        msg.push("O senha deve ter pelo menos 6 caracters.");
        isValid = isValid && false;
      }
    }
    if (msg.length > 0) this.setState({ error: msg.join("<br/>") });
    return isValid;
  };

  handlerOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!this.ValidateUser()) return;

    try {
      this.setState({ isInload: true });
      await api.post("/user", this.createObject());
      this.handleRedirect();
    } catch (error: any ) {
      if (error.response.data.message)
        this.setState({ error: error.response.data.message });
      else this.setState({ error: "Ocorreu um erro inesperado." });
    }
    this.setState({ isInload: true });
  };
  createObject = (): IUser => {
    let user: IUser = {
      Id: this.state.Id,
      Name: this.state.Name,
      Email: this.state.Email,
      Password: this.state.Password,
    };
    return user;
  };
  render() {
    return (
      <form onSubmit={this.handlerOnSubmit}>
        <div className="row g-2">
          <div className="col-md-12">
            {" "}
            {this.state.error && (
              <p
                className="error-box"
                dangerouslySetInnerHTML={{ __html: this.state.error }}
              ></p>
            )}
          </div>
          <div className="col-md-12">
            <label htmlFor="txtEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="txtEmail"
              placeholder="name@example.com"
              onChange={(e) => this.setState({ Email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="txtNome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="txtNome"
              placeholder="Elesio da Silva"
              onChange={(e) => this.setState({ Name: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="txtPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="txtPassword"
              onChange={(e) => this.setState({ Password: e.target.value })}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(RegisterComponent);
