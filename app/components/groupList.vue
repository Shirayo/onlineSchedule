<template>
  <Page backgroundColor="#f1f0f6">
    <ActionBar title="group select"/>

    <StackLayout verticalAlignment="center">
      <StackLayout orientation="horizontal" horizontalAlignment="center">
        <Label text="group" verticalAlignment="center" fontSize="25"/>
        <ListPicker :items="listPickerGroups" v-model="selectedGroupPickerIndex" width="50"/>
        <Label text="course" verticalAlignment="center" fontSize="25"/>
        <ListPicker :items="listPickerCourses" v-model="selectedCoursePickerIndex" width="50" />
      </StackLayout>

      <Button v-touch-scale height=" 50" text="get schedule" @tap="heh" />

    </StackLayout>
  </Page>


</template>

<script>
import Vue from "nativescript-vue";
import touchScale from "~/directives/touchScale";
import schedule from './shedule'
const firebase = require("@nativescript/firebase/app");
const appSettings = require('@nativescript/core/application-settings');
Vue.directive('touchScale', touchScale)

firebase.initializeApp({
  persist: false
}).then((instanse) => {
  console.log("fireBase init")
})


export default {
  name: "shedule",
  data() {
    return {
      citiesCollection: firebase.firestore()
          .collection("schedule 1-1")
          .doc("week"),
      arr: [1,2,3,4,5,6,7,8,9,0],
      schedule: [],
      selectedCoursePickerIndex: 0,
      selectedGroupPickerIndex: 0,
      listPickerCourses: ["1","2", "3", "4"],
      listPickerGroups: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    }
  },

  methods: {
    heh() {

      this.$navigateTo(schedule, {props: {
          selectedGroup: this.selectedGroupPickerIndex + 1,
          selectedCourse: this.selectedCoursePickerIndex + 1
        }})
    }

    //"schedule " + (this.selectedCoursePickerIndex + 1) + "-" + (this.selectedGroupPickerIndex + 1)
  },

  mounted() {


  }
}
</script>

<style scoped>

  .ns-dark Button {
    background-color: #2a9df4;
    border-radius: 20;
    margin-left: 50;
    margin-right: 50;
    font-size: 20;
    color: black;
  }

  Button {
    background-color: #1167b1;
    border-radius: 20;
    margin-left: 50;
    margin-right: 50;
    font-size: 20;
    color: white;
  }
</style>
