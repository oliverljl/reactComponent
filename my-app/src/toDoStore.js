import Reflux from 'reflux';
import ToDoActions from './toDoAction';
import $ from 'jquery';

export default class ToDoStore extends Reflux.Store{
	constructor(props) {
		super(props);
		this.listenables = ToDoActions;
		let state = this.getInitialState();
		this.state = $.extend(state,props);
	}
	getInitialState() {
		return {
			"textList":[],
			"newItem":"",
			"itemRow":{
				"dynamic":[],
				"iNumber":[],

			},
			"myitem":"",
			"count":0
		}
	}

	onSearch(item,dynamicItem,iNumber){
		var newState = $.extend({},this.state.itemRow);
		newState.dynamic = dynamicItem.item;
		newState.iNumber = dynamicItem.myNumber;
		this.setState({"newItem":item,"itemRow":newState,"myitem":dynamicItem});
	}
	onAdd(iNumber,count){
       	this.setState({"newItem":"","itemRow.dynamic":"","itemRow.iNumber":iNumber,"count":count});
	}
	onDelete(count){
		this.setState({"newItem":"","itemRow.dynamic":"","count":count});
	}
}