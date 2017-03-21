import React from 'react';
import Reflux from 'reflux';
import ToDoStore from './toDoStore';
import ToDoAction from './toDoAction'
export default class Todo extends Reflux.Component {
    constructor(props) {
        super(props);
        // this.state = {"textList": [],"newItem":"", "dynamic":[]};
        this.state = {};
        this.store = new ToDoStore();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.filterItems = this.filterItems.bind(this);
    }
    handleSubmit(e){
    	e.preventDefault();
    	this.state.textList.push(this.state.newItem);
    	let count = ++this.state.count;
      	this.state.itemRow.iNumber.push(count);
        ToDoAction.add(this.state.itemRow.iNumber,count);
    }
    handleDelete(e){
    	e.preventDefault();
    	let deleteId = e.target.id;
    	let count = --this.state.count;
       	this.state.textList.splice(deleteId,1);
       	this.state.itemRow.iNumber.pop();
      	ToDoAction.delete(count);
    }
    handleChange(e){
    	e.preventDefault();
		let item = e.target.value;
		let dynamicItem = this.filterItems(item,this.state.textList,this.state.itemRow.iNumber);
		ToDoAction.search(item,dynamicItem);
	}
    filterItems(input,collection,number){
    	var newFilter = {item:[],myNumber:[]};	
    	for (var i=0;i<collection.length;i++){
    		if(input.indexOf(collection[i]) !== -1)
    		{
    			newFilter.item.push(collection[i]);
    			newFilter.myNumber.push(number[i]);
    		}
    	}
    	return newFilter;       
    }
    render() { 
        return(
        	<ToDoContainer textList={this.state.textList} handleEvent={this.handleChange}
        	handleSubmit={this.handleSubmit} filter={this.state.itemRow.dynamic} 
        	devalue={this.state.newItem} deleteItem={this.handleDelete} myIndex={this.state.itemRow.iNumber}
          	/>
      );
    }
}


class ToDoContainer extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		let props = {
			textList : this.props.textList,
			handleEvent : this.props.handleEvent,
			addItem : this.props.handleSubmit,
			filter : this.props.filter,
			value : this.props.devalue,
			deleteItem: this.props.deleteItem,
			myIndex:this.props.myIndex
		}
		return(
				<div className="todo_container">
					<TodoPanel handleChange={props.handleEvent} addItem={props.addItem} devalue={props.value}/>
					<TodoDisplay display_text={props.textList} filter={props.filter}  indexFromTable={props.myIndex} deleteItem={props.deleteItem}/>
				</div>
		);
	}
}

class TodoPanel extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		return(
			<div>
				<input onChange={this.props.handleChange} value= {this.props.devalue} ></input>
				<button onClick={this.props.addItem}>ADD</button>
 			</div>
	);
	}
}

class TodoDisplay extends React.Component{
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}
		getFilterDisplay(){
		let items = this.props.filter;
		let myIndex = this.props.indexFromTable;
		if(items.length!==0){
		const listItems = items.map((item,index) => 
								<div className="tableRow">
								<div className="itemNumber" key={index}>{myIndex}</div>	
								<li className="listItems" key={item.toString()}>{item}</li>
								<button className="deleteButton" id={index} onClick={this.props.deleteItem}>delete</button>
								</div>);
		return listItems;
		}
		else{
		let item2 = this.props.display_text;
		const listItems = item2.map((item,index) =>
			<fieldSet> 
			<div className="tableRow">
				    <div className="itemNumber" key={index}>{index+1}</div>
					<li className="listItems" key={item.toString()}>{item}</li>
					<button className="deleteButton" id={index} onClick={this.props.deleteItem}>delete</button>
			</div>
			</fieldSet>);
		return listItems; 
		} 
	}


	render(){
		let listItems = this.getFilterDisplay();
		return(
		<div>	
		<ul className="ulist">{listItems}</ul>
		</div>
		
	)
	}
}



