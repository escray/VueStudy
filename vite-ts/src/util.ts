import { getCurrentInstance, ComponentInternalInstance } from 'vue'

export function useGlobalConfig() {
  const instance:ComponentInternalInstance | null = getCurrentInstance()
  if (!instance) {
    console.log('useGlobalConfig must in setup group')
    return
  }
  return instance.appContext.config.globalProperties.$AILEMENTE || {}
}
