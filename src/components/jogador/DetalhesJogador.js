import React from 'react'
import Axios from 'axios'
import { Card, Container, Col, Row} from 'react-bootstrap';

export default class DetalhesJogador extends React.Component {

    constructor(props) {
        super(props)

        this.API_URL = "http://localhost:3000/jogador"
        
        this.state = {
        }

    }

    componentDidMount = () => {
        this.auth()
    }

    auth = () => {
        Axios.post("http://localhost:3000/auth", {
            usuario: "admin",
            senha: "admin"
        }).then((resposta) => {
            if (resposta.status == 200) {
                this.setState({
                    "api_key": resposta.data.key
                })
                this.get()
            } else {
                alert("Erro ao autenticar!")
            }
        })
    }

    get = () => {
        Axios.get(this.API_URL + "/" + this.props.match.params.id + '?key=12k390ADUIJ239JAKL1-94129JD').then((resposta) => {
            if(resposta.status == 200){
                this.setState(resposta.data)
            }else{
                alert("Erro ao buscar dados do jogador!")
            }
        })
    }

    render() {
        return (
            <main>
                <Container style={{ marginTop: '1em' }}>
                    <Card >
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col md={4}><Card.Title>Dados do jogador</Card.Title></Col>
                                </Row>
                            </Container>
                            <Col>
                                <h1>{this.state.nome}</h1>

                                <h6 style={{marginTop: '1em'}}>Apelido</h6>
                                <h2>{this.state.apelido}</h2>

                                <h6 style={{marginTop: '1em'}}>Time</h6>
                                <h2>{this.state.time}</h2>

                                <h6 style={{marginTop: '1em'}}>Posição</h6>
                                <h2>{this.state.posicao}</h2>


                            </Col>
                        </Card.Body>
                    </Card>
                </Container>
            </main>
        )
    }
}