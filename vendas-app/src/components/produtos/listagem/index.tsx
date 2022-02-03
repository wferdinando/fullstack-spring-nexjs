/* eslint-disable @next/next/link-passhref */
import { httpClient } from "app/http"
import { Produto } from "app/models/produtos"
import { useProdutoService } from "app/services"
import { AxiosResponse } from "axios"
import { Layout, Loader } from "components"
import { Alert } from "components/common/message"
import Link from "next/link"
import Router from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { TabelaProdutos } from "./tabela"


export const ListagemProdutos: React.FC = () => {


    const service = useProdutoService();
    const [messages, setMessages] = useState<Array<Alert>>([])
    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>
        ('/api/produtos', url => httpClient.get(url))

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`
        Router.push(url)
    }

    const [lista, setLista] = useState<Produto[]>([])
    useEffect(() => {
        setLista(result?.data || [])
    }, [result])


    const deletar = (produto: Produto) => {
        service.deletar(produto.id).then(response => {
            setMessages([{ tipo: "success", texto: "Produto exluido com sucesso!" }])
        })
        const listaAlterada: Produto[] = lista?.filter(p => p.id != produto.id)
        setLista(listaAlterada)
    }

    return (
        <Layout titulo="Produtos" mensagens={messages}>
            <Link href="/cadastros/produtos">
                <button className="button is-warning">Novo</button>
            </Link>

            <br />
            <br />
            <Loader show={!result} />
            <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
        </Layout>
    )
}