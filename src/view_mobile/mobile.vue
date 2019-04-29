<template>
    <div class="mobile-wrap">
      <header class="title-bar">
        <div class="iconfont title-bar-back"
             @click="back"
             v-if="history.length > 1 && !multiple">
          &#xe6ed;
        </div>
        <div id="download-btn" class="iconfont mul-select"
             @click="mulDownload"
             v-if="multiple">
          下载
        </div>
        <div class="title-bar-back" v-else></div>
        <div class="title-content">{{dirname}}</div>
        <div class="mul-select"
             @click="multiple = true"
             v-if="!multiple">多选
        </div>
        <div class="mul-select"
             @click="multiple = false; selectData = {}"
             v-else>取消
        </div>
      </header>
      <ul class="content-wrap">
        <li v-for='(item, index) in dirList'
            :key="item.filename"
            class="content-list"
            @click="openIt(item, index)">
          <img class="file-type" v-if="item.type === 'image'" :src="`${host}${port}/file/download?url=${item.path}`">
          <div :class="`${item.type}-icon iconfont file-type`" v-else></div>
          <div class="dir-content">
            <div class="dir-info">
              <div class="dir-info-name">{{item.filename}}</div>
              <div class="dir-info-date">{{item.date.split('T')[0]}}</div>
            </div>
            <div class="iconfont dir-detail" v-if="item.type === 'dir'">&#xe6ec;</div>
            <!--<div class="iconfont mul-select-icon" v-show="multiple && item.type !== 'dir'"></div>-->
            <radio class="mul-select-icon"
                   :width="'.7rem'"
                   :height="'.7rem'"
                   v-model="selectData[index]"
                   v-show="multiple && item.type !== 'dir'">
            </radio>
          </div>
        </li>
      </ul>
      <router-link :to="{path: '/upload', query: {path: path}}" class="upload-file">上传文件至该目录</router-link>
    </div>
</template>

<script>
// 封装url参数
  import GetParams from '@/js/getParams';
  import LoadDir from '@/api/mobile/loadDir';
  import config from '@/js/config'
  import radio from '@/components/radio.vue'
  export default {
    name: 'mobile',
    data() {
      return {
        host: '',
        dirname: '',
        dirList: [],
        history: [],
        port: config.requestPort,
        multiple: false,
        selectData: {},
        path: ''
      }
    },
    components: {
      radio: radio
    },
    created() {
      let info = GetParams(location.href);
      this.path = info.path;
      this.host = /http:\/\/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}:(?=\d{4}\/#)/.exec(location.href)[0];
      this.history.unshift(info);
      this.loadDir(info.path, info.filename);
    },
    methods: {
      openIt({path, type, filename}, index) {
        if (this.multiple) {
          this.$set(this.selectData, index, !this.selectData[index]);
          return;
        }
        if (type === 'dir') {
          this.$store.dispatch('pushState', location.href);
          this.history.unshift({path, filename});
          this.loadDir(path, filename);
        } else {
          this.download(path, filename)
        }
      },
      back() {
        this.history.shift();
        this.$store.dispatch('popState');
        this.loadDir(this.history[0].path, this.history[0].filename);
      },
      loadDir(path, name) {
        this.dirname = name;
        LoadDir(path, this.host + config.requestPort).then((res) => {
          this.dirList = res;
        })
      },
      mulDownload() {
        for (let index in this.selectData) {
          if (this.selectData[index]) {
            this.download(this.dirList[index].path, this.dirList[index].filename);
            this.selectData[index] = false;
          }
        }
        this.multiple = false;
      },
      download(path, filename) {
        let url = `${this.host}${config.requestPort}/file/load?url=${path}&name=${filename}`;
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.style.height = 0;
        iframe.src = url;
        document.body.appendChild(iframe);
        setTimeout(() => {
          iframe.remove();
        }, 300000);
      }
    }
  }
</script>

<style scoped>
  .prevent{
    margin-top: 20vh;
  }
  .title-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 99;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 2.4rem;
    font-size: .8rem;
    padding: 0 .4rem;
    border-bottom: 1px solid #f7f7f7;
  }
  .title-content{
    width: 11rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
  }
  .title-bar-back{
    width: 1.8rem;
    color: #575757;
    font-size: 1.5rem;
    text-align: left;
  }
  .mul-select{
    width: 1.8rem;
    font-size: .8rem;
  }
  .mul-select-icon{
    width: .7rem;
    height: .7rem;
    border: 1px solid #b8b8b8;
    border-radius: 50%;
    margin-left: .4rem;
  }
  .content-wrap{
    margin: 0;
    padding: 0;
  }
  .content-list{
    display: flex;
    justify-content: start;
    height: 3rem;
    padding-left: .75rem;
    align-items: center;
  }
  .content-list:active{
    background-color: rgba(0, 0, 0, .06);
  }
  .dir-content{
    border-bottom: 1px solid #f9f9f9;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .file-type{
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 6px;
    color: #fff;
    font-size: 1.5rem;
    line-height: 1.8rem;
  }
  .dir-icon{
    background-color: #ff7b38;
  }
  .dir-icon::before{
    content: '\e79c';
  }
  .audio-icon{
    background-color: #ff3648;
  }
  .audio-icon::before{
    content: '\e7df';
  }
  .unknow-icon{
    background-color: #9d9d9d;
  }
  .unknow-icon::before{
    content: '\e79b';
  }
  .zip-icon{
    background-color: #a175ff;
  }
  .zip-icon::before{
    content: '\e63d';
  }
  .word-icon{
    background-color: #2daeff;
  }
  .word-icon::before{
    content: '\e63c';
  }
  .txt-icon{
    background-color: #ff7b38;
  }
  .txt-icon::before{
    content: '\e63b';
  }
  .ppt-icon{
    background-color: #ff832e;
  }
  .ppt-icon::before{
    content: '\e63a';
  }
  .pdf-icon{
    background-color: #b82c23;
  }
  .pdf-icon::before{
    content: '\e639';
  }
  .excel-icon{
    background-color: #21c764;
  }
  .excel-icon::before{
    content: '\e637';
  }
  .video-icon{
    background-color: #288d9e;
  }
  .video-icon::before{
    content: '\e78e';
  }
  .dir-info{
    text-align: left;
    width: 13rem;
    margin: 0 .9rem 0 .5rem;
    padding: .6rem 0;
    line-height: 1.3rem;
  }
  .dir-info-name{
    font-size: .8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .dir-info-date{
    font-size: .6rem;
    color: #5d5d5d;
    line-height: .5rem;
    text-indent: .05rem;
  }
  .dir-detail{
    font-size: 1.6rem;
    line-height: 3rem;
    float: left;
  }
  .upload-file {
    position: fixed;
    font-size: .8rem;
    bottom: 10px;
    right: 10px;
    width: 7rem;
    height: 2rem;
    line-height: 2rem;
    color: #fff;
    background: rgb(92, 206, 92);
    border-radius: 5px;
    text-decoration: none;
  }
</style>
