import React from './react';
import ReactDOM from './react-dom';

/* 用法1
let h1 = <h1 onClick={()=>{
    console.log('ojbk');
}} style={{color:'#e4393c'}}><span>helloKing</span></h1>;*/

/* 用法2
function MyComponent(props){
    return <h1>hello{props.name},age:{props.age}</h1>
}*/

// 用法3
class MyComponent extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            name: 'king'
        }
    }

    render(){
        return <h1 className="item" style={{color:"red"}} onClick={()=>{
            this.setState({
                name: 'gyh'
            });
        }}>hello {this.state.name}</h1>
    }
}
ReactDOM.render(<MyComponent name="gyh" age={9}/>,document.getElementById('root'));