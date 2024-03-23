<template>
  <div class="flex gap-4 overflow-auto items-start">
    <div
      class="column bg-gray-200 p-5 rounded min-w-[250px]"
      v-for="column in columns"
      :key="column.id"
    >
      <h2 class="font-bold mb-4">{{ column.title }}</h2>
      <TrelloBoardTask v-for="task in column.tasks" :task="task" :key="task.id">
      </TrelloBoardTask>
      <button class="text-gray-500">+ Add Task</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from "@/types";
import { nanoid } from "nanoid";
const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: "Backlog",
    tasks: [
      { id: nanoid(), content: "Task 5", createdAt: new Date() },
      { id: nanoid(), content: "Task 6", createdAt: new Date() },
    ],
  },
  {
    id: nanoid(),
    title: "To do",
    tasks: [{ id: nanoid(), content: "Task 3", createdAt: new Date() }],
  },
  {
    id: nanoid(),
    title: "In Progress",
    tasks: [
      { id: nanoid(), content: "Task 1", createdAt: new Date() },
      { id: nanoid(), content: "Task 2", createdAt: new Date() },
    ],
  },
]);
</script>

<style scoped></style>