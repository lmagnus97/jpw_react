import React from 'react'
import Axios from 'axios'
import { Card, Container, Col, Row} from 'react-bootstrap';

export default class DetalhesTime extends React.Component {

    constructor(props) {
        super(props)

        this.API_URL = "http://localhost:3000/time"
        
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
                alert("Erro ao buscar dados do time!")
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
                                    <Col md={4}><Card.Title>Dados do time</Card.Title></Col>
                                </Row>
                            </Container>
                            <Col>
                                <h1>{this.state.nome}</h1>

                                <h6 style={{marginTop: '1em'}}>Categoria</h6>
                                <h2>{this.state.categoria}</h2>

                                <h6 style={{marginTop: '1em'}}>Modo de jogo</h6>
                                <h2>{this.state.modo}</h2>


                            </Col>
                        </Card.Body>
                    </Card>
                </Container>
            </main>
        )
    }
}