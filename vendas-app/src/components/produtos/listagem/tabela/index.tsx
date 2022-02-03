import { Produto } from "app/models/produtos"
import { useState } from "react"


interface ProdutoTabelaProps {
    produtos: Array<Produto>
    onEdit: (produto) => void
    onDelete: (produto) => void
}

export const TabelaProdutos: React.FC<ProdutoTabelaProps> = ({
    produtos,
    onEdit,
    onDelete,
}) => {
    return (
        <table className="table is-striped is-hoverable is-narrow is-fullwidth">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Preco</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    produtos.map(produto =>
                        <ProdutoRow onDelete={onDelete}
                            onEdit={onEdit}
                            key={produto.id}
                            produto={produto} />
                    )
                }
            </tbody>
        </table>
    )
}

interface ProdutoRowProps {
    produto: Produto
    onEdit: (produto) => void
    onDelete: (produto) => void
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto,
    onEdit,
    onDelete,
}) => {

    const [deletando, setDeletando] = useState<boolean>(false)

    const onDeleteClick = (produto: Produto) => {
        if (deletando) {
            onDelete(produto)
            setDeletando(false)
        } else {
            setDeletando(true)
        }
    }

    const cancelaDelete = () => setDeletando(false)

    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                {!deletando &&
                    <button onClick={e => onEdit(produto)}
                        className="button is-success is-small is-rounded">Editar</button>
                }
                <button onClick={e => onDeleteClick(produto)}
                    className="button is-danger is-small is-rounded ml-1">
                    {deletando ? "Confirmar" : "Deletar"}
                </button>
                {deletando &&
                    <button onClick={cancelaDelete}
                        className="button is-small is-rounded">Cancelar</button>
                }
            </td>
        </tr>
    )
}