export const registerServiceWorker = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
}

export const checkPWA = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true
}

export const installPWA = () => {
  if (typeof window === 'undefined') return
  
  // Trigger browser's install prompt
  const event = new Event('installPrompt')
  window.dispatchEvent(event)
}