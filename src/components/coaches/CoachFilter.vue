<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  // make clear that this component emits a change filters event
  emits: ['change-filter'],
  // manage which filter the user chose
  data() {
    return {
      filters: {
        // Coaches that have this areas of expertise should be shown
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  methods: {
    //methos bound to the inputs
    //default DOM event
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      //copying this existing filters
      const updatedFilters = {
        ...this.filters,
        //over-riding a property of filters by accessing one of this keys and set new value for this dynamic property
        [inputId]: isActive
      };
      this.filters = updatedFilters;
      // we want to let the component that uses the Coachfilter component know about our filters = emit custom event to communicate back
      this.$emit('change-filter', updatedFilters);
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
