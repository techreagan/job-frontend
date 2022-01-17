import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();
  function triggerNotification(
    message,
    type = "positive",
    position = "top",
    actions = []
  ) {
    $q.notify({
      type,
      position,
      message,
      actions,
    });
  }

  return { triggerNotification };
}
