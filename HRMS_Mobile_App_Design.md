# Hare & Turtle HRMS --- Mobile App Design Specification

> Source: `HRMS Mobile app.fig`
>
> This specification is generated from the supplied Figma file.
> Dimensions, typography, colors, component names, screen structure, and
> visible copy are taken from the Figma document where available.
> Image/vector artwork is referenced by its Figma asset/component name.

------------------------------------------------------------------------

## 1. Product Overview

**Product:** Hare & Turtle HRMS\
**Platform:** Mobile app\
**Primary viewport:** 393 × 852 px\
**Design style:** Clean enterprise HRMS, green brand accent, white
surfaces, rounded cards, compact information-dense dashboards.

### Primary user roles represented

-   Employee
-   Manager
-   Admin

### Core areas represented in this file

-   Splash / launch
-   Onboarding
-   Login
-   Employee dashboard
-   Employee dashboard with location-based attendance
-   Manager / My Team
-   Admin dashboard

------------------------------------------------------------------------

# 2. Global Design Foundations

## 2.1 Canvas & Device

  Property                            Value
  -------------------------------- --------
  Mobile frame width                 393 px
  Mobile frame height                852 px
  Status bar                          36 px
  Home indicator area                 21 px
  Main horizontal content margin      16 px
  Common content width               361 px
  Full-width header                  393 px

The main dashboard content uses a 16 px horizontal inset, producing a
361 px content width.

------------------------------------------------------------------------

## 2.2 Brand Colors

### Primary

  -----------------------------------------------------------------------
  Token                   Hex                     Usage
  ----------------------- ----------------------- -----------------------
  `brand.primary`         `#2A9246`               Main brand green,
                                                  active states, links,
                                                  progress

  `brand.primary.dark`    `#1E854E`               Primary buttons

  `brand.primary.alt`     `#1E854E`               Button/component green

  `brand.green.600`       `#16A34A`               Positive status

  `brand.green.500`       `#22C55E`               Success / status

  `brand.green.700`       `#15803D`               Dark success

  `brand.green.800`       `#1E854E`               Dark brand surface
  -----------------------------------------------------------------------

### Neutral palette

  Token             Hex         Usage
  ----------------- ----------- -----------------------------
  `neutral.white`   `#FFFFFF`   App background, cards
  `neutral.black`   `#000000`   Strong headings / icons
  `neutral.950`     `#0F172A`   Primary dark text
  `neutral.900`     `#1E293B`   Primary body/heading text
  `neutral.800`     `#475569`   Secondary text
  `neutral.600`     `#64748B`   Muted text
  `neutral.400`     `#94A3B8`   Placeholder / disabled text
  `neutral.300`     `#D9DFE5`   Borders / dividers
  `neutral.100`     `#F1F5F9`   Subtle surfaces
  `neutral.50`      `#F8FAFC`   Light surface

### Supporting colors

  Hex         Typical usage
  ----------- -------------------------
  `#1D68ED`   Blue information/status
  `#2563EB`   Blue interactive status
  `#4AA3FE`   Light blue
  `#059669`   Emerald success
  `#FE7717`   Orange
  `#FACC15`   Yellow
  `#CB30E0`   Purple
  `#8B5CF6`   Violet
  `#EC4899`   Pink
  `#FF2D55`   Alert/accent
  `#E11D48`   Red/negative
  `#F43F5E`   Soft red
  `#FEF3C7`   Warning background
  `#DCFCE7`   Success background
  `#EFF6FF`   Information background
  `#EDFBF4`   Light green background
  `#FFF1F2`   Error background
  `#FDF2F8`   Pink background

------------------------------------------------------------------------

# 3. Typography

## 3.1 Primary font

**Inter** is the primary product typeface.

The design uses the following Inter weights/styles:

-   Regular
-   Light
-   Medium
-   Semi Bold
-   Bold
-   Extra Bold

### iOS system typography

The status bar uses:

-   **SF Pro Text**
-   Semibold
-   17 px

------------------------------------------------------------------------

## 3.2 Type scale observed

  Role                              Size Weight
  -------------------------- ----------- ----------------------
  Onboarding hero heading          29 px Semi Bold
  Login hero heading               29 px Semi Bold
  Onboarding body                  18 px Regular
  Login body                       18 px Regular
  Dashboard primary time           29 px Medium
  Section title                15--16 px Medium / Semi Bold
  Card title                   14--15 px Medium / Semi Bold
  Body / supporting copy       12--14 px Regular / Medium
  Compact dashboard labels      9--11 px Medium / Semi Bold
  Micro labels                 7.5--9 px Medium / Bold
  Button label                   \~16 px Medium / Semi Bold
  Status bar                       17 px SF Pro Text Semibold

------------------------------------------------------------------------

# 4. Spacing System

The design primarily follows a compact 4/8-based spacing rhythm.

Recommended token mapping:

``` text
space-1  = 4 px
space-2  = 8 px
space-3  = 12 px
space-4  = 16 px
space-5  = 20 px
space-6  = 24 px
space-8  = 32 px
space-10 = 40 px
```

### Common spacing

-   Screen horizontal padding: **16 px**
-   Onboarding content inset: approximately **38 px**
-   Button left/right inset: **38 px**
-   Dashboard section gap: approximately **16 px**
-   Compact card internal spacing: 8--16 px
-   Bottom navigation inset: approximately **16 px**

------------------------------------------------------------------------

# 5. Shape & Radius System

  Component                                                 Radius
  ----------------------------- ----------------------------------
  Primary CTA button                                         10 px
  Login input fields                                         10 px
  Dashboard bottom navigation                                20 px
  Circular/avatar elements                                     50%
  Small status chips                                      8--10 px
  Dashboard cards                 Rounded / soft enterprise radius

The primary mobile button component is approximately **317 × 58 px**
with a **10 px radius**.

------------------------------------------------------------------------

# 6. Global Components

## 6.1 Primary Button

**Component:** `mobile-button`

Observed size:

-   Width: 317 px
-   Height: 58 px
-   Radius: 10 px
-   Position on onboarding/login: x = 38 px

Primary fill:

`#1E854E`

Typical labels:

-   `Next →`
-   `Get Started →`
-   Login action

Button text is centered horizontally and vertically.

------------------------------------------------------------------------

## 6.2 Mobile Header

The main authenticated screens use:

-   Hamburger menu: 24 × 24 px
-   User greeting block
-   Notification icon: 24 × 24 px
-   Notification badge
-   Circular profile/avatar area: approximately 40 × 40 px

Header starts below the 36 px status bar.

Observed positions:

-   Hamburger: x ≈ 16 px, y ≈ 54 px
-   User block: x ≈ 120 px, y ≈ 50 px
-   Notification: x ≈ 303 px, y ≈ 54 px
-   Avatar: x ≈ 337 px, y ≈ 46 px

------------------------------------------------------------------------

## 6.3 Bottom Navigation

**Component:** `mobile-tabs`

Observed:

-   Width: \~360--361 px
-   Height: 40 px
-   Horizontal margin: \~16--17 px
-   Green active color: `#2A9246`
-   Rounded / pill-like treatment

Navigation icon states represented in the file:

-   Home
-   Attendance
-   Leaves
-   Holiday
-   Profile

Active variants exist for:

-   Home
-   Attendance
-   Leaves
-   Holiday
-   Profile

------------------------------------------------------------------------

# 7. Screen Specifications

# 7.1 Splash Screen

**Frame:** `Splash`\
**Size:** 393 × 852 px

### Purpose

Initial app launch screen for Hare & Turtle HRMS.

### Visual structure

-   Full mobile viewport
-   Centered Hare & Turtle branding
-   Large brand illustration/logo area
-   Supporting tagline near the lower portion of the branding
-   Minimal presentation with no visible interaction

### Copy

`A better workplace together`

Typography:

-   Inter Light
-   20 px

### Behavior

Suggested flow:

``` text
App Launch
   ↓
Splash
   ↓
Onboarding / Login
```

------------------------------------------------------------------------

# 7.2 Onboarding --- Step 1

**Frame:** `Step-1`\
**Size:** 393 × 852 px

### Header

-   Skip action at top-right
-   x ≈ 346 px
-   y ≈ 48 px
-   Inter Regular 14 px

### Main heading

`Welcome to` `Hare & Turtle HRMS`

-   Inter Semi Bold
-   29 px
-   Black / brand treatment in the visual
-   x ≈ 38 px
-   y ≈ 176 px
-   Text box: 278 × 70 px

### Supporting copy

`A better workplace together`

-   Inter Regular
-   18 px
-   x ≈ 38 px
-   y ≈ 256 px

### Illustration

The design uses a large generated/raster onboarding illustration:

`ChatGPT Image Sep 11, 2026, 02_55_47 PM 1`

Observed image frame:

-   393 × 387 px
-   Positioned around y = 289 px
-   Uses the Hare & Turtle HRMS visual language.

### Pagination

Three pagination indicators are positioned above the CTA.

-   Active indicator: brand green
-   Inactive indicators: light neutral
-   Three dots total

### CTA

`Next →`

-   317 × 58 px
-   x = 38 px
-   y ≈ 744 px
-   Radius: 10 px
-   Fill: `#1E854E`

------------------------------------------------------------------------

# 7.3 Onboarding --- Step 2

**Frame:** `Step-2`\
**Size:** 393 × 852 px

### Heading

`Manage Your` `Work Life Easily`

-   Inter Semi Bold
-   29 px
-   x ≈ 38 px
-   y ≈ 90 px
-   Text box: 222 × 70 px

### Supporting copy

`Apply for leaves, check your attendance, manage timesheets and more - all in one place.`

-   Inter Regular
-   18 px
-   x ≈ 38 px
-   y ≈ 173 px
-   Text box: 318 × 88 px

### Top-right action

`Skip`

-   14 px
-   x ≈ 346 px
-   y ≈ 48 px

### Illustration

Same onboarding image asset family as Step 1, with the Step 2
composition/crop.

### Pagination

-   Step 2 indicator active
-   Three dots
-   Active dot uses `#2A9246`

### CTA

`Next →`

-   317 × 58 px
-   x = 38 px
-   y ≈ 744 px
-   Radius = 10 px
-   Fill = `#1E854E`

------------------------------------------------------------------------

# 7.4 Onboarding --- Step 3

**Frame:** `Step-3`\
**Size:** 393 × 852 px

### Heading

`Stay Informed` `Always`

-   Inter Semi Bold
-   29 px
-   x ≈ 38 px
-   y ≈ 90 px
-   Text box: 197 × 70 px

### Supporting copy

The Figma text node contains:

`Get important updates, team ann`

This appears to be a truncated text layer in the source design. The
intended sentence is visually consistent with:

`Get important updates, team announcements and notifications — so you never miss what matters.`

Use the exact Figma layer text if reproducing the current file; use the
expanded sentence only if correcting the source copy.

### Top-right action

`Skip`

-   14 px
-   x ≈ 346 px
-   y ≈ 48 px

### CTA

`Get Started →`

-   317 × 58 px
-   x = 38 px
-   y ≈ 744 px
-   Radius = 10 px
-   Fill = `#1E854E`

### Pagination

-   Step 3 active
-   Two inactive dots
-   Active color `#2A9246`

------------------------------------------------------------------------

# 7.5 Login

**Frame:** `Login`\
**Size:** 393 × 852 px

## Header

Brand/logo visual centered near the top.

### Heading

`Welcome Back`

-   Inter Semi Bold
-   29 px
-   x ≈ 93 px
-   y ≈ 176 px
-   207 × 35 px

### Description

`Sign in to your H&T HRMS account` `and keep moving forword.`

-   Inter Regular
-   18 px
-   x ≈ 47 px
-   y ≈ 224 px
-   300 × 44 px

> Note: `forword` is the exact spelling in the supplied Figma text
> layer. Consider changing it to `forward` in production.

## Input --- Employee ID / Email

-   Width: 317 px
-   Height: 58 px
-   x = 38 px
-   y ≈ 308 px
-   Radius: 10 px
-   Border/fill treatment: light neutral
-   Icon: Mail, 24 × 24 px
-   Label: `Employee ID / Email`
-   Label size: 16 px
-   Label weight: Regular

## Input --- Password

-   Width: 317 px
-   Height: 58 px
-   x = 38 px
-   y ≈ 379 px
-   Radius: 10 px
-   Icon: Mail/icon component in source
-   Label: `Password`
-   Label size: 16 px

## Forgot Password

`Forgot Password?`

-   Inter Medium
-   16 px
-   Brand green `#2A9246`
-   Right aligned around x ≈ 217 px
-   y ≈ 449 px

## Primary login CTA

-   317 × 58 px
-   x = 38 px
-   y ≈ 485 px
-   Radius: 10 px
-   Fill: `#1E854E`

## Divider

Centered divider around y ≈ 566 px.

Copy:

`Or`

-   Inter Medium
-   16 px

## Biometric authentication

`Use Biometrics`

-   Inter Medium
-   14 px
-   Fingerprint icon
-   Fingerprint visual area approximately 71 × 71 px
-   Group positioned around x ≈ 146 px, y ≈ 628 px

### Login interaction flow

``` text
Employee ID / Email
        ↓
Password
        ↓
Login
   ├── Success → Employee/Manager/Admin Dashboard
   ├── Forgot Password → Password recovery
   └── Use Biometrics → Biometric authentication
```

------------------------------------------------------------------------

# 7.6 Employee Dashboard

**Frame:** `Dashboard`\
**Size:** 393 × 852 px

The design contains two dashboard variants. The first is the standard
attendance/check-in state.

## Header

### Greeting

`Good Morning,`

-   Inter Regular
-   12 px

### User

`Ismail Akhtar`

-   Inter Semi Bold
-   14 px

### Workplace information

`Office`

-   Inter Medium
-   11 px

`DLF Cyber City, Gurugram`

-   Inter Medium
-   10 px

### Date

`Today`

-   11 px

`Thu, 11 Sep 2026`

-   10 px

### Notification

Notification icon with badge:

`1`

### Navigation

-   Hamburger
-   Notification
-   Avatar
-   Bottom tab navigation

------------------------------------------------------------------------

## Attendance Summary Card

### Main state

`Checked In`

-   16 px
-   Medium

`09:17 AM`

-   29 px
-   Medium

Status:

`Present`

-   16 px
-   Medium

Supporting status:

`Marked via Biometric`

-   11 px
-   Medium

------------------------------------------------------------------------

## Work / Break Summary

### Work

`7h 46m`

-   16 px
-   Semi Bold

`Works Hours`

-   14 px
-   Regular

### Break

`45m`

-   16 px
-   Semi Bold

`Break Hours`

-   14 px
-   Regular

> The source layer is named `Works Hours`; preserve or correct to
> `Work Hours` depending on product copy requirements.

------------------------------------------------------------------------

## Check-in / Check-out Action Card

Current information includes:

`Checked In`

`09:02 AM`

`Check Out`

The Check Out action is visually separated from the current check-in
information.

------------------------------------------------------------------------

## Leave Balance

The dashboard contains a compact donut/interactive leave breakdown.

Observed values:

  Leave        Balance
  ---------- ---------
  Earned            12
  Casual             3
  Sick               2
  Comp Off           1

### Leave CTA

`Apply Leave`

-   15 px
-   Semi Bold

------------------------------------------------------------------------

## Upcoming Leaves

The dashboard displays upcoming leave cards.

### Leave 1

-   `18 SEP`
-   `Casual Leave`
-   `Personal Work`

### Leave 2

-   `02 OCT`
-   `Earned Leave`
-   `Family Trip`

### Leave 3

-   `17 NOV`
-   `Comp Off`
-   `Long Weekend`

Date number:

-   16 px
-   Bold

Month:

-   11 px
-   Medium

Leave title:

-   14 px
-   Semi Bold

Description:

-   12 px
-   Regular

------------------------------------------------------------------------

## Actionable Tasks

Tasks represented:

### KRA Self Appraisal

`Due: 20 Sep 2026`

### Submit Training Feedback

`Due: 25 Sep 2026`

### Update Team Goals

`Due: 30 Sep 2026`

Task title:

-   14 px
-   Semi Bold

Due text:

-   12 px
-   Regular

------------------------------------------------------------------------

## Celebration Card

Title:

`Happy Birthday!`

-   15 px
-   Bold

Subtitle:

`It's your special day!`

-   13 px
-   Medium

------------------------------------------------------------------------

# 7.7 Employee Dashboard --- Location Attendance Variant

**Frame:** second `Dashboard` frame

This screen is visually identical to the employee dashboard but adds
location-based attendance information.

## Location attendance

Status:

`Marked via Location`

Additional card:

`Live Location Tracking`

State:

`ON`

Location:

`Within Allowed Area`

Last update:

`Last updated`

`09:24 AM`

Location:

`DLF Cyber City, Gurugram`

Action:

`View on Map`

Supporting status:

`Within Office Area`

### UX behavior

``` text
Check In
   ↓
Location validation
   ├── Within allowed area → Present / Location marked
   └── Outside allowed area → Location warning / restricted action
```

The UI explicitly communicates that location tracking is active and that
the employee is inside the allowed office area.

------------------------------------------------------------------------

# 7.8 Manager --- My Team

**Frame:** `Manager-My Team`\
**Size:** 393 × 852 px

This screen keeps the same global authenticated header.

### Header

-   Hamburger
-   User greeting
-   Notification badge
-   Avatar
-   Bottom navigation

### Greeting

`Good Morning,`

### User

`Ismail Akhtar`

------------------------------------------------------------------------

## Team Overview

The top statistics area contains:

  Metric           Value
  -------------- -------
  Team Members        24
  Present             17
  On Leave             3
  WFH                  2
  Absent               2

Compact labels use approximately 9 px typography.

Primary numbers use approximately 16 px Bold.

------------------------------------------------------------------------

## Leave / Attendance Summary

Observed compact card:

`Total`

`28`

`On Leave`

This uses a larger 19 px Semi Bold value.

------------------------------------------------------------------------

## People Tabs

Two tabs are represented:

-   `Birthdays`
-   `Work Anniversaries`

Selected tab uses the stronger/active treatment.

------------------------------------------------------------------------

## Team People

### Anurag Singh

Role:

`Software Developer`

Date:

`Today`

### Neha Arora

Role:

`UI/UX Designer`

Date:

`12 Sep`

### Aisha Khan

Role:

`QA Engineer`

Date:

`14 Sep`

Employee avatar images are 40 × 40 px.

------------------------------------------------------------------------

# 7.9 Admin Dashboard

**Frame:** `Admin-Dashboard`\
**Size:** 393 × 852 px

The admin dashboard is information dense and optimized for operational
overview.

## Top KPI cards

### Total Employees

`248`

`↑ 12%`

`vs last month`

### New Joinees

`8`

`This Month`

### On Leave Today

`28`

`11.3%`

### On WFH Today

`12`

`4.8%`

The KPI labels use approximately 9 px Medium text.

Primary numbers use approximately 14 px Bold.

Supporting labels use 8 px Regular.

------------------------------------------------------------------------

## Attendance Overview

Total:

`248`

`Employees`

Breakdown:

  Status       Count   Percentage
  ---------- ------- ------------
  Present        198        79.8%
  On Leave        28        11.3%
  WFH             12         4.8%
  Absent          10         4.0%

Section title:

`Attendance Trend`

-   Inter Bold
-   \~9.5 px

------------------------------------------------------------------------

## Leave Utilization

### Earned Leave (EL)

`124 / 208`

### Casual Leave (CL)

`56 / 80`

### Sick Leave (SL)

`32 / 60`

### Maternity Leave (ML)

`18 / 26`

### Paternity Leave (PL)

`10 / 20`

### Comp Off (CO)

`8 / 15`

The design uses small semantic icons/emojis beside each leave category.

------------------------------------------------------------------------

## Pending Requests

  Request            Count
  ---------------- -------
  Leave Requests        12
  Regularization         3
  WFH Requests           4
  Comp Off               2

------------------------------------------------------------------------

## Upcoming Holidays

### Gandhi Jayanti

Date:

`02 Oct`

Type:

`National Holiday`

### Diwali

Date:

`12 Nov`

Type:

`Restricted Holiday`

------------------------------------------------------------------------

## Admin Quick Actions

Four quick actions are represented:

-   `Add Employee`
-   `Manage Holidays`
-   `Leave Policy`
-   `Reports`

Labels:

-   Inter Bold
-   \~9.5 px

These should be implemented as compact icon + label action tiles.

------------------------------------------------------------------------

# 8. Iconography

The file uses a mixture of Iconstack-style icons and custom/vector
artwork.

Observed icon families include:

-   Hamburger Menu
-   Notification 03
-   Smart Home
-   Clock Hour 4
-   File Check
-   Profile
-   Mail
-   Fingerprint Light
-   Arrow Right

### Navigation icon states

The source contains component variants for:

-   Home
-   Attendance
-   Leaves
-   Holiday
-   Profile

and corresponding active states.

### Icon sizing

Common sizes:

-   Navigation icons: 24 × 24 px
-   Header icons: 24 × 24 px
-   Fingerprint: 56 × 56 px artwork area
-   Small status icons: 16--20 px

------------------------------------------------------------------------

# 9. Images & Assets

Embedded raster assets in the Figma file include:

-   Hare & Turtle onboarding illustration
-   Employee profile images
-   Manager/team profile images
-   Admin/user avatar imagery

The onboarding artwork is represented by the Figma image layer:

`ChatGPT Image Sep 11, 2026, 02_55_47 PM 1`

The supplied Figma archive also contains raster image assets at
approximately:

-   384 × 256 px
-   400 × 400 px
-   147 × 80 px
-   1536 × 1024 px
-   80 × 143 px

Use the original Figma assets rather than recreating the
photography/illustrations with placeholders.

------------------------------------------------------------------------

# 10. Component Inventory

## Navigation

-   `mobile-tabs`
-   `Menu List`
-   Hamburger menu
-   Notification
-   Avatar
-   Status bar
-   Home indicator

## Buttons

-   `mobile-button`
-   Apply Leave CTA
-   Check Out action
-   View on Map
-   Admin quick actions

## Forms

-   Employee ID / Email
-   Password
-   Forgot Password
-   Use Biometrics
-   Login CTA

## Cards

-   Attendance summary
-   Location tracking
-   Work/break summary
-   Leave balance
-   Upcoming leaves
-   Actionable tasks
-   Celebration
-   Team statistics
-   Birthday / anniversary list
-   Admin KPI
-   Attendance trend
-   Leave utilization
-   Pending requests
-   Holiday list

------------------------------------------------------------------------

# 11. Interaction Model

## Onboarding

``` text
Step 1
  ├── Next → Step 2
  └── Skip → Login

Step 2
  ├── Next → Step 3
  └── Skip → Login

Step 3
  └── Get Started → Login
```

## Authentication

``` text
Login
  ├── Employee ID / Email
  ├── Password
  ├── Forgot Password
  ├── Use Biometrics
  └── Login
```

## Employee

``` text
Dashboard
  ├── Check In / Check Out
  ├── Attendance
  ├── Leave balance
  ├── Apply Leave
  ├── Upcoming leaves
  ├── Tasks
  └── Celebrations
```

## Location attendance

``` text
Check In
  ↓
Location validation
  ↓
Allowed Area
  ↓
Mark attendance
  ↓
Live location tracking
```

## Manager

``` text
My Team
  ├── Team attendance summary
  ├── Birthdays
  ├── Work anniversaries
  └── Employee list
```

## Admin

``` text
Admin Dashboard
  ├── Employee KPIs
  ├── Attendance trend
  ├── Leave utilization
  ├── Pending requests
  ├── Holidays
  └── Quick actions
```

------------------------------------------------------------------------

# 12. Responsive Implementation Guidance

The source design is built around a 393 px mobile viewport.

For implementation:

-   Keep 16 px horizontal page padding for authenticated screens.
-   Keep 38 px horizontal padding for onboarding/login primary CTAs.
-   Make dashboard content vertically scrollable.
-   Keep bottom navigation fixed.
-   Preserve safe-area handling for status bar and home indicator.
-   Do not hard-code the 393 px width; use responsive width with a 16 px
    inset.
-   Preserve the 317 px CTA width only when the viewport matches the
    source frame; otherwise use `width: 100%` inside the 38 px
    horizontal inset.
-   Keep cards full available content width.
-   Maintain minimum 44 px interactive target size even when visual
    icons are smaller.
-   Keep typography sizes unchanged across standard mobile widths unless
    accessibility scaling is enabled.

------------------------------------------------------------------------

# 13. Accessibility Guidance

Recommended implementation requirements:

-   Maintain readable contrast for body and heading text.
-   Do not rely only on color to communicate attendance state.
-   Pair statuses with text such as `Present`, `On Leave`, `WFH`, and
    `Absent`.
-   Give all icons accessible labels.
-   Provide semantic labels for biometric authentication.
-   Make notification badges available to screen readers.
-   Ensure buttons have at least 44 × 44 px touch targets.
-   Support Dynamic Type / system font scaling where possible.
-   Avoid truncating important HR information.

------------------------------------------------------------------------

# 14. Content Notes From Source

The following strings are reproduced from the supplied Figma file:

-   `Welcome to Hare & Turtle HRMS`
-   `A better workplace together`
-   `Manage Your Work Life Easily`
-   `Apply for leaves, check your attendance, manage timesheets and more - all in one place.`
-   `Stay Informed Always`
-   `Get important updates, team ann`
-   `Welcome Back`
-   `Sign in to your H&T HRMS account and keep moving forword.`
-   `Employee ID / Email`
-   `Password`
-   `Forgot Password?`
-   `Use Biometrics`
-   `Checked In`
-   `Marked via Biometric`
-   `Marked via Location`
-   `Live Location Tracking`
-   `Within Allowed Area`
-   `View on Map`
-   `Apply Leave`
-   `KRA Self Appraisal`
-   `Submit Training Feedback`
-   `Update Team Goals`
-   `Happy Birthday!`

Potential copy issues to review before development:

1.  `forword` → likely intended to be `forward`.
2.  `Works Hours` → likely intended to be `Work Hours`.
3.  `Get important updates, team ann` appears truncated and should be
    restored before production.

------------------------------------------------------------------------

# 15. Design Tokens --- Developer Ready

``` css
:root {
  --color-primary: #2A9246;
  --color-primary-dark: #1E854E;
  --color-success: #16A34A;
  --color-success-light: #DCFCE7;

  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #64748B;
  --color-text-placeholder: #94A3B8;

  --color-white: #FFFFFF;
  --color-black: #000000;

  --color-border: #D9DFE5;
  --color-surface: #F8FAFC;
  --color-surface-subtle: #F1F5F9;

  --color-blue: #1D68ED;
  --color-orange: #FE7717;
  --color-yellow: #FACC15;
  --color-purple: #8B5CF6;
  --color-pink: #EC4899;
  --color-red: #E11D48;

  --font-family: "Inter", sans-serif;

  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 20px;
  --radius-pill: 50px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
}
```

------------------------------------------------------------------------

# 16. React Native / Expo Implementation Notes

Recommended component structure:

``` text
App
├── SplashScreen
├── Onboarding
│   ├── OnboardingStep1
│   ├── OnboardingStep2
│   └── OnboardingStep3
├── Auth
│   └── LoginScreen
├── Employee
│   ├── EmployeeDashboard
│   ├── Attendance
│   ├── Leaves
│   ├── Holidays
│   └── Profile
├── Manager
│   └── MyTeamScreen
└── Admin
    └── AdminDashboard
```

Reusable components:

``` text
PrimaryButton
MobileHeader
BottomTabs
NotificationBadge
Avatar
StatusCard
StatCard
AttendanceCard
LeaveBalanceCard
UpcomingLeaveCard
TaskCard
CelebrationCard
TeamMemberCard
KpiCard
QuickActionCard
Divider
```

------------------------------------------------------------------------

# 17. Source-of-Truth Summary

### Primary brand

`#2A9246`

### Primary CTA

`#1E854E`

### Primary font

`Inter`

### Mobile frame

`393 × 852`

### Standard content inset

`16 px`

### Onboarding/Login CTA inset

`38 px`

### CTA

`317 × 58 px`

### CTA radius

`10 px`

### Authenticated bottom navigation

`~361 × 40 px`

### Main product style

Clean, modern, green enterprise HRMS with:

-   Rounded cards
-   Compact dashboard statistics
-   Strong information hierarchy
-   Green semantic states
-   Icon-led navigation
-   Scrollable dashboard content
-   Role-based employee / manager / admin views
-   Attendance and location tracking
-   Leave management
-   HR operational dashboards
