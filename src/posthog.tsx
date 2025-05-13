import posthog from 'posthog-js'

// posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
//   api_host: 'https://app.posthog.com', 
//   capture_pageview: true,
//   disable_session_recording: false 
// })

posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
    api_host: 'https://us.i.posthog.com',
    loaded: (posthog) => {
      if (import.meta.env.DEV) posthog.debug();
    },
    capture_pageview: true, // Tracks pageviews automatically
    capture_performance: true, // Tracks performance
    disable_session_recording: false, // Enables session recording
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: {
          password: true
      }
    }
  });

export default posthog;