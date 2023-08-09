import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DeletePostModal from "../modals/DeletePostModal"
import EditPostModal from "../modals/EditPostModal"

import context from "../../context";
import retrieveFavPosts from "../../logic/retrieveFavPosts";
import extractUserIdFromToken from "../helpers/extractUserIdFromToken";
import toggleFavPost from "../../logic/toggleFavPost";

export default function ProfileFavPosts() {
    const userId = extractUserIdFromToken(context.token)
    const navigate = useNavigate()

    const params = useParams()
    const userIdProfile = params.userIdProfile

    const [modal, setModal] = useState(null)

    const [posts, setPosts] = useState(null)

    const [postId, setPostId] = useState(null)

    useEffect(() => {
        try {
            retrieveFavPosts(context.token, userIdProfile)
                .then(posts => {
                    setPosts(posts)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [postId])

    const handleEditPostModal = postId => {
        setPostId(postId)
        setModal("edit-post-modal")
    }

    const handleCancelEditPostModal = () => setModal(null)

    const handleEditPost = () => {
        try {
            retrieveFavPosts(context.token, userIdProfile)
                .then(posts => {
                    setPosts(posts)
                    setModal(null)
                    setPostId(null)
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeletePostModal = postId => {
        setPostId(postId)
        setModal("delete-post-modal")
    }

    const handleCancelDeletePostModal = () => setModal(null)

    const handleDeletePost = () => {
        try {
            retrieveFavPosts(context.token, userIdProfile)
                .then(posts => {
                    setPosts(posts)
                    setModal(null)
                    setPostId(null)
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    function handletoggleFavPost(postId) {
        try {
            toggleFavPost(context.token, postId)
                .then(() => {
                    setPosts(posts => {

                        const posts2 = [...posts]

                        const index = posts2.findIndex(post => post.id === postId)
                        const post = posts2[index]

                        const post2 = { ...post }

                        if (post2.fav) {
                            post2.likes--
                        } else {
                            post2.likes++
                        }

                        post2.fav = !post2.fav

                        posts2[index] = post2

                        return posts2
                    })
                })
                .catch((error) => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleProfile = (event, userIdProfile) => {
        event.preventDefault()
        navigate(`/profile/${userIdProfile}/posts`)
    }

    return <section className="">
        {posts?.map(post => <article key={post.id} className="bg-color5 mb-3">
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center pl-3 py-1">
                    <img className="w-12 h-12 rounded-full object-cover mr-2" src={post.author.image} alt={post.author.name} />
                    <a onClick={() => handleProfile(event, post.author.id)} className="font-semibold text-color1 text-xl">{post.author.name}</a>
                </div>
                <button onClick={() => handletoggleFavPost(post.id)} className="bg-color4 w-10 h-9 text-white border-none rounded-xl px-2 py-1 mr-3 font-bold text-lg cursor-pointer transition duration-300 hover:bg-color3">{post.fav ? '🤍' : '♡'}</button>
            </div>
            <img className="w-full" src={post.image} alt={post.text} />
            <p className="m-2 text-color1 font-semibold ml-3">🤍{post.likes}</p>
            <p className="m-2 text-color1 font-semibold ml-3">{post.text}</p>
            <div className="flex justify-end pr-4 pb-2 gap-4">
                {userId === post.author.id && <button onClick={() => handleEditPostModal(post.id)} className="button bg-color4 text-white border-none rounded-xl px-3 py-1 font-bold text-lg cursor-pointer transition duration-300 hover:bg-color3">Edit</button>}
                {userId === post.author.id && <button onClick={() => handleDeletePostModal(post.id)} className="button bg-color4 text-white border-none rounded-xl px-3 py-1 font-bold text-lg cursor-pointer transition duration-300 hover:bg-color3">Delete</button>}
            </div>
        </article>)
        }

        {modal === "delete-post-modal" && <DeletePostModal postId={postId} onDeletePost={handleDeletePost} onHideDeletePost={handleCancelDeletePostModal} />}
        {modal === "edit-post-modal" && <EditPostModal postId={postId} onEditPost={handleEditPost} onHideEditPost={handleCancelEditPostModal} />}
    </section >
}