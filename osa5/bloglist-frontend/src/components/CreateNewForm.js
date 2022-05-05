/* Render form for create new blog. */
const CreateNewForm = (props) => {

  
  return (
    <div>
      <form onSubmit={props.handleCreateNew}>
        <div>
          Title:
            <input
            text="text"
            value={props.title}
            name="title"
            onChange={event => props.setTitle(event.target.value)}
            />
        </div>
        <div>
          Author:
            <input
            text="text"
            value={props.author}
            name="author"
            onChange={event => props.setAuthor(event.target.value)}
            />
        </div>
        <div>
          URL:
            <input
            text="text"
            value={props.url}
            name="url"
            onChange={event => props.setUrl(event.target.value)}
            />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateNewForm