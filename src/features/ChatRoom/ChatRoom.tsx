"use client"; // Make 'FileUpload' a Client component

import { useState } from 'react'
import Image from 'next/image'
import ChatMessage from './ChatMessage'

type PromptMessage = { question: string };

type AssistantMessage = {
    text: string;
    retrievedFromContext: boolean;
};

export type MessageType = 'user' | 'robot'

export type HistoryItem = {
    text: string;
    type: MessageType;
}

export default function ChatRoom() {
    const [prompt, setPrompt] = useState<PromptMessage>({ question: '' })
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [isFetching, setIsFetching] = useState(false)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt({ question: event.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendPrompt()
    }

    const sendPrompt = () => {
        setHistory([...history, { text: prompt.question, type: 'user' }])
        setIsFetching(true)

        fetch('http://localhost:3000/api/chat/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt),
        })
            .then((res) => res.json())
            .then((data: AssistantMessage) => {
                console.log(data)
                setHistory((previousState) => {
                    return [...previousState, { text: data.text, type: 'robot' }]
                })
                setPrompt({ question: '' })
                setIsFetching(false)
            })
            .catch((err) => {
                console.log(err)
                setIsFetching(false)
            });
    }

    return (
        <div className="w-full px-5 flex flex-col overflow-y-auto">
            <div className="flex flex-col mt-5 grow">
                {history.map((message) => {
                    return (<ChatMessage {...message} key={message.text} />)
                })}
            </div>
            <div className="py-5 relative">
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full bg-gray-200 py-5 px-3 rounded-xl"
                        type="text"
                        placeholder="Send a message"
                        value={isFetching ? "Fetching..." : prompt.question}
                        onChange={onChange}
                    />
                    <button
                        type="button"
                        onClick={sendPrompt}
                        className="bg-transparent hover:bg-teal-500 p-1 rounded-md absolute right-2 top-9"
                    >
                        <Image
                            src="/icon-send.svg"
                            className="object-cover h-6 w-6"
                            alt=""
                            width={32}
                            height={32}
                        />
                    </button>
                </form>
            </div>
        </div>
    )
}
