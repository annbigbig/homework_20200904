<template>

<div id="tabAll" class="tabcontent" :key="componentKey">
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
     <el-form ref="form" label-position="top" label-width="100px">
           <el-form-item>
              <el-button type="primary" @click="ajaxForAll">更 新</el-button>
              <el-button @click="reset">清 除</el-button>
           </el-form-item>
     </el-form>
    </el-row>
    <br/>
    
    <!--
    <el-row>
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
    </el-row>
    <br/>
    -->

   <el-row>
       <el-table v-if="status === 200 && result === true && employees.length > 0"
            :data="employees"
            stripe
             style="width: 100%">
         <el-table-column :formatter="convertToString" label="員 工 編 號" width="120">
            <template slot-scope="scope">
                <el-button size="mini" type="info" @click="goOne(scope.row.id)"> {{ scope.row.id }} </el-button>
            </template>
         </el-table-column>
         <el-table-column prop="name" label="姓 名" width="180"></el-table-column>
         <el-table-column prop="birthday" label="生 日" width="180"></el-table-column>
         <el-table-column prop="address" label="地 址" width="250"></el-table-column>
         <el-table-column prop="luckyNumber" label="幸 運 號 碼" width="100"></el-table-column>
         <el-table-column prop="online" :formatter="cellValueRenderer" label="在 職 狀 態"></el-table-column>
         <el-table-column label="功 能 連 結" width="100">
            <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="goUpdate(scope.row.id)"> 修 改 </el-button>
            </template>
         </el-table-column>

         <el-table-column label="功 能 連 結" width="100">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="goDelete(scope.row.id)"> 刪 除 </el-button>
            </template>
         </el-table-column>
       </el-table>
    </el-row>
    <br/>

    <el-row>
       <el-tag v-if="!result && employees.length === 0 "
           type="danger"
           size="medium"
           effect="dark">
           找不到任何員工資料
      </el-tag>
    </el-row>

</div>

</template>


<script>
import baseMixins from '../mixins/baseMixins.js';

//取出全部員工

export default {
     mixins: [baseMixins],
     data() {
        return {
             messages: [
			        { type: 'warning', label: '頁面載入後取出所有員工' },
			        { type: 'info', label: '請拖曳改變瀏覽器視窗大小來確認RWD效果' },
			        { type: 'success', label: 'Please resize the browser window to confirm RWD effect' }
		       ]
        }
     },
     methods: {
        goOne : function(emp_id) {
           console.log('AllTab.vue  emp_id === ' , emp_id);
           this.$emit('changeViewEvent','oneID',emp_id);
           
        },
        goUpdate : function(emp_id) {
           console.log('goUpdate()  emp_id === ', emp_id);
           this.$emit('changeViewEvent','updateID',emp_id);
        },
        goDelete : function(emp_id) {
           console.log('goDelete()  emp_id === ', emp_id);
           this.$emit('changeViewEvent','deleteID',emp_id);
        }
     },
     mounted: function() {
        console.log('== mounted == ');
        this.ajaxForAll();
     }
  };

</script>

<style scoped>
/* el-tag標簽的字體大小 , working*/
.el-tag {
   font-size: 18px;
}

element-style {
   margin-left: 10px;
}

div.cell /deep/ button{
  float:right;
}

</style>