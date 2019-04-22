<template>
  <div class="index-wrap">
    <h3>当前共享目录:</h3>
    <label class="dir">
      {{thisDir ? thisDir.path : '请选择目录！'}}
      <input type="file"
             class="dir-selector"
             @change="changeDir"
             webkitdirectory>
    </label>
    <div id="qrCode" class="qr-code-wrap" ref="qrCode"></div>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  import config from '@/js/config'
  import host from '@/api/pc/getIP'
  import token from '@/api/pc/setToken'
  export default {
    name: 'index',
    data() {
      return {
        thisDir: {},
        url: '',
        qrCode: ''
      }
    },
    created() {
      this.thisDir = JSON.parse(localStorage.getItem('thisDir'));
    },
    mounted() {
      this.thisDir && this.creatQrCode();
    },
    methods: {
      changeDir(e) {
        if (!e.currentTarget.files[0]) return;
        let selected = e.currentTarget.files[0];
        this.thisDir = {path: selected.path, name: selected.name};
        localStorage.setItem('thisDir', JSON.stringify(this.thisDir));
        this.creatQrCode();
      },
      creatQrCode() {
        let port;
        let timestamp = new Date().getTime();
        token(timestamp);
        if (process.env.NODE_ENV === 'development') port = config.port;
        else port = config.requestPort;
        this.$refs.qrCode.innerHTML = '';
        host().then(res => {
          this.url = res;
          console.log(`http://${this.url}:${port}/#/mobile?path=${this.thisDir.path}&filename=${this.thisDir.name}&token=${timestamp}`);
          this.qrCode = new QRCode('qrCode', {
            width: 132,
            height: 132,
            text: `http://${this.url}:${port}/#/mobile?path=${this.thisDir.path}&filename=${this.thisDir.name}&token=${timestamp}`, // 二维码地址
            colorDark: '#000',
            colorLight: '#fff'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .dir{
    font-size: 14px;
    color: #327dff;
    text-decoration: underline;
    cursor: pointer;
  }
  .dir-selector{
    display: none;
  }
  .qr-code-wrap{
    width: 144px;
    height: 144px;
    border: 1px solid #000;
    padding: 5px;
    box-sizing: border-box;
    margin: 1rem auto;
  }
</style>
