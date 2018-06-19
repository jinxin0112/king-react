function isType(type){
    return function (content){
       return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}
let util = {}
let arr = ['String', 'Object', 'Function', 'Null', 'Number'];
arr.forEach((type)=>{
    util['is'+type] = isType(type);
});

function createComponent(component, props){
    if(component.prototype.render){
        component = new component(props);
    }else{
        component.render = function(){
            return component(props);
        }
    }
    return component;    
}
export function renderComponent(component){
    return _render(component.render());
}
function render(vnode, container) {
    container.appendChild(_render(vnode));
}
function setAttribute(element, key, value){
    if(key === 'className') key = 'class';
    if(key === 'style'){
        if(util.isObject(value)){
            for(let k in value){
                element['style'][k] = value[k];
            }
        }
        return
    }
    if(key.startsWith('on')){
        key = key.toLowerCase();
        element[key] = value;
        return
    }
    element.setAttribute(key,value);
}
function _render(vnode){
    if(util.isNumber(vnode)){
        vnode = vnode.toString();
    }   
    if(util.isString(vnode)){
        return document.createTextNode(vnode)
    }
    let { props, type, children } = vnode;
    if(util.isFunction(type)){
        let component = createComponent(type, props);
        component.props = props;
        let dom = renderComponent(component);
        component.dom = dom;
        return dom;
    }
    let element = document.createElement(type);
    if(props){
        for(let key in props){
            setAttribute(element, key, props[key]);
        }
    }
    if(children){
        children.forEach(child => render(child,element));
    }
    return element
}
let ReactDOM = {
    render
}

export default ReactDOM;