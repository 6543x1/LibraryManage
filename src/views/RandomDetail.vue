<template>
  <div class="randomDetail">
      <MyNav/>
        <div id="publish-page">
        
        <div class="box4">
            <div class="box5">
                <button href="" onclick="window.history.back(-1)"
                    style="outline: none; cursor: pointer; border: none; background: none; font-size: 30px; position: relative;left: 5px; float: left;"><span
                        style="color: red;font-size: 30px;">&lt;</span></button>
                <span class="title">抽签结果</span>

                <span style="float: left;clear: both;margin-left: 200px;color: slategrey;">抽取人:{{randomStu.publisher}}</span>
                <span style="float: left;margin-left: 50px;color: slategrey;">抽取时间:&nbsp;{{randomStu.publishedTime}}</span>

            </div>

            <div class="box8">
                <p style="position: relative; font-size: 20px;top: 10px">抽取人数:{{sum}}</p>
              
            </div>
            <div class="box6">
                <ul class="randoms">
                    <li class="Stu" v-for="(item, index) in randomStu.students" :key="index">
                        {{item}}
                    </li>
                </ul>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
// import service from "../api/services/service";
import MyNav from "@/components/MyNav.vue";
export default {
    name: 'RandomDetail',
    components: {
        MyNav,
    },
    data(){
        return {
            randomStu:{},
            sum:0,
        }
    },
    mounted() {
        console.log(this.$route.params.randomStu);
        this.randomStu=JSON.parse(this.$route.params.randomStu);
        console.log(this.randomStu.students);
        console.log(this.randomStu.students.length);
        this.sum=this.randomStu.students.length;
    }
}
</script>
<style src="../assets/css/style.css" scoped>
</style>
<style>
    li{
        list-style-type:none; ;
    }
</style>