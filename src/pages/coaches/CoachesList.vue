<template>
  <div>
    <!-- !!truthy value in real boolean -->
    <base-dialog :show="!!error" title="error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <!-- listen to change filter event -->
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Register as a coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No matches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    BaseButton,
    CoachFilter
  },
  data() {
    return {
      isLoading: false, // should be set to true in the loadCoaches method when executed
      error: null,
      // this should be over-written whenever new filters are emited (setFilters)
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      // // 'namespaceName/getterName'
      // return this.$store.getters['coaches/coaches'];

      // return coaches that match our filters
      const coaches = this.$store.getters['coaches/coaches'];
      // buildin filter method (on arrays) > execute a fct° on every item in coaches
      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    }
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    // we catch the data we are emiting from the CoachFilter component
    // we passed the updatedFilters as an argument when we emited the event
    // in the place where we listen to the event, we receive this as a parameter
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    //since dispatch returns a promise
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh
        }); // dispatch can also return something to the cpomponent when we load it
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false; // once the request is done
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
