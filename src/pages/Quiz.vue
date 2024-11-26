<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Quiz Page</h1>
      
      <!-- Display loading state -->
      <div v-if="loading" class="text-center text-lg">Loading quizzes...</div>
      
      <!-- Display No quizzes -->
      <div v-else-if="quizzes.length === 0" class="text-center text-lg">No quizzes available.</div>
      
      <!-- Display quizzes -->
      <div v-else>
        <div v-for="quiz in quizzes" :key="quiz.id" class="mb-6">
          <!-- Quiz Card -->
          <div class="shadow-lg p-4 bg-white rounded-md">
            <!-- Question Header -->
            <h2 class="text-xl font-semibold mb-4">{{ quiz.question }}</h2>
            
            <!-- Quiz Options -->
            <div class="space-y-4">
              <div v-for="(option, index) in quiz.options" :key="index" class="flex items-center">
                <input
                  type="radio"
                  :name="'quiz-' + quiz.id"
                  :value="option.option"
                  v-model="answers[quiz.id]"
                  class="mr-2"
                />
                <span>{{ option.option }}</span>
              </div>
            </div>
            
            <!-- Submit Button -->
            <button
              class="mt-4 w-full bg-blue-500 text-white py-2 rounded-md disabled:bg-gray-400"
              @click="submitAnswer(quiz)"
              :disabled="!answers[quiz.id]"
            >
              Submit Answer
            </button>
            
            <!-- Show result -->
            <div v-if="submitted[quiz.id] !== undefined" :class="{'text-green-600': submitted[quiz.id], 'text-red-600': !submitted[quiz.id]}">
              {{ submitted[quiz.id] ? 'Correct!' : 'Incorrect. The correct answer is ' + quiz.correct_answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { supabase } from '../lib/supabase'; // Adjust if you're using Supabase
  
  interface Quiz {
    id: string;
    question: string;
    options: string[];
    correct_answer: string;
  }
  
  const quizzes = ref<Quiz[]>([]);
  const answers = ref<Record<string, string>>({});
  const submitted = ref<Record<string, boolean>>({});
  const loading = ref(true);
  
  // Fetch quizzes when the component is mounted
  onMounted(async () => {
    const { data, error } = await supabase.from('quiz').select('*').eq('status', 'published');
    
    if (error) {
      console.error('Error fetching quizzes:', error);
    } else {
      console.log('Fetched quizzes:', data);  // Debugging line
      quizzes.value = data;  // Assign the fetched data to quizzes
    }
    
    loading.value = false;
  });
  
  // Submit the user's answer
  function submitAnswer(quiz: Quiz) {
    const userAnswer = answers.value[quiz.id];
    const isCorrect = userAnswer === quiz.correct_answer;
    submitted.value[quiz.id] = isCorrect;
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  