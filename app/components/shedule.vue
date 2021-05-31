<template>
  <Page loaded="isSave">
    <ActionBar :title="selectedGroup+ '-' + selectedCourse">
      <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="heh" />
      <ActionItem ios.position="right"
                  android.position="actionBar"
                  @tap="saveSchedule"
      >
        <Button ref="actionItem" text="save" fontSize="20"/>
      </ActionItem>
    </ActionBar>
    <ListView ref="listView" for="label in schedule">
      <v-template>
        <StackLayout>
          <Label :text="label.day"  fontSize="25" textAlignment="left"/>
          <GridLayout class="ns-dark" v-for="subject in label" @tap="openLink" borderRadius="10" margin="10, 15, 0, 15" rows="30,30" columns="2*, auto, 8*, 2*">
            <Label :text="subject.begin" textAlignment="right" row="0" col="0" fontSize="16"/>
            <Label :text="subject.end" textAlignment="right" row="1" col="0" fontSize="12"/>
            <label :backgroundColor="subject.color" row="0" rowSpan="2" height="10" width="10" borderRadius="5" col="1" />
            <Label :text="subject.name" row="0" col="2" fontSize="18" style="font-weight: bold"/>
            <Label :text="subject.classroom + ' каб.'" row="1" col="2" fontSize="12"/>
            <Image :src="subject.professorImage" row="0" rowSpan="2" col="3" height="50" width="50" borderRadius="25" stretch="aspectFill"/>
          </GridLayout>
        </StackLayout>
      </v-template>
    </ListView>
  </Page>

</template>

<script>
import Vue from "nativescript-vue";
const firebase = require("@nativescript/firebase/app");
import { Utils } from "@nativescript/core";

firebase.initializeApp({
  persist: false
}).then((instanse) => {
  console.log("fireBase init")
})


export default {
  name: "shedule",
  props: ["selectedGroup", "selectedCourse"],
  data() {
    return {

      arr: [1,2,3,4,5,6,7,8,9,0],
      schedule: [],
      saved: false
    }
  },

  computed: {
    citiesCollection() {
      return firebase.firestore()
          .collection("schedule " + (this.selectedGroup) + "-" + (this.selectedCourse))
          .doc("week")
    }
  },


  methods: {
    openLink() {
      console.log(args.object.)
      // Utils.openUrl("")
    },

    heh() {
      this.$navigateBack()
    },

    saveSchedule() {
      this.saved = !this.saved
      if(this.saved) {
        this.$refs.actionItem.nativeView.text = "saved"
        this.$store.commit("SET_FAVOURITE", [{ group: this.selectedGroup, course: this.selectedCourse}])
      } else {
        this.$store.commit("DELETE_FAVOURITE", { group: this.selectedGroup, course: this.selectedCourse})
        this.$refs.actionItem.nativeView.text = "save"
      }
    },

    async getSchedule() {
      var week = []
      var monday = []
      var tuesday = []
      var wednesday = []
      var thursday = []
      var friday = []
      var saturday = []

      this.citiesCollection.collection("monday").onSnapshot( (doc) => {
        doc.forEach((document) => {
          monday.push(document.data())

        })
      })
      this.citiesCollection.collection("tuesday").onSnapshot((doc) => {
        doc.forEach((document) => {
          tuesday.push(document.data())
        })

      })
      this.citiesCollection.collection("wednesday").onSnapshot((doc) => {
        doc.forEach((document) => {
          wednesday.push(document.data())
        })

      })
      this.citiesCollection.collection("thursday").onSnapshot((doc) => {
        doc.forEach((document) => {
          thursday.push(document.data())
        })

      })
      this.citiesCollection.collection("friday").onSnapshot((doc) => {
        doc.forEach((document) => {
          friday.push(document.data())
        })

      })
      this.citiesCollection.collection("saturday").onSnapshot((doc) => {
        doc.forEach((document) => {
          saturday.push(document.data())
        })

      })

      week[0] = await monday
      week[0].day = await "Понедельник"
      week[1] = await tuesday
      week[1].day = "Вторник"
      week[2] = await wednesday
      week[2].day = "Среда"
      week[3] = await thursday
      week[3].day = "Четверг"
      week[4] = await friday
      week[4].day = "Пятница"
      week[5] = await saturday
      week[5].day = "Суббота"
      return week
    },

    isSave() {
      console.log("heh")
      this.$store.dispatch("check_schedule", {group: this.selectedGroup, course: this.selectedCourse}).then((isSaved) => {
        console.log(isSaved)
        if (isSaved) {
          this.saved = true
          this.$refs.actionItem.nativeView.text = "saved"
        } else {
          this.saved = false
          this.$refs.actionItem.nativeView.text = "save"
        }
      })
    }
  },

  mounted() {
    this.getSchedule().then((week) => {
        this.isSave()
        this.schedule = week
    })
  }
}


</script>



<style scoped>

  .ns-dark GridLayout {
    background-color: #1e1e1e;
  }

  GridLayout {
    background-color: #f1f0f6
  }
</style>
