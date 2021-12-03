<template>
  <a-form layout="vertical" :model="formState" v-bind="formItemLayout" :rules="rules" ref="formRef">
    <a-form-item label="书名" name="bookName">
      <a-input v-model:value="formState.bookName" placeholder="输入书名" />
    </a-form-item>
    <a-form-item label="作者" name="author">
      <a-input v-model:value="formState.author" placeholder="输入作者" />
    </a-form-item>
     <a-form-item label="图书类型" name="type">
      <a-input v-model:value="formState.type"  placeholder="输入图书类型" />
    </a-form-item>
     <a-form-item label="ISBN" name="ISBN">
      <a-input v-model:value="formState.ISBN" placeholder="输入图书的ISBN" />
    </a-form-item>
     <a-form-item label="图书所在位置" name="position">
      <a-input v-model:value="formState.position" placeholder="输入图书在图书馆中的位置" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="AddBook">添加到数据库中</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { computed, defineComponent, reactive,ref } from 'vue';
import {message} from "ant-design-vue";
import service from '../api/services/service';
export default defineComponent({
  setup() {
    const formRef=ref();
    const formState = reactive({
      bookName: '',
      author: '',
      type:'',
      ISBN:'',
      position:'',
    });
    const formItemLayout = computed(() => {
      const { layout } = formState;
      return layout === 'horizontal'
        ? {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 14,
            },
          }
        : {};
    });
    const buttonItemLayout = computed(() => {
      const { layout } = formState;
      return layout === 'horizontal'
        ? {
            wrapperCol: {
              span: 14,
              offset: 4,
            },
          }
        : {};
    });
    const rules={
      bookName:[{
        required: true,
          message: '请输入书名',
          trigger: 'blur',
      },
       {
          type:'string',
          message: '必须为数字！',
          trigger: 'blur',
        },
      ],
      author:[{
        required:true,
        message:'请输入作者',
        trigger:'blur',
      }],
      type:[{
        required:true,
        message:'请输入类型',
        trigger:'blur',
      }],
      ISBN:[{
        required:true,
        message:'请输入正确的ISBN',
        trigger:'blur',
      }],
      position:[{
        required:true,
        message:'请输入图书位置',
        trigger:'blur',
      }],
    }
    return {
      formState,
      formItemLayout,
      buttonItemLayout,
      rules,
      formRef
    };
  },
  methods:{
    AddBook(){
       this.formRef
        .validate()
        .then(() => {
          console.log('values', this.formState);
          this.goAddBook();
        })
        .catch(error => {
          console.log('error', error);
        });
    },
     goAddBook(){
      console.log('hello',{...this.formState});
      service.defaults.headers.common['token']=sessionStorage.getItem('token');
      // service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      
      let formData=new FormData();
      // formData.append('bookName',this.formState.bookName);
      // formData.append('author',this.formState.author);
      // formData.append('type',this.formState.type);
      // formData.append('ISBN',this.formState.ISBN);
      // formData.append('position',this.formState.position);
      for(const key in this.formState){
        formData.append(key,this.formState[key]);
      }
      console.log(formData);
      service.post("/api/book/newBook",formData).then((res)=>{
            if(res.data.status==true){
              this.searchResult=res.data.data;
              message.success("添加成功");
            }
            else{
              message.success("添加失败");
            }
        }).catch((err)=>console.log(err));
     }
    }
  }
);
</script>