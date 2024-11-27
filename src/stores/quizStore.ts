import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../lib/supabase';
import { Database } from '../../database.types'; // Import the database schema types

// Define the `Quiz` type from the `quiz` table
type Quiz = Database['public']['Tables']['quiz']['Row'];

export const useQuizStore = defineStore('quiz', () => {
  // State
  const quizzes = ref<Quiz[]>([]); // Store fetched quizzes
  const loading = ref(false);     // Loading state
  const error = ref<string | null>(null); // Error messages

  // Actions
  const fetchQuizzes = async (subject: string, chapter?: string) => {
    loading.value = true;
    error.value = null;

    try {
      // Correct the table name to 'quiz'
      let query = supabase
        .from('quiz') // Use 'quiz' as per the `Database` type definition
        .select('*')  // Adjust fields as necessary
        .eq('subject', subject); // Filter by subject

      if (chapter) {
        query = query.eq('chapter', chapter); // Optional filter by chapter
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;

      quizzes.value = data || []; // Safely assign data
    } catch (err: any) {
      error.value = err.message; // Capture error message
    } finally {
      loading.value = false;
    }
  };

  // Getters
  const quizzesBySubject = computed(() => {
    return (subject: string) => (quizzes.value as any[]).filter(quiz => quiz.subject === subject);
  });


  const quizzesByChapter = computed(() => (subject: string, chapter: string) =>
    (quizzes.value as { subject: string; chapter: string }[]).filter(
      (quiz) => quiz.subject === subject && quiz.chapter === chapter
    )
  );

  return {
    // State
    quizzes,
    loading,
    error,
    // Actions
    fetchQuizzes,
    // Getters
    quizzesBySubject,
    quizzesByChapter,
  };
});
