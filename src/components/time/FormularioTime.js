import React from 'react'
import { Button, Container, Form, Col, Alert } from 'react-bootstrap';

export default class FormularioTime extends React.Component {

    constructor(props) {
        super(props)

        if (this.props.selecionado) {
            this.state = {
                "nome": this.props.selecionado.nome,
                "categoria": this.props.selecionado.categoria,
                "modo": this.props.selecionado.modo,
                "mensagem_erro": ""
            }
        } else {
            this.state = {
                "nome": "",
                "categoria": "",
                "modo": "",
                "mensagem_erro": ""
            }
        }
    }

    setTime = () => {

        if(this.state.nome.length < 3) {
            this.setState({
                "mensagem_erro": "Insira um nome válido!",
            })
        } else if (this.state.categoria.length == "Categoria" || this.state.categoria.length == "") {
            this.setState({
                "mensagem_erro": "Selecione a categoria!",
            })
        } else if (this.state.modo.length == "Mandante" || this.state.modo.length == "") {
            this.setState({
                "mensagem_erro": "Selecione o modo de jogo!",
            })
        }else if(this.props.selecionado){
            this.props.put({
                "nome": this.state.nome,
                "categoria": this.state.categoria,
                "modo": this.state.modo,
            })

            this.setState({
                "nome": "",
                "categoria": "",
                "modo": "",
                "mensagem_erro": ""
            })
        } else {
            this.props.add({
                "nome": this.state.nome,
                "categoria": this.state.categoria,
                "modo": this.state.modo,
            })

            this.setState({
                "nome": "",
                "categoria": "",
                "modo": "",
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
                    <Col xs={12} md={4}>
                        <Form.Group controlId="nome">
                            <Form.Control type="text" placeholder="Nome do time" onChange={this.handleInput} value={this.state.nome} />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Control as="select" id='categoria' onChange={this.handleInput} value={this.state.categoria}>
                                <option disable>Categoria</option>
                                <option value='Sub-20'>Sub-20</option>
                                <option value='Sub-23'>Sub-23</option>
                                <option value='Profissional'>Profissional</option>
                                <option value='Veterano'>Veterano</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Group>
                            <Form.Control as="select" id='modo' onChange={this.handleInput} value={this.state.modo}>
                                <option disable>Modo</option>
                                <option value="Salão">Futsal</option>
                                <option value="Campo">Futebol de campo</option>
                                <option value="Areia">Futebol de areia</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={1}>
                        <Button variant="primary" type="button" onClick={this.setTime}>
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