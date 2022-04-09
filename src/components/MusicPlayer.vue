<template>
  <!-- START SONG COMPONENT -->
  <div
    class="flex flex-row bg-gray-700 mx-4 mt-4 p-2 rounded-lg active:scale-95 cursor-pointer transition ease-in-out delay-50"
  >
    <!-- Song Picture -->
    <div class="w-1/6">
      <div
        class="flex flex-row bg-white m-3 p-6 w-16 justify-center rounded-xl"
      >
        <font-awesome-icon icon="music" />
      </div>
    </div>
    <!-- Artist & Songname -->
    <div class="w-full flex flex-col items-center justify-center">
      <p
        class="text-gray-300 text-xs items-center justify-center flex flex-col w-full"
      >
        {{ song.artist }}
      </p>
      <p class="text-white">{{ song.modified_name }}</p>
    </div>
    <div class="w-1/6 flex items-center">
      <p class="m-3 text-white text-sm">00:00</p>
    </div>
  </div>
  <!-- END SONG COMPONENT -->
</template>

<script setup>
const props = defineProps(['song']);
</script>

<style></style>
