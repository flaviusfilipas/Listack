<template>
  <ion-button
    style='align-self:end'
    fill="clear"
    @click.stop="setOpen(true,$event)"
  >
    <ion-icon
      slot="icon-only"
      :icon="ellipsisVerticalOutline"
    >
    </ion-icon>
  </ion-button>
  <ion-popover
    :is-open="isOpenRef"
    :event="event"
    :translucent="true"
    @didDismiss="setOpen(false)"
  >
    <popover-content />
  </ion-popover>
</template>

<script>
import { IonButton, IonIcon, IonPopover } from '@ionic/vue'
import PopoverContent from './PopoverContent.vue'
import { ref } from 'vue'
import { ellipsisVerticalOutline } from 'ionicons/icons'
export default {
  name: 'ListDetailsPopover',
  components: { IonButton, IonIcon, IonPopover, PopoverContent },

  setup () {
    const isOpenRef = ref(false);
    const event = ref();
    const setOpen = (state, evt) => {
      event.value = evt;
      isOpenRef.value = state;
    }
    return { isOpenRef, setOpen, event, ellipsisVerticalOutline }
  }
}
</script>

<style>
</style>