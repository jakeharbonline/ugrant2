# uGrant Implementation Checklist

## Database Schema & Setup

- [ ] Create `schemes` table (id, name, description, rules_json, active, region-specific flags)
- [ ] Create `benefits` table (id, name, category)
- [ ] Create `leads` table (id, user_id, postcode, property_type, tenure, heating_type, insulation, benefits, income_band, epc_rating, email, phone, eligible_schemes, status, price, notes, created_at, updated_at, deleted_at)
- [ ] Create `installers` table (id, name, email, default_price, active, created_at, updated_at)
- [ ] Create `lead_purchases` table (id, lead_id, installer_id, stripe_payment_id, amount, purchased_at)
- [ ] Create `admin_users` table (id, email, password_hash, role, created_at)
- [ ] Create `audit_logs` table (id, admin_user_id, action, entity_type, entity_id, changes_json, created_at)
- [ ] Set up Row Level Security (RLS) policies for all tables
- [ ] Create indexes for performance (postcode, status, created_at, etc.)
- [ ] Generate TypeScript types from database schema

## EPC API Integration

- [ ] Set up EPC API credentials (Open Data Communities)
- [ ] Create `composables/api/useEpcLookup.ts` for API calls
- [ ] Implement postcode-based EPC data fetch
- [ ] Handle EPC not found scenarios
- [ ] Auto-populate: EPC rating, property type, insulation
- [ ] Allow user override of EPC data
- [ ] Add error handling and fallbacks

## Eligibility Logic Engine

- [ ] Create `composables/eligibility/useEligibilityChecker.ts`
- [ ] Implement tiered eligibility system (Eligible, Potentially Eligible, Not Eligible)
- [ ] Create rules engine for each scheme:
  - [ ] ECO4
  - [ ] GBIS
  - [ ] Warm Home Discount
  - [ ] Boiler Upgrade Scheme
  - [ ] LA Flex
- [ ] Handle missing/uncertain data logic
- [ ] Generate eligibility result with scheme list
- [ ] Implement lead creation rule (eligible + opted-in)

## Multi-Step Eligibility Checker (Frontend)

- [ ] Create `pages/checker/index.vue` (start page)
- [ ] Create `pages/checker/step-[step].vue` for each step
- [ ] Step 1: Postcode
- [ ] Step 2: Property type
- [ ] Step 3: Tenure
- [ ] Step 4: Heating type
- [ ] Step 5: Existing insulation
- [ ] Step 6: Benefits (multi-select from list)
- [ ] Step 7: Income band
- [ ] Step 8: EPC rating (auto-fetched, allow override)
- [ ] Step 9: Contact details (email + phone)
- [ ] Step 10: Confirmations (installer opt-in, T&C, Privacy)
- [ ] Results page showing eligibility tier and schemes
- [ ] Mobile-first design (1-3 questions per page)
- [ ] Progress indicator component
- [ ] Form validation on each step
- [ ] Back button functionality
- [ ] Save progress to localStorage (optional)

## Lead Management System

### Lead Creation
- [ ] Create `composables/database/useLead.ts`
- [ ] Implement lead creation on eligible + opted-in
- [ ] Store all checker data in leads table
- [ ] Link lead to eligible schemes

### Admin Lead Views
- [ ] Create `pages/admin/leads/index.vue` (list view)
- [ ] Create `pages/admin/leads/[id].vue` (detail view)
- [ ] Implement filters (postcode, scheme, payment status, date range)
- [ ] Implement search functionality
- [ ] Add pagination
- [ ] Create lead status badges component

### Admin Lead Actions
- [ ] Add internal notes feature
- [ ] Set lead price input
- [ ] "Send to installer" button with confirmation
- [ ] Resend installer email button
- [ ] View payment status
- [ ] Soft delete functionality
- [ ] Hard delete functionality
- [ ] Restore deleted leads
- [ ] Export leads (CSV)
- [ ] Export leads (PDF)

## Installer Management

- [ ] Create `pages/admin/installers/index.vue` (list)
- [ ] Create `pages/admin/installers/[id].vue` (detail/edit)
- [ ] Create `pages/admin/installers/new.vue` (add installer)
- [ ] Add/edit installer form
- [ ] Set default lead price
- [ ] Activate/deactivate toggle
- [ ] View purchase history per installer
- [ ] Create `composables/database/useInstaller.ts`

## Stripe Integration

- [ ] Set up Stripe account and keys
- [ ] Create Stripe payment link generation
- [ ] Create `server/api/stripe/create-payment-link.ts`
- [ ] Create `server/api/stripe/webhook.ts` for payment events
- [ ] Handle successful payment webhook
- [ ] Automatically send full lead details after payment
- [ ] Mark lead as "Purchased"
- [ ] Log transaction in `lead_purchases` table
- [ ] Handle payment failures
- [ ] Send payment confirmation email

## Email System

- [ ] Set up email service (Resend, SendGrid, or similar)
- [ ] Create email templates:
  - [ ] Installer notification (basic lead info + payment link)
  - [ ] Full lead details (post-purchase)
  - [ ] Payment confirmation
  - [ ] Admin notifications (optional)
- [ ] Create `server/api/email/send-installer-notification.ts`
- [ ] Create `server/api/email/send-full-lead-details.ts`
- [ ] Implement email sending on admin actions
- [ ] Implement email sending on Stripe webhook
- [ ] Add email logging/tracking

## Scheme Management

- [ ] Create `pages/admin/schemes/index.vue` (list)
- [ ] Create `pages/admin/schemes/[id].vue` (edit)
- [ ] Create `pages/admin/schemes/new.vue` (add scheme)
- [ ] Turn schemes on/off toggle
- [ ] Edit scheme rules (JSON or form-based editor)
- [ ] Update eligibility criteria
- [ ] Maintain benefit lists
- [ ] Maintain EPC ranges
- [ ] Maintain income bands
- [ ] Region-specific scheme flags
- [ ] Create `composables/database/useScheme.ts`

## Reporting Dashboard

- [ ] Create `pages/admin/dashboard.vue`
- [ ] Total users checked counter
- [ ] Eligible / Potentially Eligible / Not Eligible counts
- [ ] Scheme breakdown (pie/bar charts)
- [ ] Lead volume over time (line chart)
- [ ] Purchased lead volume
- [ ] Revenue from purchased leads
- [ ] Conversion rate calculation
- [ ] Installer performance metrics
- [ ] Date range filters
- [ ] Export reports (CSV/PDF)

## Admin User Control

- [ ] Create `pages/admin/users/index.vue`
- [ ] Create `pages/admin/users/new.vue`
- [ ] Create/remove admin accounts
- [ ] Implement role-based permissions:
  - [ ] Full admin
  - [ ] Lead manager
  - [ ] Read-only
- [ ] Create auth middleware for admin routes
- [ ] Create `composables/auth/useAdminAuth.ts`

## Authentication System

- [ ] Set up Supabase Auth
- [ ] Create admin login page
- [ ] Create admin registration (invite-only)
- [ ] Implement password reset
- [ ] Session management
- [ ] Protect admin routes
- [ ] Create logout functionality

## Public Pages

- [ ] Create `pages/index.vue` (Home Page)
- [ ] Create `pages/checker.vue` redirect/start
- [ ] Create `pages/how-it-works.vue`
- [ ] Create `pages/schemes/index.vue` (schemes overview)
- [ ] Create individual scheme pages:
  - [ ] `pages/schemes/eco4.vue`
  - [ ] `pages/schemes/gbis.vue`
  - [ ] `pages/schemes/warm-home-discount.vue`
  - [ ] `pages/schemes/boiler-upgrade-scheme.vue`
  - [ ] `pages/schemes/la-flex.vue`
- [ ] Create `pages/faq.vue`
- [ ] Create `pages/for-installers.vue`
- [ ] Create `pages/contact.vue`
- [ ] Create `pages/privacy.vue`
- [ ] Create `pages/terms.vue`

## Blog System

- [ ] Create `pages/blog/index.vue` (blog list)
- [ ] Create `pages/blog/[slug].vue` (blog post)
- [ ] Create blog content management (admin)
- [ ] Create blog post schema (title, slug, content, author, date, tags, featured_image)
- [ ] Implement blog categories/tags
- [ ] Create blog posts for each scheme
- [ ] Create "How to qualify" posts
- [ ] Create seasonal energy advice posts
- [ ] Create regulation change posts
- [ ] RSS feed generation

## Localised SEO Landing Pages

- [ ] Create dynamic location landing page template
- [ ] Generate pages for major cities:
  - [ ] Manchester
  - [ ] Birmingham
  - [ ] Glasgow
  - [ ] Edinburgh
  - [ ] Cardiff
  - [ ] Bristol
  - [ ] Liverpool
  - [ ] Leeds
  - [ ] Sheffield
  - [ ] Newcastle
- [ ] Create scheme + location combinations
- [ ] Implement dynamic content per location
- [ ] Add local schema markup

## SEO Implementation

### Technical SEO
- [ ] Implement clean URL structure
- [ ] Add page-level metadata (title, description, OG tags)
- [ ] Implement Schema.org markup:
  - [ ] FAQ schema
  - [ ] HowTo schema
  - [ ] Organisation schema
- [ ] Optimise Core Web Vitals
- [ ] Mobile-first indexing verification
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Implement internal linking strategy
- [ ] Add canonical URLs
- [ ] Implement breadcrumbs

### Content SEO
- [ ] Keyword research for each scheme
- [ ] H1/H2/H3 hierarchy on all pages
- [ ] Alt text for all images
- [ ] Write SEO-optimised content for:
  - [ ] Home page
  - [ ] Each scheme page
  - [ ] FAQ page
  - [ ] How it works page
  - [ ] Blog posts

## Design & Branding

- [ ] Create logo
- [ ] Define colour palette (greens/whites)
- [ ] Select typography (modern sans-serif)
- [ ] Create UI component library:
  - [ ] Buttons
  - [ ] Form inputs
  - [ ] Cards
  - [ ] Badges
  - [ ] Modals
  - [ ] Alerts/notifications
  - [ ] Progress indicators
  - [ ] Icons for schemes
  - [ ] Icons for steps
  - [ ] Icons for benefits
- [ ] Design mobile-first layouts
- [ ] Ensure AAA colour contrast
- [ ] Create GOV.UK-style components

## Accessibility

- [ ] WCAG 2.1 AA compliance audit
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Focus indicators on all interactive elements
- [ ] ARIA labels where needed
- [ ] Accessible form error messages
- [ ] Skip to content link
- [ ] Accessible tables (admin views)

## Performance Optimization

- [ ] Implement lazy loading for images
- [ ] Optimize EPC API calls (caching)
- [ ] Database query optimization
- [ ] Implement CDN for static assets
- [ ] Minimize JavaScript bundles
- [ ] Server-side rendering (SSR) where beneficial
- [ ] Compress images
- [ ] Monitor page load times
- [ ] Lighthouse audit (score 90+)

## Security & Compliance

- [ ] HTTPS everywhere (force SSL)
- [ ] Implement GDPR compliance:
  - [ ] Data retention policies
  - [ ] Right to be forgotten (hard delete)
  - [ ] Consent tracking
  - [ ] Privacy notice
  - [ ] Cookie banner (if needed)
- [ ] Encrypt sensitive data at rest
- [ ] Secure Stripe integration
- [ ] Admin audit logs for all actions
- [ ] Rate limiting on API endpoints
- [ ] Input validation and sanitization
- [ ] CSRF protection
- [ ] XSS protection
- [ ] SQL injection protection (use ORMs)
- [ ] Regular security audits

## Testing

- [ ] Unit tests for eligibility logic
- [ ] Unit tests for composables
- [ ] Integration tests for API endpoints
- [ ] E2E tests for eligibility checker flow
- [ ] E2E tests for admin lead management
- [ ] E2E tests for Stripe payment flow
- [ ] Test EPC API error handling
- [ ] Test email delivery
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Load testing (admin dashboard)

## Documentation

- [ ] Admin user guide
- [ ] Scheme eligibility rules documentation
- [ ] API documentation
- [ ] Developer setup guide
- [ ] Deployment guide
- [ ] Privacy policy content
- [ ] Terms & conditions content
- [ ] GDPR compliance documentation

## Deployment

- [ ] Set up production environment variables
- [ ] Configure Supabase production instance
- [ ] Configure Stripe production keys
- [ ] Configure EPC API production keys
- [ ] Set up domain and DNS
- [ ] Deploy to Vercel
- [ ] Set up monitoring (error tracking)
- [ ] Set up analytics (Google Analytics or Plausible)
- [ ] Set up uptime monitoring
- [ ] Configure email service for production
- [ ] Database backups configured
- [ ] Set up staging environment

## Post-Launch

- [ ] Monitor eligibility checker completion rate
- [ ] Monitor lead conversion rate
- [ ] Monitor installer purchase rate
- [ ] Gather user feedback
- [ ] A/B test form variations
- [ ] Optimize SEO based on performance
- [ ] Add more localised landing pages
- [ ] Regular blog content updates
- [ ] Scheme rule updates as regulations change
- [ ] Installer onboarding improvements

---

**Progress:** 0/200+ tasks completed
