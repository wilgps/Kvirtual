import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./index.css";

interface MathGameProps {}

interface MathGameState {
  Operator: string;
  number1: number;
  number2: number;
  points: number;
  result: number;
}

enum MathOperators {
  None = "",
  Addition = "+",
  Subtraction = "-",
  Division = "/",
  Mutiplication = "x",
}

class MathGame extends React.Component<MathGameProps, MathGameState> {
  constructor(props: MathGameProps) {
    super(props);
    this.state = {
      Operator: "",
      number1: 0,
      number2: 0,
      points: 0,
      result: 0,
    };
  }

  getRandonNumber = (seed: number): number => {
    let num = Math.floor(Math.random() * seed);
    if (this.state.Operator === "/" && num === 0) num = 1;
    return num;
  };
  generateNextOperation = () => {
    this.setState({
      number1: this.getRandonNumber(11),
      number2: this.getRandonNumber(11),
    });
  };

  listOperations = () => {
    return Object.values(MathOperators).filter((x) => !!x);
  };
  formartClassButtonOperation = (operation: string): string => {
    switch (operation) {
      case "+":
        return "outline-primary";
      case "-":
        return "outline-success";
      case "/":
        return "outline-warning";
      case "x":
        return "outline-danger";
      default:
        return "outline-danger";
    }
  };

  setCurrentOperator = (e: React.MouseEvent, operator: string) => {
    e.preventDefault();
    this.setState({ Operator: operator });
    this.generateNextOperation();
  };

  handlerCalculate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (this.CalculateResult()) {
      let point = this.state.points + 1;
      this.setState({ points: point });
    }
    this.generateNextOperation();
    this.setState({ result: 0 });
  };

  CalculateResult = (): boolean => {
    let result = 0;
    switch (this.state.Operator) {
      case "+":
        result = this.state.number1 + this.state.number2;
        break;
      case "-":
        result = this.state.number1 - this.state.number2;
        break;
      case "/":
        result = this.state.number1 / this.state.number2;
        break;
      case "x":
        result = this.state.number1 * this.state.number2;
        break;
      default:
        result = 0;
        break;
    }
    return result === this.state.result;
  };

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <div className="page-container register-container">
            <Container>
              <Row>
                <Col md={12}>
                  <span>Pontos: {this.state.points}</span>
                  <br />
                  <br />
                  <div className="btn-operator-group">
                    Operações:
                    {this.listOperations().map((x, i) => (
                      <Button
                        key={i}
                        onClick={(e) => this.setCurrentOperator(e, x)}
                        variant={this.formartClassButtonOperation(x)}
                        className=""
                      >
                        {x}
                      </Button>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {!!this.state.Operator && (
                    <Form
                      onSubmit={(e) => this.handlerCalculate(e)}
                      className="question-math"
                    >
                      {`${this.state.number1} ${this.state.Operator} ${this.state.number2} = `}
                      <Form.Control
                        type="number"
                        className="result-math"
                        onChange={(e) =>
                          this.setState({ result: Number(e.target.value) })
                        }
                      ></Form.Control>
                      <Button variant="success" type="submit">
                        Calcular
                      </Button>
                    </Form>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default MathGame;
