import React from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import { DndComponent, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IVerb } from "../../models/verbs";
import api from "../../services/Api";
import "./index.css";
interface PortugueseGameProps {}

interface PortugueseGameState {
  verbs: IVerb[];
  points: number;
  lifes: number;
  currentVerb: string[];
  usedVerb: number[];
}

class PortugueseGame extends React.Component<
  PortugueseGameProps,
  PortugueseGameState
> {
  /**
   *
   */
  constructor(props: PortugueseGameProps) {
    super(props);
    this.state = {
      verbs: [],
      points: 0,
      lifes: 5,
      currentVerb: [],
      usedVerb: [],
    };
  }
  componentDidMount = () => {
    this.getVerbs();
  };

  shotVerb = (verb: string) => {
    var a = verb.split(""),
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  };

  setRandomVerb = () => {
    let nums = [];
    for (let k = 0; k < this.state.verbs.length; k++) {
      if (this.state.usedVerb.indexOf(k) < 0) nums.push(k);
    }
    const idx = Math.floor(Math.random() * nums.length);
    this.setState({
      currentVerb: Array.from(this.shotVerb(this.state.verbs[idx].Verb)),
    });
  };

  getVerbs = async () => {
    try {
      const response = await api.get("/verb");
      this.setState({ verbs: response.data });
    } catch (error) {
      alert("Erro ao obter a listagem das palavras. Recarregue a Pagina");
    }
  };
  resetLifes = () => {
    this.setState({ lifes: 5 });
  };
  removeLifes = () => {
    this.setState({ lifes: this.state.lifes - 1 });
  };

  startGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.resetLifes();
    this.setState({ usedVerb: [] });
    this.setRandomVerb();
  };

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <div className="page-container register-container">
            <Container>
              {this.state.currentVerb.length === 0 && (
                <Row>
                  <Col md={12}>
                    Clique em começar para iniciar o jogo.
                    <br />
                    <Button variant="primary" onClick={this.startGame}>
                      Começar
                    </Button>
                  </Col>
                </Row>
              )}
              {this.state.currentVerb.length !== 0 && (
                <Row>
                  <Col md={12}>
                    <span>Vidas: {this.state.lifes}</span>
                    <br />
                    <br />
                    <span>Pontos: {this.state.points}</span>
                    <br />
                    <br />
                    <fieldset className="phrase-game">
                      <legend>Coloque a palavra em ordem</legend>
                      <div className="letters">
                        <DndProvider backend={HTML5Backend}>
                          {this.state.currentVerb.map((x, i) => (
                            <span key={i} className="item drag-drop">
                              {x}
                            </span>
                          ))}
                        </DndProvider>
                      </div>
                      <br />
                      <div className="result"></div>
                      <br />
                      <Button variant="outline-success">Checar</Button>
                    </fieldset>
                  </Col>
                </Row>
              )}
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PortugueseGame;
