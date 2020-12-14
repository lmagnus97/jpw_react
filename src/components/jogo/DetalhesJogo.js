import React from 'react'
import Axios from 'axios'
import { Card, Container, Col, Row, Button } from 'react-bootstrap';

export default class DetalhesJogo extends React.Component {

    constructor(props) {
        super(props)

        this.API_URL = "http://localhost:3000/jogo"

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
        Axios.get(this.API_URL + "/" + this.props.match.params.id + '?key=' + this.state.api_key).then((resposta) => {
            if(resposta.status == 200){
                this.setState(resposta.data)
            }else{
                alert("Erro ao buscar dados do jogo!")
            }
        })
    }

    putJogo = (item) => {
        Axios.put(this.API_URL + '/' + this.state.selecionado._id + '?key=' + this.state.api_key, item).then((resposta) => {
            if (resposta.status == 200) {
                this.get()
            }else{
                alert("Erro ao atualizar!")
            }
        })
    }

    golCasa = () => {
        Axios.put(this.API_URL + '/' + this.props.match.params.id + '?key=' + this.state.api_key, {
            "placar_casa": this.state.placar_casa + 1,
        }).then((resposta) => {
            if (resposta.status == 200) {
                this.get()
            }else{
                alert("Erro ao marcar gol!")
            }
        })
    }

    golVisitante = () => {
        Axios.put(this.API_URL + '/' + this.props.match.params.id + '?key=' + this.state.api_key, {
            "placar_visitante": this.state.placar_visitante + 1,
        }).then((resposta) => {
            if (resposta.status == 200) {
                this.get()
            }else{
                alert("Erro ao marcar gol!")
            }
        })
    }

    setStatusJogo = (status) => {
        Axios.put(this.API_URL + '/' + this.props.match.params.id + '?key=' + this.state.api_key, {
            "status": this.state.status == "A" ? "E" : "F",
        }).then((resposta) => {
            if (resposta.status == 200) {
                this.get()
            }else{
                alert("Erro ao atualizar status do jogo!")
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
                                    <Col md={4}><Card.Title>Dados do jogo</Card.Title></Col>
                                </Row>
                            </Container>
                            <Row style={{ marginTop: '1em' }}>
                                <Col xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h3>{this.state.time_casa}</h3>
                                </Col>

                                <Col xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h3>{this.state.status == "A" ? "x" : this.state.placar_casa + " x " + this.state.placar_visitante}</h3>
                                </Col>

                                <Col xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h3>{this.state.time_visitante}</h3>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                    {
                                        this.state.status == "E" ?
                                            <Button variant="primary" type="button" onClick={this.golCasa}>
                                                +1
                                            </Button> : ""
                                    }
                                </Col>

                                <Col xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>

                                </Col>

                                <Col xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                    {
                                        this.state.status == "E" ?
                                            <Button variant="primary" type="button" onClick={this.golVisitante}>
                                                +1
                                            </Button> : ""
                                    }

                                </Col>
                            </Row>

                            <h6 style={{ marginTop: '3em' }}>Status</h6>
                            <h4>{this.state.status == "A" ? "Agendado" : this.state.status == "E" ? "Em andamento" : "Finalizado"}</h4>

                            {
                                this.state.status == "A" ?
                                    <Button variant="primary" type="button" onClick={this.setStatusJogo}>
                                        Iniciar jogo
                                    </Button>
                                    : this.state.status == "E" ?
                                        <Button variant="danger" type="button" onClick={this.setStatusJogo}>
                                            Encerrar
                                    </Button> : ""

                            }

                            <h6 style={{ marginTop: '1em' }}>Data</h6>
                            <h4>{this.state.data}</h4>

                            <h6 style={{ marginTop: '1em' }}>Local</h6>
                            <h4>{this.state.local}</h4>

                            <h6 style={{ marginTop: '1em' }}>Status</h6>
                            <h4>{this.state.status == "A" ? "Em andamento" : "Encerrado"}</h4>
                        </Card.Body>
                    </Card>
                </Container>
            </main>
        )
    }
}