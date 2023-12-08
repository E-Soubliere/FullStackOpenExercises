const Filter = ({filter, changeFilter}) => {
    return (
        <div>
            <span>Filter shown with: </span>
            <input value={filter} onChange={(e) => changeFilter(e.target.value)} /> 
        </div>
    )
}

export default Filter