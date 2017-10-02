console.log('App.js is running!');

const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: []
};

const onFormSubmit = (e) => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
};

const onRemoveAll = () => {
  app.options = [];
  render();
};

const appRoot = document.getElementById('app');

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
      <button onClick={onRemoveAll}>Remove All</button>
      <ol>
        {
          app.options.map((option) => <li key={option}>{option}</li>)
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );

}


let btntext = 'show details'
let text=null
const setText = () => {
  if(btntext == 'show details'){
  btntext = 'hide details'
  text='My details'
  }
  else{
    btntext = 'show details'
    text=null
  }
  rerender();
}

class Person{
  constructor(name='default'){
    this.name=name 
  }
   greet(){
    console.log(this.name)
  }
  greet1(){
    console.log('ha ha')
  }
}
class Student extends Person {
  constructor(name,sub,place){
    super(name)
    this.sub = sub
    this.place = place
    console.log('subject  '+this.sub)
  }
  greet(){
    if(this.place)
    console.log(this.place)
    else
    super.greet1()
  }

}
const me = new Student('shubham','science');
console.log(me)

me.greet()
const rerender = () =>
{
  const template1 = (
    <div>
    <h3>Visibility Toggle</h3>
    <button onClick={setText}>{btntext}</button>
    {text}
    </div>

  )

  ReactDOM.render(template1, appRoot);
};

rerender()

