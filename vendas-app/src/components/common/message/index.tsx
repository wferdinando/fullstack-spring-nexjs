import { StringifyOptions } from "querystring"

interface MessageProps {
    tipo: string
    field?: string
    texto: string
}

export interface Alert{
    tipo: string
    field?: string
    texto: string
}

export const Message: React.FC<MessageProps> = ({
    texto,
    field,
    tipo
}) => {
    return (
        <article className={`message is-${tipo}`}>
            <div className="message-body">
                <strong>{field && `${field}: `}</strong>{texto}
            </div>
        </article>
    )
}