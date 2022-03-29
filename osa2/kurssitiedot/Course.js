const Course = ({course}) => {
    console.log(course)
    return (
      <div>
        <h1>Web development curriculum</h1>
        {course.map((course) =>
            <div>
              <Header key={"Header: " + course.id} course={course} />
              <Content key={"Content: " + course.id} course={course} />
              <Total key={"Total: " + course.id} course={course} />
            </div>
          )
        }
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
            <Part key={"Part: " + course.id + "." + part.id} name={part.name} exercises={part.exercises} />
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