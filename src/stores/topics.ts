import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../lib/supabase'; // Assuming Supabase client is initialized

export const useTopicStore = defineStore('topic', () => {
  const topics = ref<any[]>([]); // Store the topics
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch all topics from the database
  const fetchTopics = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: supabaseError } = await supabase
        .from('topics')
        .select('*');

      if (supabaseError) throw supabaseError;

      topics.value = data || [];
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    topics,
    loading,
    error,
    fetchTopics,
  };
});
