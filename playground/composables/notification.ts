type ValueOf<T> = T[keyof T]

const notificationStore: Ref<TNotificationController[]> = ref([])
const notificationTypes = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
} as const

export type TNotification = {
  id: string
  title?: string
  message: string
  type: ValueOf<typeof notificationTypes>
  timeout?: number
  closable?: boolean
  autoClose?: boolean
  disableDarkMode?: boolean
}
type TNotificationShow = Omit<TNotification, 'id'>
type TNotificationPush = Omit<TNotification, 'id' | 'type'> | string
export type TNotificationController = ReturnType<typeof useNotificationController>

export function getNotificationStore() {
  return notificationStore.value
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function useNotificationController(value: TNotification, destroyFn: () => void) {
  const settings: TNotification = value
  let timeoutData: NodeJS.Timeout
  let canClose = true

  function destroy() {
    clearTimeout(timeoutData)
    destroyFn()
  }

  function getSettings() {
    return settings
  }

  function mouseEnter(_event: MouseEvent) {
    canClose = false
    clearTimeout(timeoutData)
  }

  function mouseLeave(_event: MouseEvent) {
    canClose = true
    start()
  }

  function start() {
    if (settings.autoClose == false) {
      return
    }

    timeoutData = setTimeout(() => {
      if (canClose) {
        destroy()
      }
    }, settings.timeout)
  }

  return {
    getSettings,
    mouseEnter,
    mouseLeave,
    start,
    destroy,
  }
}

export function useNotification() {
  const timeout = 2000

  function destroy(id: string) {
    return () => {
      const index = notificationStore.value.findIndex(item => item.getSettings().id == id)
      if (index != -1) {
        notificationStore.value.splice(index, 1)
      }
    }
  }

  function setNotificationStore(value: ReturnType<typeof useNotificationController>) {
    notificationStore.value.push(value)
  }

  function show(value: TNotificationShow) {
    const content = Object.assign(
      {
        id: self.crypto.randomUUID(),
        title: '',
        timeout: timeout,
        closable: false,
        autoClose: true,
        disableDarkMode: false,
      },
      value,
    )
    setNotificationStore(useNotificationController(content, destroy(content.id)))
  }

  function success(value: TNotificationPush) {
    show(
      Object.assign(
        {
          type: notificationTypes.success,
        },
        isString(value) ? { message: value } : value,
      ) as TNotificationShow,
    )
  }

  function info(value: TNotificationPush) {
    show(
      Object.assign(
        {
          type: notificationTypes.info,
        },
        isString(value) ? { message: value } : value,
      ) as TNotificationShow,
    )
  }

  function warning(value: TNotificationPush) {
    show(
      Object.assign(
        {
          type: notificationTypes.warning,
        },
        isString(value) ? { message: value } : value,
      ) as TNotificationShow,
    )
  }

  function error(value: TNotificationPush) {
    show(
      Object.assign(
        {
          type: notificationTypes.error,
        },
        isString(value) ? { message: value } : value,
      ) as TNotificationShow,
    )
  }

  return {
    success,
    info,
    warning,
    error,
  }
}

export const notify = useNotification()
