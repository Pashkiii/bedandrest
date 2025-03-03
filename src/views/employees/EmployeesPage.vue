<script setup>
import { ref, onBeforeMount } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const loading = ref(false);
const employees = ref([]);

onBeforeMount(() => {
  fetchBookings();
});

const fetchBookings = async () => {
  if (loading.value) return false;

  try {
    loading.value = true;

    employees.value = [
      {
        id: 37565,
        name: "Ольга",
        email: "olga_polutina@mail.ru",
        phone: "+7 963 802-45-59",
        position: 'Менеджер'
      },
      {
        id: 37883,
        name: "Ирина",
        email: "",
        phone: "+7 914 554-57-61",
        position: 'Менеджер'
      },

      {
        id: 66219,
        name: "Елена",
        email: "lenka7871@mail.ru",
        phone: "+7 909 817-78-71",
        position: 'Менеджер'
      },
      {
        id: 91001,
        name: "Александра",
        email: "kolo.sacha3@gmail.com",
        phone: "+7 914 390-54-36",
        position: 'Менеджер'
      },
      {
        id: 107745,
        name: "Александр Нефёдов",
        email: "nedrenie@touchh.ru",
        phone: "+7 903 788-80-90",
        position: 'Менеджер'
      },
    ];
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <DataTable :value="employees" :loading scrollable>
      <Column field="id" header="Id"></Column>
      <Column field="name" header="Имя"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Телефон"></Column>
      <Column field="position" header="Должность"></Column>
    </DataTable>
  </div>
</template>
