import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { useModalDicionario } from '../../hooks/useModalDicionario';
import Dicionario from '../edit/Dicionario';
import FormWord from '../edit/formWord';


const DataTable = ({ dados, columns}) => {
    const [modal, setModal] = useModalDicionario();
    const toggle = () => setModal(!modal);
    const [word, setWord] = useState(null)
    const [state, setState] = useState(false)
    const [rows, setRows] = useState([])
    

    useEffect(() => {
        if (dados) {
            let url_atual = window.location.href;
            setRows(() => {
                return dados.map(item => ({ ...item, id: item["_id"]["$oid"] }))
            })
            console.log(url_atual)
        }
    }, [dados])

    return (
        <Container>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
            <Dicionario toggle={toggle} modal={modal} >
                <FormWord data={word} />
            </Dicionario>
        </Container>
    );
}

export default DataTable;