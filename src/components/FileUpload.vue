<template>
  <div class="bg-gray-900 flex flex-col min-h-screen">
    <!-- Navbar -->
    <div
      class="px-6 pt-5 pb-3 font-bold flex flex-row justify-between items-center"
    >
      <span class="card-title text-white text-xl">Upload</span>
      <button
        class="transition ease-in-out delay-50 text-white text-sm rounded-3xl bg-gray-800 px-4 py-3"
        @click="handleClick"
      >
        Logout
      </button>
    </div>
    <hr class="my-3" />
    <div class="flex flex-col md:flex-row justify-center p-12 gap-20">
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
          class="pt-5 text-white file:rounded-md file:border-0 file:p-1"
        />

        <!-- Progess Bar -->
        <div class="mb-4 pt-4" v-for="upload in uploads" :key="upload.name">
          <!-- File Name -->
          <div class="font-bold text-sm text-white">{{ upload.name }}</div>

          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="p-0.5 leading-none font-medium transition-all bg-blue-500 text-center text-xs text-white"
              :class="'bg-blue-500'"
              :style="{ width: upload.current_progress + '%' }"
            >
              {{ Math.round(upload.current_progress) + '%' }}
            </div>
          </div>
        </div>
      </div>
      <!-- Edit data -->
      <div
        class="flex flex-col border border-gray-200 p-4 rounded-lg md:w-1/2 min-w-fit"
      >
        <h4 class="text-2xl flex justify-center font-bold text-white">
          Modify
        </h4>
        <div class="flex flex-row w-full gap-2 mt-2">
          <p class="text-white">Song Name</p>

          <button
            class="text-sm text-end rounded px-2 py-1 text-white bg-blue-600"
          >
            <font-awesome-icon icon="pencil" />
          </button>
          <button
            class="flex px-2.5 py-2 text-sm rounded text-white bg-red-600"
          >
            <font-awesome-icon icon="times" />
          </button>
        </div>
        <div>
          <form>
            <div class="mb-2">
              <label class="mb-2 text-white">Song Title</label>
              <input
                type="text"
                class="w-full py-1.5 px-3 bg-gray-200 text-gray-800 border border-gray-300 outline-none rounded-md"
                placeholder="Enter Song Title"
              />
            </div>
            <div class="">
              <label class="mb-2 text-white">Artist</label>
              <input
                type="text"
                class="w-full py-1.5 px-3 bg-gray-200 text-gray-800 border border-gray-300 outline-none rounded-md"
                placeholder="Enter Artist"
              />
            </div>
            <div class="flex gap-6 justify-center mt-5">
              <button
                type="button"
                class="py-1.5 px-3 rounded text-white bg-gray-600"
              >
                Go Back
              </button>
              <button class="py-1.5 px-3 rounded text-white bg-green-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- END -->
    </div>
  </div>
</template>

<script setup>
import useAuth from '../composables/useAuth.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { storage } from '../firebase/config';
import { ref as fbref, uploadBytesResumable } from 'firebase/storage';

//definitions
const { logout } = useAuth();
const router = useRouter();
const is_dragover = ref(false);
const uploads = ref([]);

//upload method
const upload = ($event) => {
  is_dragover.value = false;
  const files = [...$event.dataTransfer.files];

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
      }) - 1;

    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploads.value[uploadIndex].current_progress = progress;
    });
  });
};

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
