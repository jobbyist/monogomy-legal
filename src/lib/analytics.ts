// Analytics helper for tracking key events
// Integrates with Google Tag Manager or PostHog

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    // Google Tag Manager
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...properties,
      })
    }

    // Console log in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', eventName, properties)
    }
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

// Predefined event trackers
export const analytics = {
  pricingPlanClicked: (plan: string) => trackEvent('pricing_plan_clicked', { plan }),
  subscriptionCompleted: (plan: string, amount: number) => trackEvent('subscription_completed', { plan, amount }),
  documentUploaded: () => trackEvent('document_uploaded'),
  attorneyReviewRequested: () => trackEvent('attorney_review_requested'),
}
