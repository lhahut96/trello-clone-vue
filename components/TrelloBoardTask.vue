<template>
  <div class="task-wrapper relative" :title="parsedDate">
    <button
      class="delete-button hidden absolute -top-2 -right-2 text-xs text-red-400 rounded-full bg-gray-100 w-4 h-4 flex items-center justify-center"
      @click="emit('delete', task)"
    >
      <DeleteIcon />
    </button>
    <div
      class="task p-2 bg-white mb-2 rounded shadow-sm max-w-[250px] overflow-auto flex"
    >
      <DraggableHandle class="pr-2" />
      <span
        v-if="!focused"
        class="text-pretty w-full"
        :class="{
          'cursor-pointer': !focused,
        }"
        @click="focused = true"
      >
        {{ task.content }}
      </span>
      <textarea
        v-else
        class="focus:outline-none resize-none rounded w-full border-none ountline-none h-fit justify-center text-pretty flex py-2"
        v-model="task.content"
        @blur="focused = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types";
const props = defineProps<{
  task: Task;
}>();
const emit = defineEmits<{ (e: "delete", payload: Task): void }>();
const focused = ref(false);
const task = ref<Task>(props.task);
const parsedDate = new Date(task.value.createdAt).toLocaleDateString();
</script>

<style scoped>
.task-wrapper {
  &:hover {
    .delete-button {
      display: flex;
    }
  }
}
.sortable-drag {
  .task {
    transform: rotate(5deg);
  }

  &:hover {
    .delete-button {
      display: none;
    }
  }
}
.sortable-ghost {
  @apply relative;

  &::after {
    content: "";
    @apply absolute top-0 left-0 w-full h-full border bg-slate-200 rounded border-gray-400;
  }
  &:hover {
    .delete-button {
      display: none;
    }
  }
}
</style>
