<template>
  <div>
    <form class="max-w-md mx-auto mb-2">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search todos"
          required
          v-model="pageData.searchText"
        />
      </div>
    </form>

    <div style="display: flex; flex-wrap: wrap">
      <!-- <div
        v-for="(post, index) in postsStore.filteredPosts"
        style="
          margin-bottom: 1rem;
          margin-right: 1rem;
          border: 1px solid black;
          padding: 1rem;
        "
        :class="{
          selected_post: postsStore.selectedPosts.has(post?.id),
        }"
        @click="selectCurrentPost(post?.id)"
      >
        {{ post?.title }}
      </div> -->

      <a
        v-for="(post, index) in postsStore.filteredPosts"
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-2 my-2"
        :class="{
          selected_post: postsStore.selectedPosts.has(post?.id),
        }"
        @click.prevent="selectCurrentPost(post?.id)"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ post?.title }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {{ post?.body }}
        </p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { initFlowbite } from "flowbite";

definePageMeta({
  layout: "landing",
});
onMounted(() => {
  initFlowbite();
});
const postsStore = usePostsStore();
const pageData = reactive({
  searchText: "",
});

watch(
  () => pageData.searchText,
  () => {
    postsStore.filteredPosts = postsStore.allPosts?.filter((post: any) => {
      // return post?.title?.toLower().contains(pageData.searchText);
      return (
        post?.title?.includes(pageData.searchText) || pageData.searchText === ""
      );
    });
  }
);

const { data, error } = await useFetch(
  "https://jsonplaceholder.typicode.com/posts"
);
postsStore.allPosts = data.value;
postsStore.filteredPosts = postsStore.allPosts;
const selectCurrentPost = (postId: number) => {
  postsStore.selectedPosts.add(postId);
};
</script>

<style scoped>
.selected_post {
  background-color: rgba(0, 255, 255, 0.341);
}
</style>
