<template>
  <!-- START SONG COMPONENT -->
  <div
    class="flex flex-row bg-gray-700 mx-3 my-2.5 p-2 rounded-lg active:scale-95 cursor-pointer transition ease-in-out delay-50"
  >
    <!-- Song Picture -->
    <div class="w-1/3">
      <div
        class="flex flex-row bg-white m-3 p-6 w-16 justify-center rounded-xl"
      >
        <font-awesome-icon icon="music" />
      </div>
    </div>
    <!-- Artist & Songname -->
    <div class="w-full flex flex-col items-center justify-center">
      <p class="text-gray-300 text-xs text-center w-full">
        {{ song.artist }}
      </p>
      <p class="text-white w-full text-center">
        {{ song.modified_name }}
      </p>
    </div>
    <div class="w-1/3 flex items-center justify-end">
      <p class="m-3 text-white text-sm">00:00</p>
    </div>
  </div>
  <!-- END SONG COMPONENT -->
</template>

<script setup>
defineProps(['song']);
</script>

<style></style>
