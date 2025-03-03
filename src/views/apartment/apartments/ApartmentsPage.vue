<script setup>
import { ref, onBeforeMount } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const loading = ref(false);
const apartments = ref([]);

onBeforeMount(async () => {
  await fetchBookings();
});

const fetchBookings = async () => {
  if (loading.value) return false;

  try {
    loading.value = true;

    const response = await fetch("/api/apartments", {
      method: "GET",
    });
    const result = await response.json();
    apartments.value = result.apartments || [];
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <DataTable :value="apartments" :loading scrollable>
      <Column field="id" header="Id"></Column>
      <Column field="address" header="Адрес"></Column>
      <Column field="deposit" header="Депозит">
        <template #body="{ data }">
            <span>{{ data.deposit }}₽</span>
        </template></Column>
      <Column field="inHour" header="Время заезда">
        <template #body="{ data }">
            <span>{{ data.inHour }}:00</span>
        </template>
      </Column>
      <Column field="outHour" header="Время заезда">
        <template #body="{ data }">
            <span>{{ data.outHour }}:00</span>
        </template>
      </Column>
      <Column field="linens" header="Кол-во п/б"></Column>
    </DataTable>
  </div>
</template>
