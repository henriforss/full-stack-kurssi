const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
    
  
  const Header = ({course}) => {
    return(
      <div>
        <h2>{course.name}</h2>
      </div>
    )
  }
  

  const Content = ({course}) => {
    return(
      <div>
        {course.parts.map(part =>
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  
  const Part = ({name, exercises}) => {
    return(
      <div>
        <p>{name} {exercises}</p>
      </div>
    )
  }
  
  
  const Total = ({course}) => {
    const exercisesArray = course.parts.map((part) => {
      return (
        part.exercises
      )
    })
    const exercisesTotal = exercisesArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue, 0)
    return(
      <div>
        <b>Total of {exercisesTotal} exercises</b>
      </div>
    )
  }


  export default Course