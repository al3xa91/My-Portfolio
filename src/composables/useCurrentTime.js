import { onMounted, onUnmounted, ref } from 'vue'

export function useCurrentTime(locale = 'en-GB') {
  const currentTime = ref('')
  let timerId

  const updateTime = () => {
    currentTime.value = new Date().toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  onMounted(() => {
    updateTime()
    timerId = setInterval(updateTime, 1000)
  })

  onUnmounted(() => {
    clearInterval(timerId)
  })

  return {
    currentTime,
  }
}
