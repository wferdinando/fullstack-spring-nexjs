/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/link-passhref */
import { Produto } from 'app/models/produtos';
import { useProdutoService } from "app/services";
import { converterEmBigDecimal, formatReal } from 'app/util/money';
import { Input, Layout } from "components";
import { Alert } from 'components/common/message';
import { useEffect, useState } from 'react';
import * as yup from 'yup'
import Link from 'next/link';
import { useRouter } from 'next/router';

const msgCampoObrigatorio = "Campo obrigatório!"
const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim().required(msgCampoObrigatorio),
    preco: yup.number()
        .required(msgCampoObrigatorio)
        .moreThan(0, "Valor deve ser maior que 0,00 (Zero)"),
})

interface FormErrors {
    sku?: string
    nome?: string
    preco?: string
    descricao?: string
}


export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [id, setId] = useState<string>()
    const [dataCadastro, setDataCadastro] = useState<string>()
    const [sku, setSku] = useState<string>()
    const [preco, setPreco] = useState<string>()
    const [nome, setNome] = useState<string>()
    const [descricao, setDescricao] = useState<string>()
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [errors, setErrors] = useState<FormErrors>({})
    const router = useRouter()
    const { id: queryId } = router.query

    useEffect(() => {
        if (queryId) {
            service.carregarProduto(queryId).then(produtoEncontrado => {
                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku)
                setNome(produtoEncontrado.nome)
                setDescricao(produtoEncontrado.descricao)
                setPreco(formatReal(`${produtoEncontrado.preco}`))
                setDataCadastro(produtoEncontrado.dataCadastro || '')
            })
        }
    }, [queryId])

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao,
            dataCadastro
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({})

            if (id) {
                service
                    .atualizar(produto)
                    .then(response => {
                        console.log(produto)
                        setMessages([{
                            tipo: "success", texto: "Produto atualizado com sucesso!"
                        }])
                    })
            } else {
                service
                    .salvar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.id)
                        setDataCadastro(produtoResposta.dataCadastro)
                        console.log(produto)
                        setMessages([{
                            tipo: "success", texto: "Produto Salvo com sucesso!"
                        }])
                    })
            }

        }).catch(err => {
            const field = err.path;
            const message = err.message;

            setErrors({
                [field]: message
            })
        })


    }

    return (
        <Layout titulo="Produtos" mensagens={messages}>
            {id &&
                <div className="columns">
                    <Input label="Código:"
                        columnClasses="is-half"
                        value={id || ''}
                        id="inputId"
                        disabled={true}
                    />

                    <Input label="Data Cadastro:"
                        columnClasses="is-half"
                        onChange={setDataCadastro}
                        value={dataCadastro || ''}
                        id="inputDataCadastro"
                        disabled

                    />
                </div>
            }

            <div className="columns">
                <Input label="SKU: *" columnClasses="is-half"
                    onChange={setSku}
                    value={sku || ''}
                    id="inputSku"
                    placeholder="Digite o SKU do produto."
                    error={errors.sku}
                />
                <Input label="Preço: *" columnClasses="is-half"
                    onChange={setPreco}
                    value={preco || ''}
                    id="inputPreco"
                    placeholder="Digite o Preço do produto."
                    currency={true}
                    maxLength={16}
                    error={errors.preco}
                />
            </div>

            <div className="columns">
                <Input label="Nome: *" columnClasses="is-full"
                    onChange={setNome}
                    value={nome || ''}
                    id="inputNome"
                    placeholder="Digite o Nome do produto."
                    error={errors.nome}
                />
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea" id="inputDesc" value={descricao || ''}
                            onChange={event => setDescricao(event.target.value)}
                            placeholder="Digite a Descrição detalhada do Produto" />
                        {
                            errors.descricao &&
                            <p className="help is-danget">{errors.descricao}</p>
                        }
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button onClick={submit} className="button is-link ">{id ? "Atualizar" : "Salvar"}</button>
                </div>
                <div className="control">
                    <Link href="/consultas/produtos">
                        <button className="button"> Voltar</button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
