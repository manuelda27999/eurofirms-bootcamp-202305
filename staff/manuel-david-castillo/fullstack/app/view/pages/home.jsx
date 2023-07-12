function Home(props) {
  const [modal, setModal] = React.useState(null)

  const [postId, setPostId] = React.useState(null)

  const [user, setUser] = React.useState(null)

  const [posts, setPosts] = React.useState([])


  React.useEffect(() => {
    try {
      Promise.all([retrieveUser(context.userId), retrievePosts(context.userId)])
        .then(([user, posts]) => {
          setUser(user)
          setPosts(posts)
        })
        .catch(error => alert(error.message))
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
  const handleCreatePost = () => {
    try {
      retrievePosts(context.userId)
        .then((posts) => {
          setModal(null)
          setPosts(posts)
        })
        .catch(() => {
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
      retrievePosts(context.userId)
        .then(posts => {
          setPosts(posts)
          setModal(null)
        })
        .catch(error => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }

  const handleEditPostModal = postId => {
    setPostId(postId)
    setModal("edit-post-modal")
  }

  const handleCancelEditPostModal = () => setModal(null)

  const handleUpdatePost = () => {
    try {
      retrievePosts(context.userId)
        .then(posts => {
          setPosts(posts)
          setModal(null)
        })
        .catch(error => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }

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

    {modal === "create-post-modal" && <CreatePostModal onCreatePost={handleCreatePost} onHideCreatePost={handleCancelCreatePostModal} />}
    {modal === "delete-post-modal" && <DeletePostModal postId={postId} onDeletePost={handleDeletePost} onHideDeletePost={handleCancelDeletePostModal} />}
    {modal === "edit-post-modal" && <EditPostModal postId={postId} onUpdatePost={handleUpdatePost} onHideEditPost={handleCancelEditPostModal} />}

  </div>
}