<template>
<div id="tabDelete" class="tabcontent" :key="componentKey">
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
            <el-form-item label="請輸入要刪除的員工編號">
               <el-input v-model="emp_id" type="number" style="width: 100px" @change="check_empId"></el-input>
               <el-button type="info" @click.prevent="ajaxForOne">載 入</el-button>
            </el-form-item>

            <el-form-item>
               <el-button type="primary" @click.prevent="ajaxForDelete">刪除員工</el-button>
               <el-button @click="reset">清 除</el-button>
            </el-form-item>
       </el-form>
    </el-row>
    <br/>

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
   <br/>

    <el-row>
       <el-tag v-if=" status===-7 && !result && msg==='員工資料刪除失敗'" type="danger" size="medium" effect="dark">
           <b>刪 除 員 工 失 敗</b>
           <br/>
           <span class="err_red">
            錯誤代碼 : {{ status }} <br/>
            錯誤訊息 : {{ msg }} <br/>
           </span>
       </el-tag>
    </el-row>

    <el-row>
       <el-tag v-if=" status===-99 && !result && msg==='EMPLOYEE_NOTFOUND'" type="danger" size="medium" effect="dark">
           <b> 編 號 {{ emp_id }} 的 員 工 不 存 在</b>
           <br/>
           <span class="err_red">
            錯誤代碼 : {{ status }} <br/>
            錯誤訊息 : {{ msg }} <br/>
           </span>
       </el-tag>
    </el-row>

    <el-row>
       <el-tag v-if="errors.length > 0" type="danger" size="medium" effect="dark">
             <b>請 處 理 以 下 發 生 的 錯 誤</b>
             <ul class="err_red">
                  <li v-for="error in errors">{{ error }}</li>
             </ul>
       </el-tag>
    </el-row>

    <el-row>
       <el-tag v-if=" status===200 && result && msg==='刪除成功'" type="success" size="medium" effect="dark">
            刪 除 員 工 資 料 成 功
       </el-tag>
    </el-row>

</div><!-- id="tabDelete" -->
</template>


<script>
import baseMixins from '../mixins/baseMixins.js';
//刪除員工

export default {
     mixins: [baseMixins],
     data() {
          return  {
               emp_id: 0,
               message : {
                  type: 'warning',
                  label : '輸入員工編號，刪除一個員工'
               },
               messages: [
			        { type: 'warning', label: '輸入員工編號，刪除一個員工' },
			        { type: 'info', label: '請拖曳改變瀏覽器視窗大小來確認RWD效果' },
			        { type: 'success', label: 'Please resize the browser window to confirm RWD effect' }
		     ]
          }
     },
     mounted: function() {
        console.log('DeleteTab.vue  this.$route.params.id ===' , this.$route.params.id);
        if(this.$route.params.id > 0 ){
           this.emp_id = this.$route.params.id;
           this.ajaxForOne();
        }
     },
     watch:{
	        /* 對 emp_id 值進行監聽，只要emp_id 改變了，就會觸發程式 */
	        emp_id: function (val) {
	            this.errors = []; //消掉紅色錯字區域
	            this.result = true;
	            this.msg = ''; 
	        }
	 }
  };

</script>


<style scoped>
/* el-tag標簽的字體大小 , working*/
.el-tag {
   font-size: 18px;
}
</style>