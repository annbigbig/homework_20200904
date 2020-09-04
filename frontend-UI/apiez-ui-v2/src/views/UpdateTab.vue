<template>

<div id="tabUpdate" class="tabcontent" :key="componentKey">
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
     <el-form ref="form" :model="employee" label-position="left" label-width="80px">
        <el-form-item label="員 工 編 號">
            <el-input v-model="employee.id" style="width: 200px" type="number" min="1"></el-input>
            <!-- <el-button type="info" @click.prevent="proxyAjaxForOne">載 入</el-button> -->
        </el-form-item>

        <el-form-item label="姓 名">
            <el-input v-model="employee.name" style="width: 200px" @keypress.native="preventNumericInput"></el-input>
        </el-form-item>

        <el-form-item label="地 址">
            <el-input v-model="employee.address" style="width: 200px"></el-input>
        </el-form-item>

        <el-form-item label="幸 運 號 碼">
            <el-input v-model="employee.luckyNumber" style="width: 200px" type="number" min="1" max="100"></el-input>
        </el-form-item>

        <el-form-item label="出 生 日 期">
            <el-date-picker type="date" placeholder="出生年月日" v-model="employee.birthday" style="width: 200px;"></el-date-picker>
        </el-form-item>

        <el-form-item label="在 職 狀 態">
            <el-radio-group v-model="employee.online">
               <!-- <el-radio value="true" label="true">仍在職</el-radio> -->
               <!-- <el-radio value="false" label="false">已離職</el-radio> -->
               <el-radio v-for="option in options" :value="option.value" :label="option.value" :key="option.id"> {{option.text}} </el-radio> 
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click.prevent="ajaxForUpdate">修改員工</el-button>
            <el-button @click="reset">清 除</el-button>
        </el-form-item>
     </el-form>
  </el-row>

  <el-row>
     <el-tag v-if=" status!==200 && !result" type="danger" size="medium" effect="dark">
         <b>修 改 員 工 失 敗</b>
         <br/>
         <span class="err_red">
             錯誤代碼 : {{ status }} <br/>
             錯誤訊息 : {{ msg }} <br/>
          </span>
     </el-tag>
  </el-row>

  <el-row>
     <el-tag v-if=" status===-99 && !result && msg==='EMPLOYEE_NOTFOUND'" type="danger" size="medium" effect="dark">
         <b> 編 號 {{ employee.id }} 的 員 工 不 存 在</b>
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
     <el-tag v-if=" status===200 && result && msg==='儲存成功'" type="success" size="medium" effect="dark">
          修 改 員 工 資 料 成 功
     </el-tag>
  </el-row>

</div>

</template>


<script>

import baseMixins from '../mixins/baseMixins.js';
import moment from 'moment';

export default {
     mixins: [baseMixins],
     data() {
          return  {
              emp_id: 0,
		        options: [
   		          {id: 1, text: '在職中', value: true},
			          {id: 2, text: '已離職', value: false}
              ],
              messages: [
			        { type: 'warning', label: '輸入員工資料，修改一個員工' },
			        { type: 'info', label: '請拖曳改變瀏覽器視窗大小來確認RWD效果' },
			        { type: 'success', label: 'Please resize the browser window to confirm RWD effect' }
		        ]
          }
     },
     mounted: function() {
        console.log('UpdateTab.vue  this.$route.params.id ===' , this.$route.params.id);
        if(this.$route.params.id > 0 ){
           this.emp_id = this.$route.params.id;
           this.ajaxForOne();
        }
     },
     methods: {
        customFormatter(date) {
          return moment(date).format('YYYY-MM-DD');
       },
       proxyAjaxForOne : function() {
          if(this.employee.id > 0){
             this.emp_id = this.employee.id;
             this.ajaxForOne();
             if(this.employees.length === 0){
                this.reset();
             }
          }
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