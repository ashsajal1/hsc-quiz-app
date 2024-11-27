<template>
  <div>
    <h1>Quizzes</h1>

    <div>
      <!-- AutoComplete displays topic names but binds topic.id to the v-model -->
      <AutoComplete
        v-model="selectedTopicId"
        dropdown
        :suggestions="topics.map((topic) => topic.name)"
        @complete="search"
        field="name"
      />
    </div>
    <!-- Loading State -->
    <div v-if="loading">Loading quizzes...</div>

    <!-- Error State -->
    <div v-else-if="error">{{ error }}</div>
    <!-- No Questions State -->
    <div v-else-if="quizzes.length === 0">No Question Found!</div>

    <!-- Display Quizzes -->
    <div v-else>
      <ul>
        <li v-for="quiz in quizzes" :key="quiz.id">
          <h3>{{ quiz.question }}</h3>
          <p>Subject: {{ quiz.subject }}</p>
          <p>Chapter: {{ quiz.chapter }}</p>
          <p>Type: {{ quiz.type }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuizStore } from '../stores/quizStore';
import AutoComplete from 'primevue/autocomplete';
import { useTopicStore } from '../stores/topics';
import { onMounted, ref } from 'vue';

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
