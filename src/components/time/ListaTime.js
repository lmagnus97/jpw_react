import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaRegEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";

export default class ListaTime extends React.Component {

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Categoria</th>
                        <th align="center" width='60'></th>
                        <th align="center" width='60'></th>
                        <th align="center" width='60'></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.times.map((item) => {
                        return <tr key={item._id}>
                            <td>{item.nome}</td>
                            <td>{item.categoria}</td>
                            <Link to={"/time/" + item._id}><td align="center" width='60'><Button variant="info" onClick={() => {this.props.select(item)}}><FaRegEye/></Button></td></Link>
                            <td align="center" width='60'><Button variant="warning" onClick={() => {this.props.select(item)}}><FaRegEdit/></Button></td>
                            <td align="center" width='60'><Button variant="outline-danger" onClick={() => { this.props.delete(item._id) }}><FaTrashAlt/></Button></td>
                        </tr>
                    })}
                </tbody>
            </Table>
        )
    }
}