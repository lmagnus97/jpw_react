import React from 'react'
import Time from './time/Time';
import Jogo from './jogo/Jogo'
import Jogador from './jogador/Jogador'
import Axios from 'axios'

export default class MainPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            "api_key": null
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
            } else {
                alert("Erro ao autenticar!")
            }
        })
    }

    render() {
        return (
            <main>
                {
                    this.state.api_key ?
                        <section>
                            <Jogo api_key={this.state.api_key}></Jogo>
                            <Time api_key={this.state.api_key}></Time>
                            <Jogador api_key={this.state.api_key}></Jogador>
                        </section> : ""
                }
            </main>
        )
    }
}