import React from 'react'
import {
  registerTracker,
  getTracker,
} from 'gatsby-plugin-tracking-consent';

const trackerId = 'hubspot';
const trackerLabel = 'HubSpot';

export function onClientEntry() {
    registerTracker({ id: trackerId, label: trackerLabel });
}
export function onRouteUpdate({ location }) {
    const tracker = getTracker(trackerId);
    const consent = tracker && tracker.enabled;
    if (!consent) {
        return;
    }
    if (process.env.NODE_ENV === 'production' && typeof _hsq === 'object') {
        let _hsq = window._hsq = window._hsq || [];
        _hsq.push(['setPath', location ? location.pathname + location.search + location.hash : undefined]);
        _hsq.push(['trackPageView']);
    }
}
