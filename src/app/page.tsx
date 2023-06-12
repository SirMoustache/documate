import FileUpload from './features/FileUpload'
import ChatRoom from './features/ChatRoom'

export default function Home() {
  return (
    <main className='flex flex-row justify-between'>
      <FileUpload />
      <ChatRoom />
    </main>
  )
}
