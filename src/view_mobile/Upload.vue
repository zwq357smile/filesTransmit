<template>
  <div>
    <header class="title-bar">
      <span class="goback" @click="goback">返回</span>
      <span>上传文件</span>
      <span class="submit" @click="uploadFiles">提交</span>
    </header>
    <div class="content">
      <div class="input-wrapper">
        选择要上传的文件
        <input type="file" multiple @change="handleInputChange">
      </div>
      <ul class="input-list">
        <li v-for="(item,index) in this.fileNames" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      files: [],
      fileNames: []
    };
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    handleInputChange (e) {
      this.files = [];
      this.fileNames = [];
      let files = e.target.files;
      for (let item of files) {
        this.fileNames.push(item['name']);
        this.files.push(item);
      }
    },
    uploadFiles () {
      console.log('upload')
    }
  }
};
</script>

<style scoped>
.title-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 99;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: .8rem;
  padding: 0 .4rem;
  border-bottom: 1px solid #f7f7f7;
  padding: 8px 0;
}
.title-bar .goback {
  width: 3rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border: 1px solid #ccc;
  background: rgb(92, 206, 92);
  border-radius: 5px;
  color: #fff;
}
.title-bar .submit {
  width: 3rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border: 1px solid #ccc;
  background: rgb(92, 206, 92);
  border-radius: 5px;
  color: #fff;
}
.content {
  margin-top: 2.4rem;
}
.input-wrapper {
  width: 60%;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background: rgb(162, 192, 238);
  position: relative;
  border-radius: 5px;
  color: rgb(64, 103, 211);
}
.input-wrapper input {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 2rem;
  opacity: 0;
}
.input-list {
  padding: 0;
}
.input-list li {
  list-style: none;
  background: rgb(162, 192, 238);
  border: 1px solid rgb(64, 103, 211);
  color: #fff;
  border-radius: 5px;
  padding: 5px 0;
  margin-bottom: 2px;
}
</style>
