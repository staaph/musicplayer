<template>
  <div class="flex flex-col">
    <!-- Upload Dropbox -->
    <div
      class="px-10 py-20 rounded-lg text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-blue-900 hover:border-white hover:border-solid"
      :class="{
        'bg-blue-900 border-white border-solid': is_dragover,
      }"
      @drag.prevent.stop=""
      @dragstart.prevent.stop=""
      @dragend.prevent.stop="is_dragover = false"
      @dragover.prevent.stop="is_dragover = true"
      @dragenter.prevent.stop="is_dragover = true"
      @dragleave.prevent.stop="is_dragover = false"
      @drop.prevent.stop="upload($event)"
    >
      <h5>Drop your files here</h5>
    </div>
    <input
      type="file"
      multiple
      @change="upload($event)"
      class="pt-5 text-white file:rounded-md file:border-0 file:p-1"
    />

    <!-- Progess Bar -->
    <div class="mb-4 pt-4" v-for="upload in uploads" :key="upload.name">
      <!-- File Name -->
      <div class="font-bold text-sm text-white" :class="upload.text_class">
        {{ upload.name }}
      </div>

      <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
        <!-- Inner Progress Bar -->
        <div
          class="p-0.5 leading-none font-medium transition-all bg-blue-500 text-center text-xs text-white"
          :class="upload.variant"
          :style="{ width: upload.current_progress + '%' }"
        >
          {{ Math.round(upload.current_progress) + '%' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '../composables/useAuth.js';
import { useRouter } from 'vue-router';
import { ref, onBeforeUnmount } from 'vue';
import { storage, songsCollection, addDoc } from '../firebase/config';
import {
  ref as fbref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

//definitions
const { logout } = useAuth();
const router = useRouter();
const is_dragover = ref(false);
const uploads = ref([]);

//upload method
const upload = ($event) => {
  is_dragover.value = false;
  const files = $event.dataTransfer
    ? [...$event.dataTransfer.files]
    : [...$event.target.files];

  files.forEach((file) => {
    if (file.type !== 'audio/mpeg') {
      return;
    }
    const storageRef = fbref(storage);
    const songsRef = fbref(storageRef, `songs/${file.name}`);
    const task = uploadBytesResumable(songsRef, file);

    const uploadIndex =
      uploads.value.push({
        task,
        current_progress: 0,
        name: file.name,
        variants: 'bg-blue-500',
        text_class: '',
      }) - 1;

    task.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploads.value[uploadIndex].current_progress = progress;
      },
      (error) => {
        uploads.value[uploadIndex].variant = 'bg-red-400';
        uploads.value[uploadIndex].text_class = 'text-red-400';
      },
      async () => {
        const song = {
          original_name: task.snapshot.ref.name,
          modified_name: task.snapshot.ref.name,
          artist: '',
        };
        song.url = await getDownloadURL(task.snapshot.ref);
        await addDoc(songsCollection, song);

        uploads.value[uploadIndex].variant = 'bg-green-400';
        uploads.value[uploadIndex].text_class = 'text-green-400';
      }
    );
  });
};

// cancel upload on page leave

onBeforeUnmount(() => {
  uploads.value.forEach((upload) => {
    upload.task.cancel();
  });
});

//logout user and redirect to /
const handleClick = async () => {
  await logout();
  router.push('/');
};
</script>

<style>
button {
  @apply bg-slate-500
        rounded-3xl
        text-xs
        font-bold
        px-6
        py-3
        border-0
        active:scale-90;
}
</style>
