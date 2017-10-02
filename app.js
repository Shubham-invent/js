// class Counter extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       count : 0
//     }

//     this.reset = this.reset.bind(this)
//     this.plusOne=this.plusOne.bind(this)
//     this.minusOne=this.minusOne.bind(this)
//   }

//   reset(){
//     this.setState(() => {
//       return {
//         count:0
//       }
//     })
    
//   }
//   plusOne(){
//     this.setState({count:++this.state.count})
    
//   }
//   minusOne(){
//     this.setState({count:--this.state.count})
//   }
//   render(){
//     return(
//       <div>
//         Count : {this.state.count}
//         <button onClick ={this.reset}>Reset</button>
//         <button onClick ={this.plusOne}>+1</button>
//         <button onClick ={this.minusOne}>-1</button>
//       </div>
//     )
//   }

// }
// ReactDOM.render(<Counter/>,document.getElementById('app'))

const Header = (props) => {
  
    return(
      <div>
        <h1>{props.header}</h1>
        <h2>{props.subtitle}</h2>
      </div>

    )
  
}
Header.defaultProps = {
  header:'Indecisio'
}
const Action = (props) => {
    return(
      <div>
        <button  disabled ={props.status} onClick={props.displayOption}>What should I do ?</button>
        <button onClick={props.reset} disabled ={props.status}>Remove All</button>
      </div>

    )
  }
const Options = (props) => {
     return(
      <div>
       Options <br/>
       <Option options={props.options} removeItem={props.removeItem}/>
      </div>

    )
  }

const Option = (props) =>{
      return(
      <ul>
       {props.options.map(function(val,index){
         
         return ( 
         <div>
         <li > {val} </li>
         <button onClick={() => props.removeItem(index)}>Remove</button>
          </div>
         )
       })}
      </ul>
    );
  }

const AddOptions = (props) => {  
    return(
      <div>
        <form onSubmit={props.handleAdd}>
          <input type="text" name='text'/>
          <button>Add Option</button>
       </form>
      </div>

    )
  }


class IndecisionApp extends React.Component {
  constructor(props){
    super(props)
    this.state ={
       options: ['item1']
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.reset = this.reset.bind(this)
    this.displayOption = this.displayOption.bind(this) 
    this.removeItem = this.removeItem.bind(this)
  }
  componentDidMount(){
   
    const json =localStorage.getItem('options')
    const optionsArray = JSON.parse(json)
    if(optionsArray)
    this.setState({options : optionsArray})
    
    //console.log(this.state.options)
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.options.length != this.state.length){
    const optionsArray = JSON.stringify(this.state.options)
    localStorage.setItem('options',optionsArray)
    this.setState(() => ({options:optionsArray}))
    }

  }

  displayOption(){
    alert(this.state.options[Math.floor(Math.random() * this.state.options.length)])
  }
  handleAdd(e){
    e.preventDefault()
    let temp = this.state.options
    temp.push(e.target.elements.text.value)
    this.setState(() =>({options : temp}))
    e.target.elements.text.value=''
  }
  reset(){
    let temp = []
    this.setState(() =>({options : temp}))
    console.log('Reset')
  }
  removeItem(index){
    let temp = this.state.options
    temp.splice(index,1)
    this.setState(() => ({options:temp}))
    console.log(index)
  }
  render(){
    let header = 'This is Header';
    let subtitle ='Let computer Decide';
  
   
    return(
      
      <div>
        <Header header={header} subtitle={subtitle}/>
        <Action status ={this.state.options.length > 0 ? false:true} reset={this.reset}
        displayOption = {this.displayOption} 
          />
        <Options options ={this.state.options} removeItem={this.removeItem}/>
        <AddOptions handleAdd={this.handleAdd} />
      </div>

    )
  }
}
IndecisionApp.defaultProps ={
  options : []
}

ReactDOM.render(<IndecisionApp/>,document.getElementById('app'))