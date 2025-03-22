# GTM Routing Implementation Report

## Performance-First Implementation

### 1. Edge Middleware Optimization
```typescript
// middleware.ts - Optimized for speed
export default function middleware(req: NextRequest) {
  // Early return for non-tracking URLs
  if (!hasTrackingParams(req.url)) {
    return NextResponse.next();
  }

  const url = new URL(req.url);
  const hostname = req.headers.get('host') || '';
  const currentHost = hostname.split(':')[0];
  
  // Only process for app subdomain
  if (!currentHost.startsWith('app.')) {
    return NextResponse.next();
  }

  // Fast parameter extraction using Set for O(1) lookup
  const TRACKING_PARAMS = new Set(['_gl', '_ga', '_ga_3RT06YPS1M']);
  const trackingParams = {};
  
  // Single iteration over search params
  for (const [key, value] of url.searchParams.entries()) {
    if (TRACKING_PARAMS.has(key)) {
      trackingParams[key] = value;
      url.searchParams.delete(key);
    }
  }

  // Skip cookie operations if no tracking params
  if (Object.keys(trackingParams).length === 0) {
    return NextResponse.next();
  }

  // Create clean URL
  const cleanUrl = new URL(url.pathname + url.search, req.url);
  const response = NextResponse.redirect(cleanUrl);

  // Batch cookie operations
  Object.entries(trackingParams).forEach(([param, value]) => {
    response.cookies.set(param, value, {
      domain: '.rwai.xyz',
      path: '/',
      secure: true,
      sameSite: 'none',
      maxAge: 2592000 // 30 days
    });
  });

  return response;
}

// Fast check for tracking parameters
function hasTrackingParams(urlString: string): boolean {
  return /_g[al]/.test(urlString);
}
```

### 2. Optimized GTM Loading
```typescript
// layout.tsx - Performance optimized GTM loading
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to GTM domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Async GTM loader */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KBSN67QN');
            `
          }}
        />
      </head>
      <body>
        {/* GTM noscript - Deferred loading */}
        <noscript dangerouslySetInnerHTML={{
          __html: `
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KBSN67QN"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
              loading="lazy"
            ></iframe>
          `
        }} />
        {children}
      </body>
    </html>
  );
}
```

## Performance Optimizations

1. **Critical Path Improvements**
   - ✅ Preconnect to GTM domains
   - ✅ Async GTM script loading
   - ✅ Deferred noscript iframe loading
   - ✅ Early return in middleware for non-tracking URLs
   - ✅ O(1) parameter lookup using Set

2. **Cookie Optimizations**
   - ✅ Single-pass parameter extraction
   - ✅ Batch cookie operations
   - ✅ Skip cookie operations when unnecessary
   - ✅ Optimized cookie size and expiration

3. **Network Optimizations**
   - ✅ Single redirect for clean URLs
   - ✅ Minimal middleware processing
   - ✅ Reduced cookie payload size
   - ✅ Efficient parameter cleaning

## Implementation Steps

1. **Immediate Actions** (Day 1)
   - [ ] Deploy optimized middleware
   - [ ] Update GTM loading in layout
   - [ ] Add domain preconnects
   - [ ] Implement parameter cleaning

2. **Verification** (Day 2)
   - [ ] Run performance benchmarks
   - [ ] Verify tracking accuracy
   - [ ] Test cross-domain scenarios
   - [ ] Monitor TTFB impact

3. **Monitoring** (Ongoing)
   - [ ] Track Core Web Vitals
   - [ ] Monitor redirect timing
   - [ ] Measure cookie size
   - [ ] Analyze GTM impact

## Performance Metrics

1. **Target Metrics**
   - TTFB: < 100ms
   - FCP: < 1.5s
   - LCP: < 2.5s
   - Cookie size: < 1KB
   - Middleware latency: < 5ms

2. **Monitoring Tools**
   - Chrome DevTools Performance
   - Next.js Analytics
   - Core Web Vitals
   - Custom timing metrics

## Success Criteria

1. **Speed**
   - Zero impact on TTFB for non-tracking URLs
   - Single redirect for parameter cleaning
   - Minimal JavaScript execution time

2. **Functionality**
   - Maintained tracking accuracy
   - Clean URLs in all scenarios
   - Working cross-domain tracking

## Notes

- Performance is the primary goal
- Tracking remains accurate but secondary to speed
- Implementation focuses on minimal processing
- All operations optimized for speed 