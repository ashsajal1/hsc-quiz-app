<template>
  <div>
    <h1>Quizzes</h1>

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

    <!-- Buttons to Trigger Quiz Fetching -->
    <button @click="loadMathQuizzes">Load Math Quizzes</button>
    <button @click="loadPhysicsQuizzes">Load Physics Quizzes</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quizStore'; // Update the path if necessary

// Access the quiz store
const quizStore = useQuizStore();
const { quizzes, loading, error, } = storeToRefs(quizStore);
const { fetchQuizzes } = quizStore;

// Method to load quizzes for specific subjects and optional chapters
const loadMathQuizzes = () => {
  fetchQuizzes('Geography'); // Fetch quizzes for "Math"
};

const loadPhysicsQuizzes = () => {
  fetchQuizzes('Science', 'Physics'); // Fetch quizzes for "Science" and "Physics" chapter
};
</script>
