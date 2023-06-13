import Image from 'next/image'
import { HistoryItem, MessageType } from './ChatRoom'

const userTextClass = "mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
const robotTextClass = "ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"

const MessageImage = ({ type }: { type: MessageType }): any => {
    const imgSrc = type === 'user' ? '/icon-avatar.svg' : '/icon-robot.svg'
    const imgAlt = type === 'user' ? 'Avatar icon' : 'Robot icon'

    return (
        <Image
            src={imgSrc}
            className="object-cover h-8 w-8 rounded-full bg-gray-300"
            alt={imgAlt}
            width={32}
            height={32}
        />
    )
}

export default function ChatMessage({ text, type }: HistoryItem) {
    const containerClass = `flex mb-4 ${type === 'user' ? 'justify-end' : 'justify-start'}`
    const TextClass = type === 'user' ? userTextClass : robotTextClass

    return (
        <div className={containerClass}>
            {type === 'user' ? (
                <>
                    <div className={TextClass}>{text}</div>
                    <MessageImage type={type} />
                </>
            ) : (
                <>
                    <MessageImage type={type} />
                    <div className={TextClass}>{text}</div>
                </>
            )}
        </div>
    )
}
