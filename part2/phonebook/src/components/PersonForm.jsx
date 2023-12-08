const PersonForm = ({submit, newName, changeName, newNumber, changeNumber}) => {

    return (
      <form onSubmit={submit}>
            <div>
                name: <input value={newName} onChange={(e) => changeName(e.target.value)}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={(e) => changeNumber(e.target.value)}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>  
    )
}

export default PersonForm