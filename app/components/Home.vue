<template>
  <Page actionBarHidden="true" id="main">
<!--    <ActionBar>-->
<!--        <Label text="Home"/>-->
<!--    </ActionBar>-->

        <MDBottomNavigation selectedIndex="0">
          <MDTabStrip class="ns-dark">
            <MDTabStripItem>
              <label text="Favourites"/>
              <Image src="~/assets/images/star.png"/>
            </MDTabStripItem>

            <MDTabStripItem>
              <label text="Groups"/>
              <Image src="~/assets/images/group.png" />
            </MDTabStripItem>

            <MDTabStripItem>
              <label text="professors"/>
              <Image src="~/assets/images/presentation.png"/>
            </MDTabStripItem>

            <MDTabStripItem>
              <label text="Info"/>
              <Image src="~/assets/images/information.png"/>
            </MDTabStripItem>

          </MDTabStrip>

          <MDTabContentItem>
            <Frame id="heh1">
              <favourites />
            </Frame>
          </MDTabContentItem>

          <MDTabContentItem>
            <Frame>
              <groupList/>
            </Frame>
          </MDTabContentItem>

          <MDTabContentItem>
           <Frame id="google">
             <test />
           </Frame>
          </MDTabContentItem>

          <MDTabContentItem>
            <Label text="heh" />
          </MDTabContentItem>
        </MDBottomNavigation>
  </Page>
</template>

<script>
import schedule from "./shedule"
import groupList from "./groupList";
import favourites from "./favourites";
import Vue from "nativescript-vue";
import test from "./test";
import BottomNavigation from '@nativescript-community/ui-material-bottom-navigation/vue';
import GoogleDriveWebView from './GoogleDriveWebView'

const firebase = require("@nativescript/firebase/app");
firebase.initializeApp({
  persist: false
}).then((instanse) => {
  console.log("fireBase init")
})


Vue.use(BottomNavigation);

  export default {
    components: {schedule, groupList, favourites, test},
    data() {
      return {
        citiesCollection: firebase.firestore().collection("test"),
      }
    },

    methods: {

      tap() {
        this.citiesCollection.get().then((querySnapshot) => {
          querySnapshot.forEach((document) => {
            console.log(document.data())
          })
        })
      }
    }

  };
</script>

<style scoped>

  .ns-dark MDTabStrip {
    selected-item-color: white;
    un-selected-item-color: #2a9df4;
  }

  MDTabStrip {
    selected-item-color: black;
    un-selected-item-color: #1167b1;
  }

  .info {
      font-size: 20;
      horizontal-align: center;
      vertical-align: center;
  }
</style>
