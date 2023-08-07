import { useEffect, useState } from "react"
import retrieveChats from "../../logic/retrieveChats"
import context from "../../context"

export default function Messages() {
    const [chats, setChats] = useState(null)
    const navigate = context.navigate

    useEffect(() => {
        try {
            retrieveChats(context.token)
                .then(chats => {
                    setChats(chats)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleProfile = (event, userIdProfile) => {
        event.preventDefault()
        navigate(`/profile/${userIdProfile}/posts`)
    }

    const handleNavigateChat = (event, chatId) => {
        event.preventDefault()
        navigate(`/messages/${chatId}`)
    }

    return <section className="flex flex-col items-center pb-20 w-full">
        {chats?.map(chat => <article onClick={(event) => handleNavigateChat(event, chat.id)} key={chat.id} className="w-full flex flex-col border-b-2 border-b-gray-400 m-1">
            <div className="flex flex-col gap-1">
                {chat.users.map(user => <article key={user.id} className="flex justify-start items-center pl-3">
                    <img className="w-12 h-12 rounded-full object-cover mr-2" src={user.image} alt="user profile image" />
                    <a onClick={(event) => handleProfile(event, user.id)} className="m-2 text-color1 font-semibold ml-3" href="">{user.name}</a>
                </article>)}
            </div>
            <p className="m-2 ml-3">{chat.messages[chat.messages.length - 1]?.text}</p>
        </article>)}
    </section>
}