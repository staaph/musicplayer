<template>
  <div class="bg-gray-900 flex flex-col w-full min-h-screen max-h-screen">
    <div
      class="px-6 pt-5 pb-3 font-bold flex flex-row justify-between items-center"
    >
      <span class="card-title text-white text-xl">Upload</span>
      <button @click="handleClick">Logout</button>
    </div>
    <hr class="my-3" />
    <div class="p-6 mx-auto">
      <!-- Upload Dropbox -->
      <div
        class="px-10 py-20 rounded-lg text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-900 hover:border-green-100 hover:border-solid"
      >
        <h5>Drop your files here</h5>
      </div>
      <input
        type="file"
        multiple
        class="pt-5 text-white file:rounded-md file:border-0 file:p-1"
      />

      <!-- Progess Bars -->
      <div class="mb-4 pt-6">
        <!-- File Name -->
        <div class="font-bold text-sm"></div>

        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="p-0.5 leading-none font-medium transition-all bg-blue-400 text-center text-xs text-white"
          >
            1%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
