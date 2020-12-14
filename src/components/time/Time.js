import React from 'react'
import Axios from 'axios'
import { Card, Container, Form, InputGroup, Col, Row } from 'react-bootstrap';
import ListTime from './ListaTime'
import FormularioTime from './FormularioTime'
import { FaSearch } from "react-icons/fa";

export default class Time extends React.Component {

    constructor(props) {
        super(props)

        this.API_URL = "http://localhost:3000/time"

        this.state = {
            "times": [],
        }
    }

    componentDidMount = () => {
        this.getTimes()
    }

    getTimes = () => {
        Axios.get(this.API_URL + '?key=' + this.props.api_key).then((resposta) => {
            if(resposta.status == 200){
                this.setState({
                    "times": resposta.data
                })
            }else{
                alert("Erro ao buscar times!")
            }
        })
    }

    deleteTime = (id) => {
        Axios.delete(this.API_URL + '/' + id + '?key=' + this.props.api_key).then((resposta) => {
            if (resposta.status == 200) {
                this.getTimes()
            }else{
                alert("Erro ao remover time!")
            }
        })
    }

    selectTime = (item) => {
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

    addTime = (item) => {
        Axios.post(this.API_URL + '?key=' + this.props.api_key, item).then((resposta) => {
            if (resposta.status == 200) {
                this.getTimes()
            }else{
                alert("Erro ao adicionar time!")
            }
        })
    }

    putTime = (item) => {
        if (this.state.selecionado) {
            var requisicao = Axios.put(this.API_URL + '/' + this.state.selecionado._id + '?key=' + this.props.api_key, item)
            requisicao.then((resposta) => {
                if (resposta.status == 200) {
                    this.setState({ "selecionado": null })
                    this.getTimes()
                }else{
                    alert("Erro ao atualizar time!")
                }
            })
        }
    }

    pesquisarTime = (event) => {

        if (event.target.value.length < 3) {
            this.getTimes()
        } else {
            var result = this.state.times.filter(name => name['nome'].includes(event.target.value))

            this.setState({
                "times": result
            })
        }

    }

    render() {

        return (
            <main>
                <Container style={{marginTop: '2em'}}>
                    <Card>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col md={4}><Card.Title>Times</Card.Title></Col>
                                    <Col md={{ span: 4, offset: 4 }}><Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                <FaSearch/>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                placeholder="Pesquisar por time..."
                                                onChange={this.pesquisarTime}
                                            />
                                        </InputGroup>
                                    </Form.Group></Col>
                                </Row>
                            </Container>

                            <ListTime
                                times={this.state.times}
                                delete={this.deleteTime}
                                select={this.selectTime}>
                            </ListTime>

                            <FormularioTime
                                add={this.addTime}
                                put={this.putTime}
                                selecionado={this.state.selecionado}
                                key={this.state.selecionado}>
                            </FormularioTime>

                        </Card.Body>
                    </Card>
                </Container>
            </main>
        )
    }
}