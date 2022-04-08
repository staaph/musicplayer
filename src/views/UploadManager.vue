<template>
  <FileUpload />
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue';
import { onBeforeMount, ref } from 'vue';
import { songsCollection } from '../firebase/config';
import { query, getDocs } from 'firebase/firestore';

const songs = ref([]);

//query firestore database to get songs
const songsList = query(songsCollection);

onBeforeMount(async () => {
  const snapshot = await getDocs(songsList);
  snapshot.forEach((document) => {
    const song = {
      ...document.data(),
      docID: document.id,
    };
    songs.value.push(song);
  });
});
</script>
