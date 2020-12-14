import React from 'react'
import { Button, Container, Form, Col, Alert } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

export default class FormularioJogo extends React.Component {

    constructor(props) {
        super(props)

        if (this.props.selecionado) {
            this.state = {
                "data": this.props.selecionado.data,
                "time_casa": this.props.selecionado.time_casa,
                "time_visitante": this.props.selecionado.time_visitante,
                "local": this.props.selecionado.local,
                "mensagem_erro": ""
            }
        } else {
            this.state = {
                "data": "",
                "time_casa": "",
                "time_visitante": "",
                "local": "",
                "mensagem_erro": ""
            }
        }
    }


    setData = () => {

        if (this.state.data.length < 3) {
            this.setState({
                "mensagem_erro": "Insira uma data válida!",
            })
        } else if (this.state.local.length < 3) {
            this.setState({
                "mensagem_erro": "Insira uma local válido!",
            })
        } else if (this.state.time_casa == "Mandante" || this.state.time_casa == "") {
            this.setState({
                "mensagem_erro": "Selecione o time da casa!",
            })
        } else if (this.state.time_visitante == "Visitante" || this.state.time_visitante == "") {
            this.setState({
                "mensagem_erro": "Selecione o time visitante!",
            })
        } else if (this.props.selecionado) {
            this.props.put({
                "data": this.state.data,
                "time_casa": this.state.time_casa,
                "time_visitante": this.state.time_visitante,
                "local": this.state.local
            })

            this.setState({
                "data": "",
                "time_casa": "",
                "time_visitante": "",
                "local": "",
                "mensagem_erro": ""
            })
        } else {
            this.props.add({
                "data": this.state.data,
                "time_casa": this.state.time_casa,
                "time_visitante": this.state.time_visitante,
                "local": this.state.local
            })

            this.setState({
                "data": "",
                "time_casa": "",
                "time_visitante": "",
                "local": "",
                "mensagem_erro": ""
            })
        }


    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <Container>
                <Form.Row>
                    <Col xs={12} md={3}>
                        <Form.Group controlId="data">
                            <Form.Control type="text" placeholder="Data" onChange={this.handleInput} value={this.state.data} />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Group controlId="local">
                            <Form.Control type="text" placeholder="Local" onChange={this.handleInput} value={this.state.local} />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Control as="select" id='time_casa' onChange={this.handleInput} value={this.state.time_casa}>
                                <option disable>Mandante</option>
                                {this.props.times.map((item, index) => {
                                    return <option value={item.nome}>{item.nome}</option>
                                })}

                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Control as="select" id='time_visitante' onChange={this.handleInput} value={this.state.time_visitante}>
                                <option disable>Visitante</option>
                                {this.props.times.map((item, index) => {
                                    return <option value={item.nome}>{item.nome}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={1}>
                        <Button variant="primary" type="button" onClick={this.setData}>
                            Adicionar
                        </Button>
                    </Col>
                </Form.Row>
                {
                    this.state.mensagem_erro ?
                    <Alert variant="danger">
                        {this.state.mensagem_erro}
                    </Alert>: ""
                }
            </Container>
        )
    }

}