<template>
  <div class="p-2">
    <h1>Quizzes</h1>

    <div class="flex items-center gap-2">
      <!-- AutoComplete displays topic names but binds topic.id to the v-model -->
      <AutoComplete v-model="selectedTopicId" dropdown :suggestions="topics.map((topic) => topic.name)"
        @complete="search" field="name" />
      <Button @click="getQuizzes()">Submit</Button>
    </div>
    <!-- Loading State -->
    <div v-if="loading">Loading quizzes...</div>

    <!-- Error State -->
    <div v-else-if="error">{{ error }}</div>
    <!-- No Questions State -->
    <div v-else-if="quizzes.length === 0">No Question Found!</div>

    <!-- Display Quizzes -->
    <div v-else>
      <div v-for="{ id, question, options } in quizzes" :key="id">

        <p class="font-bold text-lg my-2">{{ question }}</p>
        <div class="flex flex-col gap-2">
          <Button @click="selectOption(option)" variant="outlined"
            :severity="isOptionSelected(option) ? 'help' : 'secondary'" v-for="{ option } in options" :key="option">
            {{ option }}
          </Button>

          <Button @click="submit" rounded>Submit</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuizStore } from '../stores/quizStore';
import AutoComplete from 'primevue/autocomplete';
import { useTopicStore } from '../stores/topics';
import { onMounted, ref } from 'vue';
import { Button } from 'primevue';

const userSelectedOption = ref<string | null>(null);

const selectOption = (option: string) => {

  if (userSelectedOption.value === option) {
    userSelectedOption.value = null
  } else {
    userSelectedOption.value = option;
  }
};

const isOptionSelected = (option: string) => {
  return userSelectedOption.value === option;

};

// Handle submission
const submit = () => {
  console.log('Selected Option:', userSelectedOption.value);
};


const getQuizzes = () => {
  if (!selectedTopicId) return
  // Call the fetchQuizzes function from the quiz store
  fetchQuizzes(selectedTopicId.value!);
}
// This will store the topic ID selected in the AutoComplete
const selectedTopicId = ref<string | null>(null);

const topicStore = useTopicStore();

// Get all topics
const { topics } = storeToRefs(topicStore);
const { fetchTopics } = topicStore;

onMounted(() => {
  // Fetch topics when the component is mounted
  fetchTopics();
});

// Access the quiz store
const quizStore = useQuizStore();
const { quizzes, loading, error } = storeToRefs(quizStore);
const { fetchQuizzes } = quizStore;

// Search function to filter topics based on user input
const search = (event: { query: string }) => {
  // Ensure topics are up-to-date before filtering
  if (topics.value.length === 0) {
    topicStore.fetchTopics();
  }

  // Filter topics based on the query entered by the user
  const filteredTopics = topics.value.filter((topic) =>
    topic.name.toLowerCase().includes(event.query.toLowerCase())
  );

  // Update the AutoComplete suggestions with filtered topics
  topicStore.topics = filteredTopics;
};
</script>
