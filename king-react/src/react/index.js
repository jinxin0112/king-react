import {renderComponent} from '../react-dom';
class Component {
    constructor(props){
        this.props = props;
    }
    setState(newState){
        Object.assign(this.state, newState);
        let old = this.dom;
        let newEle = renderComponent(this);
        old.parentNode.replaceChild(newEle,old);
        this.dom = newEle;
    }
}

function createElement(type, props, ...children){
    return { type, props, children };
}


let React = {
    createElement,
    Component
}

export default React;