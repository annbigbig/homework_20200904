<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/" tag="button">Home</router-link> | -->
      <!-- <router-link to="/about" tag="button">About</router-link> | -->
      
         
            <router-link to="/employee" @click.native="onClick($event,0)" v-bind:class="{ active: (activated_button_index === 0) }">
               <el-button type="primary" round>用 id 取一個員工</el-button>
           </router-link>
         
           
           <router-link to="/employees" @click.native="onClick($event,1)" v-bind:class="{ active: (activated_button_index === 1) }">
               <el-button type="primary" round>取 出 全 部 員 工</el-button>
           </router-link>
         
         
           <router-link to="/employees/search" @click.native="onClick($event,2)" v-bind:class="{ active: (activated_button_index === 2) }">
               <el-button type="primary" round>以 姓 名 搜 尋 員 工</el-button>
           </router-link>
         
         
           <router-link to="/employee/create" @click.native="onClick($event,3)" v-bind:class="{ active: (activated_button_index === 3) }">
               <el-button type="primary" round>新  增  員  工</el-button>
           </router-link>
         
         
           <router-link to="/employee/update" @click.native="onClick($event,4)" v-bind:class="{ active: (activated_button_index === 4) }">
               <el-button type="primary" round>修  改  員  工</el-button>
           </router-link>
         
         
           <router-link to="/employee/delete" @click.native="onClick($event,5)" v-bind:class="{ active: (activated_button_index === 5) }">
               <el-button type="primary" round>刪  除  員  工</el-button>
           </router-link>
        
      
      <router-link to="/alpha" @click.native="onClick($event,6)" v-bind:class="{ active: (activated_button_index === 6) }">
          <el-button type="primary" round>測 試 用 區 塊 A</el-button>
      </router-link>
      <router-link to="/beta" @click.native="onClick($event,7)" v-bind:class="{ active: (activated_button_index === 7) }">
          <el-button type="primary" round>測 試 用 區 塊 B</el-button>
      </router-link>
      <router-link to="/theta" @click.native="onClick($event,8)" v-bind:class="{ active: (activated_button_index === 8) }">
          <el-button type="primary" round>測 試 用 區 塊 C</el-button>
      </router-link>
      
      
    </div>
    <br/>
    <router-view @changeViewEvent="changeView"></router-view>
  </div>
</template>

<script>
export default {

  data() {
       return {
          activated_button_index : 0
       }
  },

  methods: {
       onClick(event,tabIndex) {
          var self = this;
          self.activated_button_index = tabIndex;   
          console.log('tabIndex === ' , tabIndex , 'activated_button_index === ' , self.activated_button_index);
       },
       changeView(viewName,param) {
           console.log('App.vue changeView() viewName === ' , viewName);
           if(viewName === 'oneID') { 
              this.$router.push({ name: 'oneID', params: { id: param } });
              this.activated_button_index = 0; //black the menu button
           }else if(viewName === 'updateID') {
              this.$router.push({ name: 'updateID', params: { id: param } });
              this.activated_button_index = 4; //black the menu button
           }else if(viewName === 'deleteID') {
              this.$router.push({ name: 'deleteID', params: { id: param } });
              this.activated_button_index = 5; //black the menu button
           }   
       }
  },
  watch:{
    $route (to, from){
        //this.show = false;
        //console.log('route path is changed from ' , from , ' , to ' , to);
        //console.log('from.path ===', from.path);
        //console.log('to.path ===' , to.path);

        //write these code for BUG when u press last page button in browser
        var newPath = to.path;
        if(newPath === '/employees') {
           this.activated_button_index = 1;
        }else if (newPath === '/employees/search'){
           this.activated_button_index = 2;
        }else if (newPath === '/employee') {
           this.activated_button_index = 0;
        }else if (newPath === '/employee/create'){
           this.activated_button_index = 3;
        }else if (newPath === '/employee/update'){
           this.activated_button_index = 4;
        }else if (newPath === '/employee/delete'){
           this.activated_button_index = 5;
        }else{
           this.activated_button_index = 0;
        }
    }
} 
}

</script>

<style>

  html,body{ 
    width: 100%; height: 100%; 
  } 
  
  #app { 
    height: 100%; 
  }

</style>

<!--
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
-->