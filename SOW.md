# Statement of Work (SOW) – uGrant Energy Scheme Eligibility Platform

## 1. Overview

uGrant is a public-facing digital service that determines household eligibility for all UK national and local energy-efficiency schemes and generates pre-qualified leads for installers. The platform provides a clean multi-step user journey, automatic EPC data lookup, tiered eligibility outcomes, and a full admin system for managing leads, installers, pricing, payments, schemes, and reporting.

The site includes full SEO-optimised content, a blog, and localised landing pages to drive traffic organically.

## 2. User Functionality

### 2.1 Eligibility Checker

A multi-step wizard with 1–3 questions per page, mobile-first, fast, and frictionless.

**Questions Collected:**
- Postcode
- Property type
- Tenure
- Heating type
- Existing insulation
- Benefits (select from list)
- Income band (broad ranges)
- EPC rating (auto-fetched; user can override)
- Contact details (email + phone if wanting an installer)

**EPC API Integration:**
- Automatically fetch EPC data using the Open Data Communities EPC API (key provided)
- Auto-populate EPC rating, property type, and insulation attributes when available

**End-of-form Confirmations:**
- "Connect me with installers" tick box
- Accept Terms & Conditions
- Accept Privacy Policy

### 2.2 Eligibility Logic

Tiered eligibility system:

**Eligible:**
- Meets core rules for one or more schemes
- User sees:
  - "You're eligible"
  - List of eligible schemes

**Potentially Eligible:**
- Missing or uncertain data (e.g. EPC not found, borderline income)
- Appears in the user view as:
  - "You might be eligible"
  - List of possible schemes

**Not Eligible:**
- Does not meet minimum requirements
- User sees only:
  - "You're not eligible"

**Lead Creation Rule:**
A lead is only created when BOTH are true:
1. User is Eligible for at least one scheme
2. User ticks "Connect me with installers"

## 3. Lead & Installer Workflow

### 3.1 Lead Creation
Every qualifying user who opts for installer contact becomes a lead stored in Admin.

### 3.2 Admin Lead Actions
Admin can:
- View full lead details
- Add internal notes
- Set the lead price
- Trigger "Send to installer"
- Resend installer email
- See payment status
- Soft delete, hard delete, restore
- Export paid or unpaid leads

### 3.3 Installer Email
When admin clicks Send:
- Installer receives an email with:
  - Basic lead details only
  - Lead price
  - Stripe payment link

### 3.4 Stripe Integration
Installer purchases the lead through Stripe:
- After payment, the system:
  - Sends full lead details automatically
  - Marks the lead as "Purchased"
  - Logs the transaction

### 3.5 Lead Statuses
- New
- Sent
- Purchased
- Resent
- Deleted / Archived

## 4. Admin System

### 4.1 Lead Management
Features include:
- View, filter, search by:
  - Postcode
  - Scheme eligibility
  - Payment status
  - Date range
- Add internal notes
- Edit leads (correct info)
- Export leads (CSV/PDF)
- Soft & hard delete (GDPR-ready)

### 4.2 Installer Management
Admin can:
- Add/edit installers
- Set installer email
- Set default lead price
- Activate/deactivate installers
- View purchase history per installer

### 4.3 Scheme Management
Admin can:
- Turn schemes on/off
- Add new schemes
- Edit scheme rules
- Update eligibility criteria
- Maintain benefit lists, EPC ranges, income bands
- Manage region-specific schemes

### 4.4 Reporting
Dashboard showing:
- Number of users checked
- Eligible / Potentially Eligible / Not Eligible counts
- Scheme breakdowns
- Lead volume
- Purchased lead volume
- Revenue from purchased leads
- Conversion rate
- Installer performance metrics

### 4.5 Admin User Control
Create/remove admin accounts

**Permissions:**
- Full admin
- Lead manager
- Read-only

## 5. Website Structure

All pages included:
- Home Page
- Eligibility Checker Start Page
- How It Works / About uGrant
- Schemes Overview Page
- Individual Scheme Pages:
  - ECO4
  - GBIS
  - Warm Home Discount
  - Boiler Upgrade Scheme
  - LA Flex
  - Any additional schemes
- FAQ Page
- Installer Information Page
- Contact Page
- Blog:
  - Scheme articles
  - Guidance pieces
  - Updates
- Privacy Policy
- Terms & Conditions

## 6. SEO Implementation

### Localised SEO
Generate location-specific landing pages, e.g.:
- "ECO4 Grants Manchester"
- "Insulation Grants Birmingham"
- "Energy Grants Glasgow"

### Blog SEO
Articles for:
- Each scheme
- Common questions
- Seasonal energy advice
- Regulation changes
- "How to qualify for…" type posts

### Technical SEO
- Fast-loading pages
- Clean URL structure
- Page-level metadata
- Schema.org markup (FAQ + HowTo + Organisation)
- Optimised Core Web Vitals
- Mobile-first indexing
- Internal linking across schemes, articles, and the checker

(This matches the "Aggressive SEO" option.)

## 7. Design & Brand

### Design Requirements
- Green & white modern theme
- Clean, modern, trustworthy
- Accessibility AAA-friendly colour contrast
- GOV.UK-style simplicity with consumer-friendly styling
- Mobile-first responsive layout
- Iconography for schemes, steps, benefits

### Brand Components
- Logo
- Colour palette (greens/whites)
- Modern sans-serif typography
- Consistent UI components across pages

## 8. Non-Functional Requirements

### Performance
- ~1–2 second page loads
- Simple multi-step form with instant rule evaluation
- Optimised API calls to EPC service

### Security & Compliance
- Fully GDPR compliant
- HTTPS everywhere
- Encrypted data at rest
- Stripe secure payment integration
- Audit logs for admin actions
- Data retention policies & deletion controls

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigable
- Screen-reader compatible

## 9. Deliverables

uGrant delivers:
- Fully functional eligibility checker
- EPC API integration
- Tiered eligibility engine
- Full admin system
- Installer lead management workflow
- Stripe payment flow
- Complete SEO site structure + content templates
- Localised landing pages
- Blog system
- Full set of public-facing pages
- Reporting dashboard
- Branding + UI components
- Documentation for admins
- Privacy & T&C templates
