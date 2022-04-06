<!-- NON FINAL loaded example-->

<template>
  <div
    class="bg-gray-800 min-w-screen max-h-screen flex flex-col justify-center items-center"
  >
    <div
      class="flex flex-col bg-black lg:w-4/6 sm:w-5/6 w-full h-screen sm:my-12 sm:rounded-3xl"
    >
      <!-- Songs Viewer-->
      <div
        class="bg-gray-900 sm:w-82 m-5 h-800 sm:h-440 justify-center rounded-xl"
      ></div>
      <!-- Play Bar -->
      <div
        class="flex justify-between bg-gray-900 sm:w-82 h-16 rounded-2xl mt-2 mx-5 mb-6 px-5"
      >
        <!-- Play Button -->
        <button type="button" class="">
          <font-awesome-icon icon="play" class="text-white text-3xl" />
        </button>
        <!-- current position - number -->
        <div class="flex items-center pl-4 text-white text-sm">00:00</div>
        <!-- current position / change - bar + song title & artist -->
        <div class="flex flex-col px-4 items-center w-full">
          <span class="pt-2 text-gray-400 text-sm pb-2"
            >Song title by artist</span
          >
          <div class="w-3/4 bg-gray-200 h-1 rounded-xl">
            <div class="bg-blue-700 h-1 rounded-xl" style="width: 45%"></div>
          </div>
        </div>
        <!-- song length -->
        <div class="flex items-center text-white text-sm pl-4">3:21</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
