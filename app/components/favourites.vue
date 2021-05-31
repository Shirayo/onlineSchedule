<template>
  <Page @loaded="loaded" backgroundColor="#f1f0f6">
    <ActionBar class="action-bar" title="Favourites"/>
    <ListView ref="listView" for="favourite in favourites">
      <v-template>
        <ContentView backgroundColor="white" margin="0" @tap="heh(favourite.group, favourite.course)">
          <Label :text="'группа ' + favourite.group + ' курс ' + favourite.course" fontSize="25" />
        </ContentView>
      </v-template>
    </ListView>
  </Page>
</template>

<script>

import schedule from './shedule'


export default {
name: "favourites",
  data() {
    return{
      favourites: [{
        group: 1,
        course: 1
      }]
    }
  },

  methods: {
    loaded() {
      this.favourites = this.$store.state.favourites
      console.log(this.favourites)
      this.$refs.listView.nativeView.refresh()
    },

    heh(group, course) {
      console.log(group, course)
      this.$navigateTo(schedule, {
        frame: "heh1",
        props: {
          selectedGroup: group,
          selectedCourse: course
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
