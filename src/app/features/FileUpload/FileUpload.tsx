export default function FileUpload() {
  return (
    <div className="flex flex-col w-2/5 border-r-2 px-5 py-10">
        <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 mb-10 transition duration-500 ease-in-out text-white bg-teal-500 hover:bg-teal-400 focus:outline-none">
            <span className="font-bold">Upload</span>
        </button>
        <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 mb-5 transition duration-500 ease-in-out text-white bg-slate-500 hover:bg-slate-400 focus:outline-none">
            <span className="font-bold">Browse files</span>
        </button>
        
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Files selected :</h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-sm">
            <li>3Shape Code of Conduct.pdf</li>
            <li>TRIOS on Dental Desktop Workflows.pdf</li>
            <li>TRIOS on Unite 21.2 Workflows.pdf</li>
        </ul>
    </div>
  )
}
