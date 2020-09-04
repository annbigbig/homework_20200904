<template>

<div id="tabOne" class="tabcontent" :key="componentKey">
    <el-row :gutter="10">
       <el-col :xs="11" :sm="11" :md="8" :lg="8" :xl="4"> 
          <el-tag
            :type="messages[0].type"
             size="medium"
             effect="dark">
             {{ messages[0].label }}
          </el-tag>
       </el-col>
       <el-col :xs="11" :sm="11" :md="8" :lg="8" :xl="10"> 
          <el-tag
            :type="messages[1].type"
             size="medium"
             effect="dark">
             {{ messages[1].label }}
          </el-tag>
       </el-col>
       <el-col :xs="2" :sm="2" :md="8" :lg="8" :xl="10"> 
          <el-tag
            :type="messages[2].type"
             size="medium"
             effect="dark">
             {{ messages[2].label }}
          </el-tag>
       </el-col>   
    </el-row>
    <br/>

    <el-row>
      <el-form ref="form" label-position="top" label-width="200px">
          <el-form-item label="請輸入要查詢的員工編號">
             <el-input v-model="emp_id" type="number" style="width: 100px" @change="check_empId"></el-input>
          </el-form-item>

          <el-form-item>
             <el-button type="primary" @click="ajaxForOne">查 詢</el-button>
             <el-button @click="reset">清 除</el-button>
          </el-form-item>
      </el-form>
    </el-row>

     <br/><br/>

    <el-table v-if="status === 200 && result === true && employees.length > 0"
        :data="employees"
        stripe
        style="width: 100%">
    <el-table-column prop="id" label="員 工 編 號" width="120"></el-table-column>
    <el-table-column prop="name" label="姓 名" width="180"></el-table-column>
    <el-table-column prop="birthday" label="生 日" width="180"></el-table-column>
    <el-table-column prop="address" label="地 址" width="250"></el-table-column>
    <el-table-column prop="luckyNumber" label="幸 運 號 碼" width="100"></el-table-column>
    <el-table-column prop="online" :formatter="cellValueRenderer" label="在 職 狀 態"></el-table-column>
  </el-table>

  <el-tag v-if=" msg === 'EMPLOYEE_NOTFOUND' "
       type="danger"
       size="medium"
       effect="dark">
       找不到編號 {{ emp_id }} 的員工，請用其他員工編號重新搜尋
  </el-tag>

  <el-tag v-if="errors.length > 0"
       type="danger"
       size="medium"
       effect="dark">
      <b>請 處 理 以 下 發 生 的 錯 誤</b>
         <ul class="err_red">
            <li v-for="error in errors">{{ error }}</li>
         </ul>
  </el-tag>

</div>
</template>

<script>
import baseMixins from '../mixins/baseMixins.js';

//用id取一個員工

export default {
     mixins: [baseMixins],
     data() {
          return  {
             emp_id: 0,
             messages: [
			        { type: 'warning', label: '輸入id , 返回一個員工' },
			        { type: 'info', label: '請拖曳改變瀏覽器視窗大小來確認RWD效果' },
			        { type: 'success', label: 'Please resize the browser window to confirm RWD effect' }
		       ]
          }
     },
     mounted: function() {
        console.log('OneTab.vue  this.$route.params.id ===' , this.$route.params.id);
        if(this.$route.params.id > 0 ){
           this.emp_id = this.$route.params.id;
           this.ajaxForOne();
        }
     },
	  watch:{
	        /* 對 emp_id 值進行監聽，只要emp_id 改變了，就會觸發程式 */
	        emp_id: function (val) {
               this.errors = []; // clear error messages red text
	            this.msg = ''; //清空msg
	        }
	  }
  };

</script>

<style scoped>
/* el-tag標簽的字體大小 , working*/
.el-tag {
   font-size: 18px;
}

/*  el-table的th裡的div , not working */
.el-table th .cell div {
  background-color: #4CAF50;
  color: white;
}

</style>