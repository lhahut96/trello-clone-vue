<template>
  <textarea
    v-model="content"
    @keydown.tab="createTask"
    @keyup.enter="createTask"
    class="focus:bg-white focus:shadow p-2 bg-gray-200 resize-none rounded w-full border-red"
    :class="{
      'h-10 cursor-pointer': !focused,
      'h-20': focused,
    }"
    style="outline: none"
    :placeholder="!focused ? '+ Add a task' : 'Enter a content for the task...'"
    @focus="focused = true"
    @blur="focused = false"
  />
</template>

<script setup lang="ts">
import type { Task } from "~/types";
import { nanoid } from "nanoid";
const emit = defineEmits<{ (e: "add", payload: Task): void }>();

const focused = ref(false);
const content = ref("");
const createTask = (e: Event) => {
  if (content.value.trim()) {
    e.preventDefault();
    emit("add", {
      id: nanoid(),
      content: content.value.trim(),
      createdAt: new Date(),
    } as Task);
    content.value = "";
  }
};
</script>

<style scoped></style>
