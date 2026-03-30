# Refund Management Module - CSS Styling Guide

## Design System Implementation

Based on your dashboard images, the following design has been implemented:

---

## Color Palette

### Primary Colors
```css
--primary-green: #22c55e;      /* Main accent, buttons, active states */
--dark-green: #16a34a;         /* Hover state for green buttons */
--light-green-bg: #eef7f3;     /* Page background */
--info-green-bg: #f0fdf4;      /* Info boxes, card backgrounds */
```

### Text Colors
```css
--text-primary: #1f2937;       /* Dark gray for headings/main text */
--text-secondary: #6b7280;     /* Medium gray for subtitles */
--text-light: #9ca3af;         /* Light gray for placeholders */
```

### Status Colors (Badges)
```css
--status-pending: #f59e0b;     /* Orange (#fef3c7 bg, #b45309 text) */
--status-approved: #22c55e;    /* Green (#dcfce7 bg, #166534 text) */
--status-rejected: #ef4444;    /* Red (#fee2e2 bg, #991b1b text) */
--status-processed: #3b82f6;   /* Blue (#e0e7ff bg, #3730a3 text) */
```

### Button Colors
```css
/* Primary (Green) */
background-color: #22c55e;     /* Normal */
background-color: #16a34a;     /* Hover */
box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);

/* Secondary (Gray) */
background-color: #f3f4f6;     /* Normal */
background-color: #e5e7eb;     /* Hover */
border: 1px solid #e5e7eb;

/* Danger (Red) */
background-color: #ef4444;     /* Normal */
background-color: #dc2626;     /* Hover */

/* Success (Blue) */
background-color: #10b981;     /* Normal */
background-color: #059669;     /* Hover */
```

---

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, sans-serif;
```

### Font Sizes
```css
/* Headings */
h1 Title: 28px, font-weight: 600
h2 Section: 24px, font-weight: 600
h3 Subtitle: 18px, font-weight: 600

/* Body Text */
Regular text: 14px, font-weight: 400
Labels: 12-14px, font-weight: 500/600
Emphasis: 14px, font-weight: 600
```

### Letter Spacing
```css
Section titles: letter-spacing: 0.5px;
Table headers: text-transform: uppercase;
```

---

## Layout & Spacing

### Page Layout
```css
.refund-management {
  padding: 24px;                    /* All sides */
  background-color: #eef7f3;        /* Light green */
  min-height: 100vh;
}
```

### Card Spacing
```css
Internal padding: 20px - 28px
Card to card gap: 16px - 28px
Margin bottom: 24px - 32px
```

### Component Gaps
```css
Form groups: gap: 20px;
Buttons row: gap: 12px;
Stats cards: gap: 16px;
```

---

## Card Styling

### Base Card Style
```css
background: white;
border-radius: 12px - 16px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
padding: 20px - 28px;
```

### Card Hover Effect
```css
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
```

### Stat Card Active State
```css
border: 2px solid #22c55e;
background-color: #f0fdf4;
```

---

## Buttons

### Button Base
```css
padding: 10px 16px;
border: none;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
cursor: pointer;
transition: all 0.3s ease;
```

### Button Primary (Green)
```css
background-color: #22c55e;
color: white;
box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2);

&:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}
```

### Small Action Buttons
```css
width: 32px;
height: 32px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 6px;

/* View Button */
background-color: #dbeafe;
color: #0369a1;

/* Approve Button */
background-color: #dcfce7;
color: #166534;

/* Reject Button */
background-color: #fee2e2;
color: #991b1b;
```

---

## Form Components

### Input Styling
```css
padding: 10px 12px;
border: 1px solid #ddd;
border-radius: 8px;
font-size: 14px;
font-family: inherit;

&:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

&::placeholder {
  color: #9ca3af;
}
```

### Select Dropdown
```css
appearance: none;
background-image: url("data:image/svg+xml...");  /* Custom arrow */
background-repeat: no-repeat;
background-position: right 10px center;
padding-right: 32px;
```

### Textarea
```css
resize: vertical;
min-height: 100px - 120px;
``

---

## Tables

### Table Header
```css
background-color: #f9fafb;
border-bottom: 1px solid #e5e7eb;
padding: 14px 16px;
font-weight: 600;
text-transform: uppercase;
```

### Table Row
```css
border-bottom: 1px solid #e5e7eb;

&:hover {
  background-color: #f9fafb;
}
```

### Table Cell
```css
padding: 14px 16px;
font-size: 14px;
text-align: left;
```

---

## Badges & Status

### Status Badge
```css
display: inline-block;
padding: 4px 12px;
border-radius: 999px;      /* Fully rounded */
font-size: 12px;
font-weight: 600;
text-align: center;
```

### Status Badge Colors
```css
/* Pending - Orange */
.status-pending {
  background-color: #fef3c7;
  color: #b45309;
}

/* Approved - Green */
.status-approved {
  background-color: #dcfce7;
  color: #166534;
}

/* Rejected - Red */
.status-rejected {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Processed - Blue */
.status-processed {
  background-color: #e0e7ff;
  color: #3730a3;
}
```

---

## Information Box

### Info Box Style
```css
background-color: #f0fdf4;
border-left: 4px solid #22c55e;
padding: 16px;
border-radius: 8px;
```

### Info List
```css
list-style: none;
padding: 0;
display: flex;
flex-direction: column;
gap: 8px;

li {
  font-size: 13px;
  color: #166534;
  padding-left: 16px;
  position: relative;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    font-weight: 600;
  }
}
```

---

## Theming

### Main Theme (Soft Green)
- Background: Soft light green (#eef7f3)
- Primary: Vibrant green (#22c55e)
- Cards: Clean white
- Text: Dark gray to light gray hierarchy

### Why This Theme?
- Professional and clean
- Calming soft green background
- Strong green accents for CTAs
- Good contrast for accessibility
- Matches modern admin dashboards
- Consistent with your images

---

## Responsive Design

### Desktop (>1200px)
- Full layout
- Stats cards: 5 columns
- Tables: Full width with all columns visible

### Tablet (≤1200px)
- Stats cards: 3 columns
- Some spacing adjustments

### Mobile (≤768px)
- Stats cards: 2 columns
- Buttons: Stack vertically (full width)
- Table: Scrollable horizontally
- Form: Full width, no max-width constraint
- Padding: 16px instead of 24px

### Mobile Table Optimization
```css
@media (max-width: 768px) {
  /* Optional: Hide less important columns */
  th:nth-child(n+5) {
    display: none;
  }
  
  /* Or: Make table scrollable */
  .table-container {
    overflow-x: auto;
  }
}
```

---

## CSS Classes Reference

### Refund Management Page
```
.refund-management           /* Main container */
.refund-header               /* Header section */
.header-buttons              /* Header button group */
.stats-cards                 /* Stats grid */
.stat-card                   /* Individual stat card */
.stat-card.active            /* Active stat card */
.search-action-bar           /* Search + action section */
.search-input                /* Search field */
.table-container             /* Table wrapper */
.refund-table                /* Table element */
.request-id                  /* Request ID column */
.status-badge                /* Status badge */
.action-buttons              /* Actions group */
.action-btn                  /* Individual action button */
```

### Refund Request Page
```
.refund-request-page         /* Main container */
.form-card                   /* Form wrapper */
.form-title                  /* Form heading */
.form-group                  /* Form field group */
.form-label                  /* Field label */
.form-input                  /* Input/textarea/select */
.amount-input-wrapper        /* Amount input with prefix */
.currency-prefix             /* ₹ symbol */
.info-box                    /* Information box */
.info-list                   /* Info checklist */
```

### Refund Details Page
```
.refund-details-page         /* Main container */
.details-card                /* Details wrapper */
.details-title-section       /* Header with ID */
.details-content             /* Content sections */
.info-section                /* Information section */
.section-title               /* Section heading */
.info-grid                   /* Info items grid */
.info-item                   /* Individual info item */
.notes-textarea              /* Admin notes field */
.details-footer              /* Button footer */
```

---

## Animation & Transitions

### Standard Transition
```css
transition: all 0.3s ease;
```

### Button Hover
```css
transform: translateY(-2px);           /* Slight lift */
box-shadow: 0 4px 12px rgba...;        /* Enhanced shadow */
background-color: darker_shade;
```

### Input Focus
```css
border-color: #22c55e;
box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
```

---

## Box Shadows

### Light Shadow (Cards)
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
```

### Medium Shadow (Hover)
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
```

### Colored Shadow (Button Hover)
```css
box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);  /* Green */
box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);  /* Red */
```

---

## Browser Support

- Modern Chrome/Edge/Firefox (ES6+)
- Safari 12+
- Mobile browsers (iOS Safari, Chrome Android)
- No vendor prefixes required (auto-prefixed by PostCSS)

---

## CSS File Organization

```
RefundManagement.css    (~350 lines)
  - Page layout
  - Header
  - Stats cards
  - Search & action bar
  - Table styling
  - Status badges
  - Action buttons

RefundRequest.css       (~200 lines)
  - Page layout
  - Form card
  - Form groups & inputs
  - Info box
  - Buttons

RefundDetails.css       (~200 lines)
  - Page layout
  - Details card
  - Info sections
  - Notes textarea
  - Footer buttons
```

---

## No External Dependencies

✓ Pure CSS (no preprocessor needed)
✓ No Tailwind classes
✓ No UI library CSS
✓ No font imports (system fonts only)
✓ Works in all modern browsers
✓ Fully responsive with media queries
✓ All colors hand-picked to match design

---

**CSS Implementation Complete and Matching Dashboard Images! ✓**
