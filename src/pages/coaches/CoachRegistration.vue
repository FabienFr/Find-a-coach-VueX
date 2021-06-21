<template>
  <div>
    <section>
      <base-card>
        <h2>Register as a coach</h2>
        <!-- accept incoming data -->
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(data) {
      // we want to add data from CoachForm to communicate with vuex store > add new coach to vuex store = mutations & actions
      this.$store.dispatch('coaches/registerCoach', data); // namespace / action name
      this.$router.replace('/coaches'); // difference with push is you can't go back to the page we came from
    }
  }
};
</script>
