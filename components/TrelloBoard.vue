<template>
  <div class="flex gap-4 overflow-auto">
    <VueDraggable
      :animation="150"
      v-model="columns"
      handle=".drag-handle"
      group="columns"
      class="flex gap-4 items-start relative"
    >
      <div
        class="column bg-gray-200 p-5 rounded min-w-[250px]"
        v-for="column in columns"
        :key="column.id"
      >
        <header class="task-header font-bold mb-4 relative">
          <button
            class="delete-button hidden absolute top-0 right-0 text-xs text-red-400 w-6 h-6 flex items-center justify-center"
            @click="deleteColumn(column)"
          >
            <DeleteIcon />
          </button>
          <DraggableHandle />
          <input
            class="bg-transparent focus:bg-white rounded px-1 w-4/5"
            @keyup.enter="($event.target as HTMLInputElement).blur()"
            @keydown.backspace="backspace(column)"
            type="text"
            v-model="column.title"
          />
        </header>

        <VueDraggable
          v-model="column.tasks"
          handle=".drag-handle"
          :animation="90"
          :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
          invertSwap
        >
          <TrelloBoardTask
            v-for="task in column.tasks"
            :task="task"
            :key="task.id"
            @delete="deleteTask(task, column.id)"
          />
        </VueDraggable>
        <NewTask @add="(task) => column.tasks.push(task)" />
      </div>
    </VueDraggable>
    <button
      @click="createColumn"
      class="bg-gray-200 p-2 rounded min-w-[100px] h-fit"
    >
      + Add New Column
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Column, Task } from "@/types";
import { useKeyModifier, useLocalStorage } from "@vueuse/core";
import { nanoid } from "nanoid";
import { VueDraggable } from "vue-draggable-plus";

const columns = useLocalStorage<Column[]>("trelloBoard", [
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

const deleteTask = (task: Task, columnID: String) => {
  const column = columns.value.find((column) => column.id === columnID);
  if (column) {
    column.tasks = column.tasks.filter((t) => t.id !== task.id);
  }
};

const createColumn = async () => {
  columns.value.push({
    id: nanoid(),
    title: "",
    tasks: [],
  });
  await nextTick(() => {
    const columns = document.querySelectorAll(".column");
    columns[columns.length - 1].querySelector("input")?.focus();
  });
};

const backspace = (column: Column) => {
  column.title === "" ? deleteColumn(column) : null;
};

const deleteColumn = (column: Column) => {
  columns.value = columns.value.filter((c) => c.id !== column.id);
};

const alt = useKeyModifier("Alt");
</script>

<style scoped>
.task-header {
  &:hover {
    .delete-button {
      display: flex;
    }
  }
}
</style>
