const Persons = ({persons, filter, handleDelete}) => {
    return (
        <table>
            <tbody>
                {persons.map((person) => {
                    if (person.name.toLowerCase().includes(filter.toLowerCase()) || filter === ""){
                        return (
                            <tr key={person.id}>
                                <td >{person.name}</td>
                                <td>{person.number}</td>
                                <td><button onClick={() => handleDelete(person.id)}>Delete</button></td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </table>
    )
}
export default Persons