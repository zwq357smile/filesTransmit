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
        <li v-for="(item, index) in this.fileNames" :key="index" class="list-item" :style="{ backgroundColor: item.bgc }">
          <span>{{item.name}}</span>
          <span v-show="!item.finish" class="progress-bar" :style="{ width: uploadProgress }"></span>
          <span v-show="!item.finish" class="progress-percent">{{ uploadProgress }}</span>
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
      fileNames: [],
      host: '',
      uploadProgress: '',
      item: {}
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
      this.item = {};
      let files = e.target.files[0];
      this.$set(this.item, 'name', files['name']);
      this.$set(this.item, 'finish', false);
      this.$set(this.item, 'bgc', '#fff');
      this.fileNames.push(this.item);
      this.uploadFiles(files);
      /* for (let item of files) {
        this.fileNames.push(item['name']);
        this.files.push(item);
      } */
    },
    uploadFiles(data) {
      let fileData = new FormData();
      fileData.append('uploadFile', data);
      fileData.append('name', this.$route.query.path);
      FileUpload(fileData, this.progress, this.host + config.requestPort);
    },
    progress(percent) {
      console.log(percent)
      if (percent === '100%') {
        this.$set(this.item, 'finish', true);
        this.$set(this.item, 'bgc', 'rgb(51, 168, 198)');
      }
      this.uploadProgress = percent;
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
  /* background: rgb(162, 192, 238); */
  border: 1px solid rgb(51, 168, 198);
  color: #000;
  border-radius: 5px;
  padding: 5px 0;
  margin-bottom: 2px;
  position: relative;
  font-size: .8rem;
}
.title-bar-back{
  width: 1.8rem;
  color: #575757;
  font-size: 1.5rem;
  text-align: left;
}
.list-item .progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  background-color: rgb(51, 168, 198);
  opacity: .4;
  height: 100%;
}
</style>
