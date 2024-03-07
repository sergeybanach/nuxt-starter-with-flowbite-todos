export const usePostsStore = defineStore("posts", {
  state: (): any => {
    return {
      allPosts: [],
      filteredPosts: [],
      selectedPosts: new Set(),
    };
  },
});
