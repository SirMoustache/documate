"use client"; // Make 'FileUpload' a Client component

import React, { useCallback, useState } from "react"

export type NotificationType = 'success' | 'error'

export type NotificationProps = {
    text: string;
    type: NotificationType;
}

const notificationClassMap = {
    success: 'text-green-600',
    error: 'text-red-600'
}

export const clientRequest = (formData: FormData) => {
    return fetch("/api/docs/devour", {
        method: "POST",
        body: formData,
    })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok.`)
            }
            const data = await response.json()
            return data.docs;
        })
        .catch((err) => {
            console.log(`Error uploading.`);
        });
}

export default function FileUpload() {
    const [files, setFiles] = useState<File[] | null>()
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [notification, setNotification] = useState<NotificationProps | null>(null)

    const handleSelectFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files
        if (fileList) {
            let files: File[] = [...fileList];

            files = files.filter((file) => (file.type === "application/pdf") && (file instanceof File))

            setFiles(files)
        }
    }, [])

    const handleFilesUpload = useCallback(async () => {
        if (!files) {
            return;
        }

        if (files.length === 0) {
            return;
        }

        const formData = new FormData();

        files.forEach((file) => formData.append("files", file));

        setIsUploading(true)
        setError(error)

        clientRequest(formData).then(
            data => {
                setIsUploading(false)
                setError(null)
                setFiles([])
                setNotification({ text: 'Files were uploaded successfully', type: 'success' })
                console.log(`Files successfully uploaded. Response is:`, data);
            },
            error => {
                setIsUploading(false)
                setError(error)
                setNotification({ text: 'Error uploading files', type: 'error' })
                console.warn(`Error uploading files. ${error}`);
            }
        )
    }, [files, error])

    return (
        <div className="flex flex-col w-2/5 border-r-2 px-5 py-10">
            <div className="mb-10">
                <button
                    type="button"
                    onClick={handleFilesUpload}
                    disabled={isUploading}
                    style={{ opacity: isUploading ? '0.5' : '1' }}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 w-full transition duration-500 ease-in-out text-white bg-teal-500 hover:bg-teal-400 focus:outline-none"
                >
                    <span className="font-bold">{isUploading ? 'Loading...' : 'Upload'}</span>
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
            <button
                type="button"
                disabled={isUploading}
                onClick={() => setNotification(null)}
                style={{ opacity: isUploading ? '0.5' : '1' }}
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 mb-5 transition duration-500 ease-in-out text-white bg-slate-500 hover:bg-slate-400 focus:outline-none relative overflow-hidden"
            >
                <span className="font-bold">Select files</span>
                <input
                    type="file"
                    onChange={handleSelectFiles}
                    disabled={isUploading}
                    multiple
                    className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
                />
            </button>

            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Files selected:</h2>

            {notification && <div className={notificationClassMap[notification.type]}>{notification.text}</div>}

            {files && files.length > 0 ? <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-sm">
                {files.map((file: File) => (
                    <li key={file.name}>{file.name}</li>
                ))}
            </ul> : null}
        </div>
    )
}
