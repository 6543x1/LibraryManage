<template>
  <div class="voteDetail">
       <div id="publish-page">
       <MyNav/>
        <div class="box4">
            <div class="box5">
                <button href="" onclick="window.history.back(-1)"
                    style="outline: none; cursor: pointer; border: none; background: none; font-size: 30px; position: relative;left: 5px; float: left;"><span
                        style="color: red;font-size: 30px;">&lt;</span></button>
                <span class="title">{{vote.title}}</span>
              <button @click="gotoStatics" class="btn_Statics"
            ><img src="../assets/img/投票(1).png" style="height: 15px" />
            统计结果</button>
                <span style="float: left;clear: both;margin-left: 100px;color: slategrey;">{{vote.publisher}}</span>
                <span style="float: left;margin-left: 50px;color: slategrey;">{{vote.publishedTime}}</span>
                <span style="float: left;margin-left: 50px;color:red">截止时间：</span>
            <span style="float: left;color: red;">{{vote.deadLine}}</span>
            </div>
            <div class="box6">
                <!-- <input type="checkbox" v-for="(item,index) in vote.selections" :key="index" name="1">{{item}}</input> -->
                <p v-for="(item,index) in vote.selections" :key="index">
                    <span v-if="vote.limitation==1">
                    <label><input type="radio" name="1" :value="item" v-model="curSelection" @change="showSelection"/>{{item}}</label>
                    </span>
                    <span v-if="vote.limitation!=1">
                    <label><input type="checkbox" name="2" v-model="selections" :value="item" @change="showSelections"/>{{item}}</label>
                    </span>
                    <!-- <label><v-if="vote.limitation!=1" input type="checkBox" name="2" :value="item" v-model="Selections" @change="showSelections"/>{{item}}</label> -->
                    </p>
                <!-- <form action="" method="post">
                    <p><label><input type="checkbox" name="1" value="1">选项一选项一选项一选项一</label></p>
                    <p><label><input type="checkbox" name="1" value="2">选项一选项一选项一选项一</label></p>
                    <p><label><input type="checkbox" name="1" value="3">选项一选项一选项一选项一</label></p>
                    <p><label><input type="checkbox" name="1" value="4">选项一选项一选项一选项一</label></p>
                </form> -->
                <!-- <form action="" method="post"> -->
                    <!-- <button type="button" id="votei"
                        onclick="document.getElementById('count').style.display='block';document.getElementById('votei').style.background='rgb(164,164,164)';document.getElementById('butto').innerHTML='已投票';document.getElementById('vote_count').style.display='block'"> -->
                    <button type="button" id="votei" @click="gotoVote">
                        <span color="white" id="butto">投 票</span>
                    </button>
                <!-- </form> -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue";
import service from "../api/services/service";
import axios from "axios";
export default {
    name:'VoteDetail',
    components:{
        MyNav,
    },
    data(){
        return {
            vote:{},
            curSelection:'',
            selections:[],
        }
    },
    computed:{
        voted(){
            return '投票';
        }
    },
    methods:{
        gotoStatics(){
              let token = sessionStorage.getItem('token');
              let result;
              let selectionsDetail;
      console.log(this.vote.vid);
      service.defaults.headers.common["token"] = token;
      axios.all([service.get("/api/classes/"+this.vote.classID+"/voter", {params:{vid: this.vote.vid}}),
        service.get("/api/classes/"+this.vote.classID+"/voteSelections", {params:{vid: this.vote.vid}})]).then(axios.spread((res1,res2)=>{
            console.log("RES1 RES2",res1,res2);
            result=res1.data.data;
            selectionsDetail=res2.data.data;
             this.$router.push({name:'Statics',params:{statics:JSON.stringify({
              type:'vote',data:result,selections:selectionsDetail})}
          });
        }));
    //   service
    //     .get("/api/classes/"+this.vote.classID+"/voter", {params:{vid: this.vote.vid}})
    //     .then((res) => {
    //       console.log(res);
    //       result=res.data.data;
    //       console.log("voteDETAILresult",result);
    //     })
    //     .catch((err) => console.log(err));
    //     service
    //     .get("/api/classes/"+this.vote.classID+"/voteSelections", {params:{vid: this.vote.vid}})
    //     .then((res) => {
    //       console.log("voteSelectionsRowRes",res);
    //       selectionsDetail=res.data.data;
    //     })
    //     .catch((err) => console.log(err));
    //     console.log("result",result);
    //     console.log("detail",selectionsDetail);
        
        
        },
        gotoVote(){
                let param = new FormData();
      param.append("vid", this.vote.vid);
      if(this.vote.limitation==1){
          param.append("selections",JSON.stringify([this.curSelection]));
          
            console.log(JSON.stringify([this.curSelection]));
      }
      else{
          console.log("selections",this.selections);
          param.append("selections",JSON.stringify(this.selections));
          console.log(JSON.stringify(this.selections));
      }
      
      let token = sessionStorage.getItem('token');
      service.defaults.headers.common["token"] = token;
      //"/api/classes/"+this.vote.classID+"/notice/testVote"
      service
        .post("/api/classes/"+this.vote.classID+"/vote", param)
        .then((res) => {
          console.log(res);
            alert(res.data.msg);
            console.log("Selections listed ",res.data.data);
            // if(res.data.status==true){
            //     this.notice.confirm=true;
            // }
        
        })
        .catch((err) => console.log(err));
        },
        showSelection(){
            console.log(this.curSelection);
        },
        showSelections(){
            console.log(this.selections);
        }
    },
    mounted(){
        this.vote=JSON.parse(this.$route.params.vote);
        console.log(this.vote);
    }
}
</script>
<style src="../assets/css/style.css" scoped>
</style>
 <style scoped>
        .box6 p {
            position: relative;
            left: 0px;
            margin: 10px;
            font-size: 20px;
        }
        .box4{
            height:300px;
        }
        .btn_Statics{
  margin-left:90px;
  margin-right: 10px;
  position: relative;
  float:right;
   cursor: pointer;
  border: none;
  /* display: inline-block; */
  width: 80px;
  height: 20px;
  font-size: 15px;
  /* background: rgb(1, 176, 255); */
  background: white;
}
    </style>
