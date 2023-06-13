import Image from 'next/image'

export default function ChatRoom() {
    return (
        <div className="w-full px-5 flex flex-col overflow-y-auto">
            <div className="flex flex-col mt-5 grow">
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Lorem ipsum dolor sit amet
                    </div>
                    <Image
                        src="/icon-avatar.svg"
                        className="object-cover h-8 w-8 rounded-full bg-gray-300"
                        alt="Avatar icon"
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex justify-start mb-4">
                    <Image
                        src="/icon-robot.svg"
                        className="object-cover h-8 w-8 rounded-full bg-gray-300"
                        alt="Robot icon"
                        width={32}
                        height={32}
                    />
                    <div
                        className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                        at praesentium, aut ullam delectus odio error sit rem. Architecto
                        nulla doloribus laborum illo rem enim dolor odio saepe,
                        consequatur quas?
                    </div>
                </div>
                <div className="flex justify-end mb-4">
                    <div>
                        <div
                            className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                        >
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Magnam, repudiandae.
                        </div>

                        <div
                            className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Debitis, reiciendis!
                        </div>
                    </div>
                    <Image
                        src="/icon-avatar.svg"
                        className="object-cover h-8 w-8 rounded-full bg-gray-300"
                        alt="Avatar icon"
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex justify-start mb-4">
                    <Image
                        src="/icon-robot.svg"
                        className="object-cover h-8 w-8 rounded-full bg-gray-300"
                        alt="Robot icon"
                        width={32}
                        height={32}
                    />
                    <div
                        className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                        happy holiday guys!
                    </div>
                </div>
            </div>
            <div className="py-5 relative">
                <input
                    className="w-full bg-gray-200 py-5 px-3 rounded-xl"
                    type="text"
                    placeholder="Send a message"
                />

                <button type="button" className="bg-transparent hover:bg-teal-500 p-1 rounded-md absolute right-2 top-9">
                    <Image
                        src="/icon-send.svg"
                        className="object-cover h-6 w-6"
                        alt=""
                        width={32}
                        height={32}
                    />
                </button>
            </div>
        </div>
    )
}
