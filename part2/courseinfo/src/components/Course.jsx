const Course = ({course}) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
        </div>
    )
}

export default Course

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = ({parts}) => {
    return (
        parts.map((part) => {
        return (<p key={part.id}> {part.name} {part.exercises} </p>)
        })
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0);
    return (
        <p><b>Number of exercises {total}</b></p>
    )
}