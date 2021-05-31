<template>
  <Page>
    <Button @tap="openDrive" text="open Drive Link" backgroundColor="blue" />
  </Page>
</template>

<script>

import GoogleDriveWebView from "./GoogleDriveWebView";
// var openApp = require("nativescript-open-app").openApp;
// import * as utils from 'utils/utils';
import { Utils } from "@nativescript/core";
// var installed = openApp("com.facebook.katana", false);
// if (!installed) {
//   utils.openUrl("https://facebook.com");
// }
export default {
  name: "test",
  methods: {
    openDrive() {
      Utils.openUrl("https://drive.google.com/drive/folders/0B6NiSXfI55hTckEwcENyM2RuTTA?usp=sharing");
      // this.$navigateTo(GoogleDriveWebView, {
      //   frame: "google"
      // })
    },
  }
}
</script>

<style scoped>

</style>
