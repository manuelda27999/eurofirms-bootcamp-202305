function Home(props) {
  const [modal, setModal] = React.useState("")

  const [postId, setPostId] = React.useState("")

  const [user, setUser] = React.useState(null)

  const [posts, setPosts] = React.useState([])


  React.useEffect(() => {
    try {
      retrieveUser(context.userId)
        .then(user => setUser(user))
        .catch(error => error.message(error))
    } catch (error) {
      alert(error.message)
    }

    try {
      retrievePosts(context.userId)
        .then(posts => setPosts(posts))
        .catch(error => error.message(error))
    } catch (error) {
      alert(error.message)
    }
  }, [])


  const handleLogout = () => {
    context.userId = null

    props.onLogout()
  }

  const handleCreatePostModal = () => setModal("create-post-modal")
  const handleCancelCreatePostModal = () => setModal("")

  const handleDeletePostModal = postId => {
    setPostId(postId)
    setModal("delete-post-modal")
  }

  const handleCancelDeletePostModal = () => setModal("")

  const handleEditPostModal = postId => {
    setPostId(postId)
    setModal("edit-post-modal")
  }

  const handleCancelEditPostModal = () => setModal("")

  return <div className="home-view">
    <header>
      <h2 className="h2-home">Hello {user ? user.name : ' world'}</h2>
      <nav>
        <button onClick={handleLogout} className="button-logout">Logout</button>
      </nav>
    </header>

    <main className="home">
      <section className="all-posts">
        {posts.map(post => <article key={post.id} className="post">
          <div className="nameDiv">
            <p className="name-post">{post.author.name}</p>
          </div>
          <img className="img-post" src={post.image} alt={post.text} />
          <p className="text-post">{post.text}</p>
          {context.userId === post.author.id &&
            <div className="div-button-edit-delete">
              <button onClick={() => handleEditPostModal(post.id)} className="editButton">Edit</button>
              <button onClick={() => handleDeletePostModal(post.id)} className="deleteButton">Delete</button>
            </div>
          }
        </article>)}
      </section>
    </main>

    <footer>
      <button onClick={handleCreatePostModal} className="button-new-post">New Post</button>
    </footer>

    {modal === "create-post-modal" && <CreatePostModal onHideCreatePost={handleCancelCreatePostModal} />}
    {modal === "delete-post-modal" && <DeletePostModal postId={postId} onHideDeletePost={handleCancelDeletePostModal} />}
    {modal === "edit-post-modal" && <EditPostModal postId={postId} onHideEditPost={handleCancelEditPostModal} />}

  </div>
}