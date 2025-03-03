<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import Button from 'primevue/button';

const route = useRoute();

const loading = ref(true);
const booking = ref(null);

onBeforeMount(async () => {
  await fetchBooking(parseInt(route.params.id, 10));
});

const fetchBooking = async (id) => {
  try {
    loading.value = true;

    const response = await fetch(`/api/booking/${id}`, {
      method: "GET",
    });
    const result = await response.json();
    booking.value = result.booking || null;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.card {
  background: var(--p-menu-background);
  padding: 2rem;
  border-radius: 5px;
}

.booking-not-found p {
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.booking-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-form-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-form-row.--inline {
  flex-direction: row;
  align-items: center;
}

.card-form-row label {
  font-weight: 500;
}
</style>

<template>
  <div class="card">
    <div v-if="!loading && booking === null" class="booking-not-found">
      <p>Бронирование не найдено</p>
    </div>

    <div v-if="!loading && booking !== null" class="booking-card">
      <div class="card-form-row">
        <label>ID</label>
        <span>{{ booking.id }}</span>
      </div>
      <div class="card-form-row">
        <label>Дата заезда</label>
        <span>{{ booking.beginDate }}</span>
      </div>
      <div class="card-form-row">
        <label>Дата выезда</label>
        <span>{{ booking.endDate }}</span>
      </div>
      <div class="card-form-row">
        <label>Дата создания</label>
        <span>{{ booking.createDate }}</span>
      </div>
      <div class="card-form-row">
        <label>Ссылка в RealtyCalendar</label>
        <a :href="booking.realtyBookingLink">
          {{ booking.realtyBookingLink }}
        </a>
      </div>
      <div class="card-form-row">
        <label>Клиент</label>
        <span>{{ booking.client?.name }}</span>
      </div>
      <div class="card-form-row --inline">
        <label>Первое сообщение отправлено</label>
        <template v-if="firstMessageSent">
          <i class="pi pi-check" style="font-size: 1rem"></i>
        </template>
        <template v-else>
          <i class="pi pi-clock" style="font-size: 1rem"></i>
          <Button
            v-tooltip.bottom="{value: 'Скоро'}"
            severity="secondary"
            size="small"
            label="Отправить"
          />
        </template>
      </div>
      <div class="card-form-row --inline">
        <label>Второе сообщение отправлено</label>
        <template v-if="secondMessageSent">
          <i class="pi pi-check" style="font-size: 1rem"></i>
        </template>
        <template v-else>
          <i class="pi pi-clock" style="font-size: 1rem"></i>
          <Button
            v-tooltip.bottom="{value: 'Скоро'}"
            severity="secondary"
            size="small"
            label="Отправить"
          />
        </template>
      </div>
      <div class="card-form-row --inline">
        <label>Третье сообщение отправлено</label>
        <template v-if="thirdMessageSent">
          <i class="pi pi-check" style="font-size: 1rem"></i>
        </template>
        <template v-else>
          <i class="pi pi-clock" style="font-size: 1rem"></i>
          <Button
            v-tooltip.bottom="{value: 'Скоро'}"
            severity="secondary"
            size="small"
            label="Отправить"
          />
        </template>
      </div>
    </div>
  </div>
</template>
