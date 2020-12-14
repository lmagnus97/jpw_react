import React from 'react'
import Axios from 'axios'
import { Card, Container, Form, InputGroup, Col, Row, Alert } from 'react-bootstrap';
import ListaJogador from './ListaJogador'
import FormularioJogador from './FormularioJogador'
import { FaSearch } from "react-icons/fa";

export default class Jogador extends React.Component {

    constructor(props) {
        super(props)

        this.API_URL = "http://localhost:3000/jogador"

        this.state = {
            "jogadores": [],
            "times": []
        }

    }

    componentDidMount = () => {
        this.get()
        this.getTimes()
    }

    get = () => {
        Axios.get(this.API_URL + '?key=' + this.props.api_key).then((resposta) => {
            if(resposta.status == 200){
                this.setState({
                    "jogadores": resposta.data
                })
            }else{
                alert("Erro ao buscar jogadores!")
            }
        })
    }

    delete = (id) => {
        Axios.delete(this.API_URL + '/' + id + '?key=' + this.props.api_key).then((resposta) => {
            if (resposta.status == 200) {
                this.get()
            }else{
                alert("Erro ao remover!")
            }
        })
    }

    select = (item) => {
        if (this.state.selecionado == item) {
            this.setState({
                'selecionado': null
            })
        } else {
            this.setState({
                'selecionado': item
            })
        }
    }

    add = (item) => {
        Axios.post(this.API_URL + '?key=' + this.props.api_key, item).then((resposta) => {
            if (resposta.status == 200) {
                this.get()
            }else{
                alert("Erro ao inserir!")
            }
        })
    }

    put = (item) => {
        if (this.state.selecionado) {
            var requisicao = Axios.put(this.API_URL + '/' + this.state.selecionado._id + '?key=' + this.props.api_key, item)
            requisicao.then((resposta) => {
                console.log(resposta)
                if (resposta.status == 200) {
                    this.setState({ "selecionado": null })
                    this.get()
                }else{
                    alert("Erro ao atualizar!")
                }
            })
        }
    }

    getTimes = () => {
        Axios.get('http://localhost:3000/time?key=' + this.props.api_key).then((resposta) => {
            if(resposta.status == 200){
                this.setState({
                    "times": resposta.data
                })
            }else{
                alert("Erro ao buscar times!")
            }
        })
    }

    pesquisar = (event) => {
        if (event.target.value.length < 3) {
            this.get()
        } else {
            console.log(event.target.value)
            var result = this.state.jogadores.filter(item => item['nome'].includes(event.target.value) || item['apelido'].includes(event.target.value))

            this.setState({
                "jogadores": result
            })
        }
    }

    render() {
        return (
            <main>
                <Container style={{ marginTop: '1em' }}>
                    <Card >
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col md={4}><Card.Title>Jogadores</Card.Title></Col>
                                    <Col md={{ span: 4, offset: 4 }}><Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                <FaSearch/>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                placeholder="Pesquisar por jogador..."
                                                onChange={this.pesquisar}
                                            />
                                        </InputGroup>
                                    </Form.Group></Col>
                                </Row>
                            </Container>

                            <ListaJogador
                                data={this.state.jogadores}
                                delete={this.delete}
                                select={this.select}>
                            </ListaJogador>

                            <FormularioJogador
                                add={this.add}
                                put={this.put}
                                selecionado={this.state.selecionado}
                                times={this.state.times}
                                key={this.state.selecionado}>
                            </FormularioJogador>

                        </Card.Body>
                    </Card>
                </Container>
            </main>
        )
    }
}