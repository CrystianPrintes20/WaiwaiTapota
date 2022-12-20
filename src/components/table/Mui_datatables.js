import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { useModalDicionario } from '../../hooks/useModalDicionario';
import Dicionario from '../edit/Dicionario';
import FormWord from '../edit/formWord';


const DataTable = ({ dados, setDados, showAction}) => {
    const [modal, setModal] = useModalDicionario();
    const toggle = () => setModal(!modal);
    const [word, setWord] = useState(null)
    const [state, setState] = useState(false)
    const [rows, setRows] = useState([])
    
    let columns = [ { field: 'word_portugues', headerName: 'Palavra em Português', width: 140 },
    { field: 'translation_Waiwai', headerName: 'Tradução em Waiwai', width: 140 },
    { field: 'category', headerName: 'Categoria', width: 140 },
    { field: 'meaning_Portuguese', headerName: 'Significado em Português', width: 140 },
    { field: 'meaningWaiwai', headerName: 'Significado em Waiwai', width: 140 },
    { field: 'synonymPortugues', headerName: 'Sinônimo em Português', width: 140 },
    { field: 'synonymWaiwai', headerName: 'Sinônimo em Waiwai', width: 140, }]
    showAction ? columns.push({
        field: 'action',
        headerName: 'Ação',
        width: 210,
        sortable: false,
        disableClickEventBubbling: true,

        renderCell: (params) => {
            const onClick = (e) => {
                setWord(params.row)
                setModal(!modal)
            };
            return (
                <div>
                    <Button variant="outlined" color="success" onClick={onClick}>Detalhes</Button>
                </div>
            );
        },
    }) : null

    useEffect(() => {
        if (dados) {
            setRows(() => {
                return dados.map(item => ({ ...item, id: item["_id"]["$oid"] }))
            })
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
                <FormWord data={word} modal={modal} setModal={setModal} setDados={setDados} />
            </Dicionario>
        </Container>
    );
}

export default DataTable;