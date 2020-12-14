import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaRegEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";

export default class ListaJogador extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            "modal": false,
            "selecionado": null
        }

    }

    render() {
        return (
            <section>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Time</th>
                            <th align="center" width='60'></th>
                            <th align="center" width='60'></th>
                            <th align="center" width='60'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((item) => {
                            return <tr key={item._id}>
                                <td>{item.nome}</td>
                                <td>{item.time}</td>
                                <Link to={"/jogador/" + item._id}><td align="center" width='60'><Button variant="info"><FaRegEye/></Button></td></Link>
                                <td align="center" width='60'><Button variant="warning" onClick={() => { this.props.select(item) }}><FaRegEdit/></Button></td>
                                <td align="center" width='60'><Button variant="outline-danger" onClick={() => { this.props.delete(item._id) }}><FaTrashAlt/></Button></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </section>

        )
    }
}