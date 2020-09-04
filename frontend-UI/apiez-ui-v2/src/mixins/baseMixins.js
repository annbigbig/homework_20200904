import axios from 'axios';

const baseMixins =  {
	data() {
		return  {
		   api_base_path : 'https://www.dq5rocks.com/apiez03',
		   componentKey: 0,
		   errors : [],	
		   result: true,
		   status: null,
		   msg: '',
		   employee: {
			   id : null,
			   name : '',
			   address : '',
			   birthday : '1980-01-01',
			   luckyNumber : 1,
			   online : true
		   },
		   employees: [
			   { id : null,
				 name : '',
				 address : '',
				 birthday : '1980-01-12',
				 luckyNumber : 12,
				 online : false
			   }
		   ]
		}
    },
    methods: {
        hello: function () {
            console.log('hello from mixin!');
        },
	    clearErrorCss: function () {
	    	console.log(' ===== clearErrorCss === ');
	    },
	    ajaxForAll : function() {
			axios
		      .get(this.api_base_path + '/employees/')
			  .then(response => {
				  this.employees = response.data.object;
				  this.result = response.data.result;
		    	  this.status = response.data.status;
			   });
			console.log('=== ajaxForAll ===');
		},
		ajaxForOne : function() {
			console.log('===== ajaxForOne ===== 取出編號 [' , this.emp_id , '] 的員工');

			//clear errors list first
			this.errors = [];
			
			//validation rules here
			if (this.emp_id <= 0) {
				this.errors.push('需要輸入大於0的員工編號');
			}
			 
		    /* check id value first */
			if(this.errors.length === 0){
			   //ajax call
			   axios
		         .get(this.api_base_path + '/employee/' + this.emp_id)
		         .then(response => {
					 this.employee = response.data.object;
					 this.employees = [];
					 this.employees.push(this.employee);	
		    	     this.result = response.data.result;
		    	     this.status = response.data.status;
		    	     this.msg = response.data.msg;
		    	  });
			}
			console.log('===== ajaxForOne ===== errors.length ===' , this.errors.length);
			console.log('===== ajaxForOne ===== result = [' , this.result , '] ');
			console.log('===== ajaxForOne ===== status = [' , this.status , '] ');
		},
		ajaxForSearch : function() {
			//clear errors list first
			this.errors = [];
			
			//validation rules here
			if (this.emp_name.length < 2) {
				this.errors.push('需要輸入姓名，姓名長度至少為2個字元');
			}
			
			/* check keyword length first */
			if(this.errors.length === 0){
				    //ajax call
					axios
		      		.post(this.api_base_path + '/employees/search',{
		    	  		filters : [
		    		 		  {
		    		     		column : "name",
		    		     		operator : "like",
		    		    		value : this.emp_name
		    		 		  }
		    	  		],
		    	  		sorts : [
		    				  {
		    		  		    column : "name",
		    		    		type : "desc"
		    		 		  }
		    	 		],
		    	  		pageNumber : 1,
		    	  		pageSize : 10
		       		})
		      		.then(response => {
		    	 		this.employees = response.data.object;
		    	  		this.result = response.data.result;
		    	  		this.status = response.data.status;
		    	  		this.msg = response.data.msg;
		    		});
					
			}

			console.log('=== ajaxForSearch === 搜尋姓名關鍵字 [' , this.emp_name , '] 的員工');
			console.log('=== ajaxForSearch === result = [' , this.result , '] ');
			console.log('=== ajaxForSearch === status = [' , this.status , '] ');
		},
		ajaxForCreate : function(e) {
			  //clear errors list first
			  this.errors = [];

			   //reset to default value for hiding previous blue ' 新 增 員 工 資 料 成 功 '
			   this.msg = '';
			   this.result = true;
			   this.status = null;

			  //validation rules here
			  if (this.employee.name.length < 2) {
				this.errors.push('需要輸入姓名，姓名長度至少為2個字元');
			  }
			  
			  if (this.employee.address.length < 10) {
				this.errors.push('需要輸入地址，地址長度最少為10個字');
			  }

			  if (this.employee.luckyNumber < 1 || this.employee.luckyNumber > 100) {
					this.errors.push('幸運號碼需要介於1到100之間');
			  }

			  if(this.errors.length === 0){
				  //ajax call
				  axios
			      .post(this.api_base_path + '/employee',{
			    	  name: this.employee.name,
			    	  address : this.employee.address,
			    	  birthday : this.formattedDate(this.employee.birthday),
			    	  luckyNumber : this.employee.luckyNumber,
			    	  online : this.employee.online
			       })
			      .then(response => {
			    	  this.msg = response.data.msg;
			    	  this.result = response.data.result;
			    	  this.status = response.data.status;
			    	});

			  }
		      
		      //防止表單提交
			  e.preventDefault();
			  //console.log('=== ajaxForCreate === > employee.birthday ===' , this.employee.birthday);
			  this.formattedDate(this.employee.birthday);
		      console.log('=== ajaxForCreate === > result === ' , this.result , '  status === ' , this.status);
		},
		ajaxForUpdate: function (e){
			 //clear errors list first
			  this.errors = [];

			  //reset to default value for hiding previous blue ' 修 改 員 工 資 料 成 功 '
				this.msg = '';
				this.result = true;
				this.status = null;
			  
			  //validation rules here
			  if (this.employee.id <= 0) {
			  	 this.errors.push('需要輸入大於0的員工編號');
			  }

			  if (this.employee.name.length < 2) {
				this.errors.push('需要輸入姓名，姓名長度至少為2個字元');
			  }

			  if (this.employee.address.length < 10) {
				this.errors.push('需要輸入地址，地址長度最少為10個字');
			  }

			  if (this.employee.luckyNumber < 1 || this.employee.luckyNumber > 100) {
					this.errors.push('幸運號碼需要介於1到100之間');
			  }

			  if(this.errors.length === 0){
				//ajax call
				axios
				.put(this.api_base_path + '/employee',{
					id: this.employee.id,
					name: this.employee.name,
					address : this.employee.address,
					birthday : this.formattedDate(this.employee.birthday),
					luckyNumber : this.employee.luckyNumber,
					online : this.employee.online
				 })
				.then(response => {
					this.msg = response.data.msg;
					this.result = response.data.result;
					this.status = response.data.status;
				  });

			  }
		
		      //防止表單提交
		      e.preventDefault();
		      console.log('=== ajaxForUpdate === > result === ' , this.result , '  status === ' , this.status);
		      console.log('=== ajaxForUpdate === > employee.id === ' , this.employee.id);
		      console.log('=== ajaxForUpdate === > employee.name === ' , this.employee.name);
		      console.log('=== ajaxForUpdate === > employee.address === ' , this.employee.address);
		      console.log('=== ajaxForUpdate === > employee.luckyNumber === ' , this.employee.luckyNumber);
		      console.log('=== ajaxForUpdate === > employee.birthday === ' , this.employee.birthday);
		      console.log('=== ajaxForUpdate === > employee.online === ' , this.employee.online);
		},
		ajaxForDelete: function () {
			  //clear errors list first
			  this.errors = [];

			  //reset to default value for hiding previous blue ' 刪 除 員 工 資 料 成 功 '
			  this.msg = '';
			  this.result = true;
			  this.status = null;
			  
			  //validation rules here
			  //validation rules here
			  if (this.emp_id <= 0) {
				  this.errors.push('需要輸入大於0的員工編號');
		      }
		
			  if (this.errors.length === 0) {

		        //ajax call
				  axios
			      .delete(this.api_base_path + '/employee/' + this.emp_id)
			      .then(response => {
			    	  this.msg = response.data.msg;
			    	  this.result = response.data.result;
			    	  this.status = response.data.status;
			       });
		      }
			
	         console.log(' ===== ajaxForDelete ===== ');
	         console.log(' ===== ajaxForDelete ===== emp_id === ' , this.emp_id);
	    },
	    ajaxForTestDatePicker: function () {
	    	console.log(' =====  ajaxForTestDatePicker ===== ');
	    	console.log('birthday = ' , this.birthday);
	    	
	    },
	    check_empId: function(){
	    	//use for limiting positive value input [強制輸入大於等於0的數字]
	        var emp_id = this.emp_id;
	             emp_id = emp_id.replace(/[^\d]/g, ''); // Clear characters other than "number" and "."
	        if (emp_id.indexOf('.') < 0 && emp_id != '') {
	                       // The above has been filtered. The control here is that if there is no decimal point, the first digit cannot be an amount similar to 01, 02.
	            emp_id = parseInt(emp_id);
	        }
	        this.emp_id = emp_id;
		},
		preventNumericInput($event) {
			console.log('==== preventNumericInput ==== keyCode ===' , $event.keyCode , '  key ===' , $event.key); //will display the keyCode and key value 
		
			var keyCode = ($event.keyCode ? $event.keyCode : $event.which);
			if (keyCode > 47 && keyCode < 58) {
				$event.preventDefault();
			}
		},
		forceNumberInput(value){
			console.log('value ===' , value)
		},
		forceRerender: function() {
			this.componentKey += 1;
		},
		reset: function() {
			this.msg = '';       //消掉 找不到編號 xxx 的員工，請用其他員工編號重新搜尋 bala bala
			this.status = 0;
			this.result = true;
			this.employees = []; //clear table results
			this.employee = {
			   id : '',
			   name : '',
			   address : '',
			   birthday : '1980-01-01',
			   luckyNumber : 1,
			   online : true
			};  //clear add/update successful messages
            this.errors = [];    //clear error messages
            this.forceRerender();
            console.log('clear !');
		 },
		 cellValueRenderer: function(row, column, cellValue, index) {
			let value = cellValue;
			if (typeof row[column.property] === 'boolean') {
				cellValue ? value = String('在職中') : value = String('已離職');
				//value = String(cellValue);
			}
			return value;
		},
        convertToString: function(numberValue) {
			var str = String(numberValue);
			return str;
		},
		formattedDate: function(birthday) {
			var d = new Date(birthday);
			var day = d.getDate();
			var month = d. getMonth() + 1;
			var year = d.getFullYear();
			console.log('year =' , year , '  month = ', month , ' day =' , day);
			var dateStr = year + '-' + month + '-' + day;
			console.log('dateStr =' , dateStr);
			return dateStr;
		}
	    
     }//methods:
  };

  export default baseMixins