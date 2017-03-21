import $ from 'jquery';
import Reflux from 'reflux';

const ApiActions = Reflux.createActions({
	"get":{
		children:['complete','failed']
	},
	"post":{
		children:['complete','failed']
	}
})

ApiActions.get.listen(function(){
	let path =``;
	let getData ={

	}
	$.ajax({
		type:'get',
		url:path,
		dataType: 'json',
		cached:false,
		xhrFields:{
			withCredentials:true
		},
		statusCode:{
			'404':() =>{
				console.log('404');
			},
			'403':() =>{
				console.log('403');
				this.failed(response);
			}
		}
	}).then((response) => {
	this.completed(response);
	},this.failed);
});