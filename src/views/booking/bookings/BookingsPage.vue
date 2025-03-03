<script setup>
import { ref, onBeforeMount } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const loading = ref(false);
const bookings = ref([]);

onBeforeMount(async () => {
  await fetchBookings();
});

const fetchBookings = async () => {
  if (loading.value) return false;

  try {
    loading.value = true;

    const response = await fetch("/api/bookings", {
      method: "GET",
    });
    const result = await response.json();
    bookings.value = result.bookings || [];
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <DataTable :value="bookings" :loading scrollable>
      <Column field="id" header="Id">
        <template #body="{ data }">
          <RouterLink :to="'/booking/' + data.id">
            <span>{{ data.id }}</span>
          </RouterLink>
        </template>
      </Column>
      <Column field="beginDate" header="Дата заезда"></Column>
      <Column field="endDate" header="Дата выезда"></Column>
      <Column field="apartmentId" header="Квартира"></Column>
    </DataTable>
  </div>
</template>
