import $ from 'jquery';
import Reflux from 'reflux';
import ApiActions from './httpActions';

export default class ApiStore extends Reflux.Store{
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
		this.listenables = ApiActions;
	}
	getInitialState() {
		return {};
	}
	onGetFailed(error){
		console.error("",error);
	}
	onPostFailed(error){
		console.error("",error);
	}
	onGetCompleteed(data){
		let state = this.getInitialState();
		this.setState(state);
	}
}