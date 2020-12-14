import React from 'react'
import { Button, Table, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaRegEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";


export default class ListaJogo extends React.Component {

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Mandante</th>
                        <th>Placar</th>
                        <th>Visitante</th>
                        <th align="center" width='60'></th>
                        <th align="center" width='60'></th>
                        <th align="center" width='60'></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((item) => {
                        return <tr key={item._id}>
                            <td align="center">{item.time_casa}</td>
                            <td align="center">{item.status == "A" ? "x" : item.placar_casa + " x " + item.placar_visitante}</td>
                            <td align="center">{item.time_visitante}</td>
                            <Link to={"/jogo/" + item._id}><td align="center" width='60'></td><td align="center" width='100'><Button variant="info" onClick={() => { this.props.select(item) }}><FaRegEye/></Button></td></Link>
                            <td align="center" width='60'><Button variant="warning" onClick={() => { this.props.select(item) }}><FaRegEdit/></Button></td>
                            <td align="center" width='60'><Button variant="outline-danger" onClick={() => { this.props.delete(item._id) }}><FaTrashAlt/></Button></td>
                        </tr>
                    })}
                </tbody>
            </Table>
        )
    }
}