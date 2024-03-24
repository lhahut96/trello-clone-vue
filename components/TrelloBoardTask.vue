<template>
  <div class="task-wrapper" :title="parsedDate">
    <div class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex">
      <DraggableHandle class="pr-2" />
      <span>
        {{ task.content }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types";
const props = defineProps<{
  task: Task;
}>();

const task = ref<Task>(props.task);
const parsedDate = new Date(task.value.createdAt).toLocaleDateString();
</script>

<style scoped>
.sortable-drag {
  .task {
    transform: rotate(5deg);
  }
}
.sortable-ghost {
  @apply relative;

  &::after {
    content: "";
    @apply absolute top-0 left-0 w-full h-full border bg-slate-200 rounded border-gray-400;
  }
}
</style>
