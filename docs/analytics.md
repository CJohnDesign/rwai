# Google Analytics Implementation Plan

## Overview
This document outlines the implementation of Google Analytics 4 (GA4) via Google Tag Manager (GTM) for the RWAi website to track user flow and conversions.

## Implementation Details

### Setup
1. **Google Tag Manager Setup**
   - Create a new GTM account and container
   - Add container to both main domain (rwai.xyz) and app subdomain (app.rwai.xyz)
   - Set up user permissions for marketing/analytics team members

2. **Google Analytics 4 Configuration**
   - Create a new GA4 property in Google Analytics
   - Configure data streams for the main domain and app subdomain
   - Set appropriate data retention periods (14 months recommended)
   - Link GA4 property to GTM

3. **Script Implementation**
   - Add GTM container code to the `app/layout.tsx` file:
     - GTM script in the `<head>` section
     - GTM noscript in the `<body>` section
   - No need to add Google Analytics script directly as it will be managed through GTM

4. **Subdomains Tracking**
   - Configure cross-domain tracking between main site and app subdomain
   - Ensure consistent user identification across domains

## Key Events Tracking

### Page Views
- Automatically tracked by default GA4 implementation via GTM

### User Interactions
- Configure GTM triggers for:
  - Navigation menu clicks
  - CTA button clicks
  - External link clicks
  - Download clicks
- Use GTM's built-in click and form tracking capabilities

### Conversion Tracking
- Primary conversion: Whitelist form submission
  - Create a custom event for form submission success
  - Set up a GA4 conversion event in GTM
  - Configure form abandonment tracking

## Implementation Code

### GTM Container Code

Add to the `<head>` section in `app/layout.tsx`:
```tsx
<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-KBSN67QN');
</script>
<!-- End Google Tag Manager -->
```

Add immediately after the opening `<body>` tag:
```tsx
<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KBSN67QN"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
```

### Form Conversion Tracking

For the whitelist form in `app/whitelist/page.tsx`, use a data layer push on successful form submission:

```tsx
// After successful form submission
if (data && !error) {
  // Push form conversion event to data layer for GTM
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      'event': 'whitelist_submission',
      'formId': 'whitelist-application'
    });
  }
  
  setSubmitStatus({ success: true, error: null });
  // Reset form after successful submission
  // ...
}
```

## GTM Configuration

### Tags
1. **GA4 Configuration Tag**
   - Type: Google Analytics: GA4 Configuration
   - Measurement ID: G-XXXXXXXXX
   - Trigger: All Pages

2. **Whitelist Form Submission Tag**
   - Type: Google Analytics: GA4 Event
   - Event Name: conversion
   - Parameters:
     - conversion_type: whitelist_form
   - Trigger: Custom Event - whitelist_submission

### Triggers
1. **All Pages**
   - Type: Page View
   - Fires on: All Pages

2. **Whitelist Form Submission**
   - Type: Custom Event
   - Event name: whitelist_submission

### Variables
1. **GA4 Measurement ID**
   - Type: Constant
   - Value: G-XXXXXXXXX

## Privacy Compliance

- Update Privacy Policy to reflect analytics data collection
- Implement cookie consent mechanism through GTM's consent mode
- Ensure IP anonymization is enabled in GA4 settings

## Testing

1. Enable GTM's preview mode for testing tags
2. Use GA4 DebugView to verify events are properly tracked
3. Test page view tracking across site sections
4. Verify conversion tracking on whitelist form submission
5. Check cross-domain tracking between main site and app subdomain

## Reporting

Key reports to create in GA4:
1. User acquisition overview
2. User journey flow visualization
3. Conversion funnel analysis
4. Time to conversion report
5. Device and platform breakdown

## Next Steps

1. Create GTM account and container
2. Implement the GTM container code in the layout file
3. Set up GA4 property and connect to GTM
4. Configure tags, triggers and variables in GTM
5. Implement dataLayer push for form conversions
6. Test the implementation
7. Create standard reports and dashboard 