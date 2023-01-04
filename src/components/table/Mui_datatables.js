import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { useModalDicionario } from '../../hooks/useModalDicionario';
import Dicionario from '../edit/Dicionario';
import FormWord from '../edit/formWord';


const DataTable = ({ dados, setDados, showAction, token, disabled}) => {
    const [modal, setModal] = useModalDicionario();
    const toggle = () => setModal(!modal);
    const [word, setWord] = useState(null)
    const [rows, setRows] = useState([])
    
    let columns = [ { field: 'wordPort', headerName: 'Palavra em Português', minWidth: 140 },
    { field: 'translationWaiwai', headerName: 'Tradução em Waiwai', minWidth: 140 },
    { field: 'category', headerName: 'Categoria', minWidth: 140 },
    { field: 'meaningPort', headerName: 'Significado em Português', minWidth: 140 },
    { field: 'meaningWaiwai', headerName: 'Significado em Waiwai', minWidth: 140 },
    { field: 'synonymPort', headerName: 'Sinônimo em Português', minWidth: 140 },
    { field: 'synonymWaiwai', headerName: 'Sinônimo em Waiwai', minWidth: 140, },
{
        field: 'action',
        headerName: 'Ação',
        minWidth: 180,
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
    }]

    useEffect(() => {
        if (dados) {
             setRows(() => {
                 return dados.map(item => ({ ...item, id: item["_id"]}))
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
                <FormWord data={word} modal={modal} setModal={setModal} setDados={setDados}  showAction={showAction} token={token} disabled={disabled}/>
            </Dicionario>
        </Container>
    );
}

export default DataTable;