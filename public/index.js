import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.addShape = this.addShape.bind(this)
    this.state = {
      shapes: []
    }
  }
  addShape(e){
    let newShape = {
      x      : e.clientX,
      y      : e.clientY,
      form   : this.randomForm(),
      color  : this.randomColor(),
      length : this.randomSize(this.form)
    }
    let updatedShapes = this.state.shapes
    updatedShapes.push(newShape)
    this.setState({
      shapes: updatedShapes
    })
  }
  removeShape(id, shapes){
    shapes.pop()
    shapes.map((shape, shapeIndex) => {
      if(shape.id === id) {
        shapes.splice(shapeIndex, 1)
      }
    })
    // ERROR: can't set state of undefined
    this.setState({
      shapes: shapes
    })
  }
  randomForm(){
    return Math.round(Math.random()) ? 'rect' : 'circle'
  }
  randomSize(form) {
    return form === 'rect' ? Math.floor(Math.random() * (150 - 20 + 1) + 20) : Math.floor(Math.random() * (100 - 15 + 1) + 15)
      ;
  }
  randomColor() {
    return 'rgb(' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor() + ')';
  }
  randomColorFactor() {
    return Math.round(Math.random() * 255);
  }
  render() {
    return (
      <svg className="app"
           width={window.innerWidth}
           height={window.innerHeight}
           onClick={this.addShape}>

        <Shapes shapes={this.state.shapes} removeShape={this.removeShape} />
      </svg>
    )
  }
}

class Shapes extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let updatedShapes = []
    this.props.shapes.map((shape, id) => {
      shape.id = id

      if(shape.form === 'rect'){
        updatedShapes.push(<rect onClick={this.props.removeShape.bind(null, id, this.props.shapes)} key={id} x={shape.x - shape.length/2} y={shape.y - shape.length/2} width={shape.length} height={shape.length} fill={shape.color} stroke="black" />)
      } else {
        updatedShapes.push(<circle onClick={this.props.removeShape.bind(null, id, this.props.shapes)} key={id} r={shape.length} cx={shape.x} cy={shape.y} fill={shape.color} stroke="black" />)
      }
    })
    return(
      <g>
        {updatedShapes}
      </g>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('content')
);