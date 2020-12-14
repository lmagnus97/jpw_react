import React from 'react'
import { Button, Container, Form, Col, Alert } from 'react-bootstrap';

export default class FormularioJogador extends React.Component {

    constructor(props) {
        super(props)

        if (this.props.selecionado) {
            this.state = {
                "nome": this.props.selecionado.nome,
                "apelido": this.props.selecionado.apelido,
                "posicao": this.props.selecionado.posicao,
                "time": this.props.selecionado.time,
                "id_time": this.props.selecionado.id_time,
                "mensagem_erro": ""
            }
        } else {
            this.state = {
                "nome": "",
                "apelido": "",
                "posicao": "",
                "time": "",
                "id_time": "",
                "mensagem_erro": ""
            }
        }
    }


    setData = () => {
        if (this.state.nome.length < 3) {
            this.setState({
                "mensagem_erro": "Insira um nome válido!",
            })
        } else if (this.state.posicao.length < 3) {
            this.setState({
                "mensagem_erro": "Insira a posição!",
            })
        } else if (this.state.time == "Time" || this.state.time == "") {
            this.setState({
                "mensagem_erro": "Selecione o time!",
            })
        } else if (this.props.selecionado) {
            this.props.put({
                "nome": this.state.nome,
                "apelido": this.state.apelido,
                "posicao": this.state.posicao,
                "time": this.state.time,
                "id_time": this.state.id_time
            })

            this.setState({
                "nome": "",
                "apelido": "",
                "posicao": "",
                "time": "",
                "id_time": "",
                "mensagem_erro": ""
            })
        } else {
            this.props.add({
                "nome": this.state.nome,
                "apelido": this.state.apelido,
                "posicao": this.state.posicao,
                "time": this.state.time,
                "id_time": this.state.id_time
            })

            this.setState({
                "nome": "",
                "apelido": "",
                "posicao": "",
                "time": "",
                "id_time": "",
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
                        <Form.Group controlId="nome">
                            <Form.Control type="text" placeholder="Nome" onChange={this.handleInput} value={this.state.nome} />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group controlId="apelido">
                            <Form.Control type="text" placeholder="Apelido" onChange={this.handleInput} value={this.state.apelido} />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Control as="select" id='time' onChange={this.handleInput} value={this.state.time}>
                                <option disable>Time</option>
                                {this.props.times.map((item, index) => {
                                    return <option value={item.nome}>{item.nome}</option>
                                })}

                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Group controlId="posicao">
                            <Form.Control type="text" placeholder="Posição" onChange={this.handleInput} value={this.state.posicao} />
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
                        </Alert> : ""
                }
            </Container>
        )
    }

}