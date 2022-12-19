import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../src/layout/Layout";
import Banner3 from "../src/components/banner/Banner3";
import Banner from "../src/components/banner/Banner";
import {
    Card,
    CardBody,
    Button
} from "reactstrap";
import DataTable from "../src/components/table/Mui_datatables";
import axios from "axios";
import {useSession } from "next-auth/react";


export default function Dictionary() {
    const [dados, setDados] = useState(null)
    const [token, setToken] = useState()
    const { data: session } = useSession();
    
    const columns = [
      { field: 'word_portugues', headerName: 'Palavra em Português', width: 140 },
      { field: 'translation_Waiwai', headerName: 'Tradução em Waiwai', width: 140 },
      { field: 'category', headerName: 'Catogoria', width: 140 },
      { field: 'meaning_Portuguese', headerName: 'Siginificado em Português', width: 140 },
      { field: 'meaningWaiwai', headerName: 'Siginificado em Waiwai', width: 140 },
      { field: 'synonymPortugues', headerName: 'Sinonimo em Português', width: 140 },
      { field: 'synonymWaiwai', headerName: 'Sinonimo em Waiwai', width: 140, },
      {
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
      }
  ];

    useEffect(() => {
        if (session) {
          setToken(session?.user?.token)
        }
      }, [session])

    useEffect(() => {
        axios.get('http://localhost:5000/visualizarPalavras', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
          .then((res) => res.data)
          .then((data) => {
            setDados(data)
          })
      },[token])
      
      if(session){
        return (
            <Layout>
                <Banner3 />
                <Card>
                    <CardBody>
                        <DataTable dados={dados} columns={columns}/>
                    </CardBody>
                </Card>
            </Layout>
        )
      }else{
        return (
            <>
              <Layout>
                <Banner/>
              </Layout>
            </>
          );
      }
 

}