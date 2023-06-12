"use client"; // Make 'FileUpload' a Client component

import React, { useState } from "react"

export default function FileUpload() {
    const [files, setFiles] = useState<File[] | null>()

    const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files
        if (fileList) {
            let files: File[] = [...fileList];

            files = files.filter((file) => file.type === "application/pdf")

            setFiles(files)
        }
    }

    return (
        <div className="flex flex-col w-2/5 border-r-2 px-5 py-10">
            <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 mb-10 transition duration-500 ease-in-out text-white bg-teal-500 hover:bg-teal-400 focus:outline-none">
                <span className="font-bold">Upload</span>
            </button>
            <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 mb-5 transition duration-500 ease-in-out text-white bg-slate-500 hover:bg-slate-400 focus:outline-none relative overflow-hidden">
                <span className="font-bold">Select files</span>
                <input
                    type="file"
                    onChange={handleSelectFiles}
                    multiple
                    className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
                />
            </button>

            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Files selected :</h2>
            {files && files.length > 0 ? <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-sm">
                {files.map((file: File) => (
                    <li key={file.name}>{file.name}</li>
                ))}
            </ul> : null}
        </div>
    )
}
