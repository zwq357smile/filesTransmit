<template>
  <div>
    <header class="title-bar">
      <span class="iconfont title-bar-back" @click="goback">&#xe6ed;</span>
      <span>上传文件</span>
      <span class="submit" @click="$refs.upload.click()">
        <input class="submit-upload" ref="upload" type="file" @change="handleInputChange">
      </span>
    </header>
    <div class="content">
      <ul class="input-list">
        <li v-for="item in this.fileNames" :key="item.name">
          {{ item.name }}
          <div class="progress-bg" :style="{transform: item.progress}"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/api/mobile/upload';
import config from '@/js/config'
export default {
  name: 'Upload',
  data() {
    return {
      files: [],
      fileNames: [],
      host: ''
    };
  },
  created() {
    this.host = /http:\/\/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}:(?=\d{4}\/#)/.exec(location.href)[0];
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    handleInputChange(e) {
      this.files = [];
      let files = e.target.files[0];
      let item = {name: files['name'], progress: 0};
      this.fileNames.push(item);
      this.uploadFiles(files, item);
    },
    uploadFiles(data, item) {
      let fileData = new FormData();
      fileData.append('uploadFile', data);
      fileData.append('name', this.$route.query.path);
      FileUpload(fileData, progress.bind(item, this), this.host + config.requestPort);
      function progress(that, percent) {
        console.log(percent)
        that.$set(this, 'progress', `translate3d(${percent - 100}%, 0, 0)`);
        console.log(that.fileNames)
      }
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
  line-height: 2.4rem;
  font-size: .8rem;
  padding: 0 .4rem;
  border-bottom: 1px solid #f7f7f7;
}
.submit-upload{
  display: none;
}
.title-bar .submit {
  width: 1.7rem;
  height: 1.7rem;
  position: relative;
}
.title-bar .submit:before{
  content: '';
  width: .7rem;
  height: 2px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 4px;
  background-color: #575757;
}
.title-bar .submit:after{
  content: '';
  width: 2px;
  height: .7rem;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 4px;
  background-color: #575757;
}
.content {
  margin-top: 2.4rem;
}
.input-list {
  padding: 0;
}
.input-list li {
  list-style: none;
  border-bottom: 1px solid #eee;
  color: #6f6f6f;
  height: 2rem;
  line-height: 2rem;
  font-size: .8rem;
  text-align: left;
  text-indent: .9rem;
}
  .title-bar-back{
    width: 1.8rem;
    color: #575757;
    font-size: 1.5rem;
    text-align: left;
  }
  .progress-bg{
    transform: translate3d(-100%, 0, 0);
    background-color: #13ec61;
    height: 2px;
  }
</style>
