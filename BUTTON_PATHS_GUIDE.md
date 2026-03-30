# Refund Management - Button Navigation Paths ✓

## All Buttons Working with Correct Paths

### REFUND MANAGEMENT DASHBOARD (/refund-management)

```
┌─────────────────────────────────────────────────────────────────┐
│  REFUND MANAGEMENT                                              │
│  Review and process refund requests                             │
│                                        [Export Report] [New...] │
└─────────────────────────────────────────────────────────────────┘
```

#### Header Buttons (Top Right)
```
1. "Export Report" Button
   └─ Action: Downloads CSV file
   └─ Path: Triggers download
   └─ Format: refund-report.csv

2. "New Refund Request" Button
   └─ Action: Navigate
   └─ Path: /refund-request
   └─ Component: RefundRequest.jsx
```

#### Stats Cards (5 Cards - Clickable Filter)
```
[All Requests: 8]  [Pending: 3]  [Approved: 2]  [Rejected: 1]  [Processed: 2]
└─ Click to filter table (active card shows green border)
```

#### Search & Action Bar
```
[Search input...........................] [Approve All Pending]
                                       └─ Action: Updates all pending to approved
                                       └─ Path: None (state update)
```

#### Table Action Buttons (per row)
```
Row: REF-2024-001 | Aarav Sharma | ... | Actions: [👁] [✓] [✕]

1. View Icon (👁)
   └─ Action: Navigate to details
   └─ Path: /refund-details/REF-2024-001
   └─ Component: RefundDetails.jsx
   └─ Dynamic ID: {refund.id}

2. Approve Button (✓) - Shows only if status = "Pending"
   └─ Action: Change status to "Approved"
   └─ Path: None (state update)
   └─ Updates: refund.status = "Approved"
   └─ Then: Approve button hides, Process button shows

3. Reject Button (✕) - Shows only if status = "Pending"
   └─ Action: Change status to "Rejected"
   └─ Path: None (state update)
   └─ Updates: refund.status = "Rejected"
   └─ Then: Both buttons hide

4. Process Button (⏱) - Shows only if status = "Approved"
   └─ Action: Change status to "Processed"
   └─ Path: None (state update)
   └─ Updates: refund.status = "Processed"
```

---

### REFUND REQUEST FORM (/refund-request)

```
┌─────────────────────────────────────────────────┐
│ ← Back to Dashboard                             │
│                                                 │
│ > Refund Requests                               │
│ > Submit a refund request for payment reversal  │
│                                                 │
│ [Form Fields]                                   │
│ [Invoice ID] [Required]                         │
│ [Student Name] [Required]                       │
│ [Payment Amount] [Required]                     │
│ [Reason for Refund] [Required]                  │
│ [Additional Notes]                              │
│                                                 │
│ Important Information Box                       │
│                                                 │
│ [Submit Refund Request] [Cancel]                │
└─────────────────────────────────────────────────┘
```

#### Back Button
```
"← Back to Dashboard"
└─ Action: Navigate
└─ Path: /refund-management
└─ Component: RefundManagement.jsx
```

#### Form Buttons (Bottom)
```
1. "Submit Refund Request" Button (Green)
   └─ Action: Validate form & navigate
   └─ Path: /refund-management
   └─ Validation: 
      • Invoice ID required
      • Student Name required
      • Amount required
      • Reason required
   └─ On Error: Alert message
   └─ On Success: Redirect to dashboard

2. "Cancel" Button (Gray)
   └─ Action: Navigate
   └─ Path: /refund-management
   └─ No validation or confirmation
```

---

### REFUND DETAILS (/refund-details/:id)

```
┌─────────────────────────────────────────────────────┐
│ ← Back to Dashboard                                 │
│                                                     │
│ > Refund Request Details                            │
│ > REF-2024-001                                      │
│                                                     │
│ STUDENT INFORMATION                                 │
│ Student Name: Aarav Sharma  | Invoice ID: INV-... │
│                                                     │
│ REFUND INFORMATION                                  │
│ Amount: ₹25,000        | Status: [Pending]         │
│ Reason: Duplicate...   | Requested Date: 2024-03-08│
│                                                     │
│ ADMIN NOTES                                         │
│ [Textarea for admin notes...]                       │
│                                                     │
│ [Close] [Reject] [Approve]                          │
└─────────────────────────────────────────────────────┘
```

#### Back Button
```
"← Back to Dashboard"
└─ Action: Navigate
└─ Path: /refund-management
└─ Component: RefundManagement.jsx
```

#### Footer Buttons (Conditional Display)

##### When Status = "Pending"
```
1. "Close" Button (Gray)
   └─ Action: Navigate
   └─ Path: /refund-management

2. "Reject" Button (Red)
   └─ Action: Change status to "Rejected"
   └─ Path: None (state update)
   └─ Updates: refund.status = "Rejected"
   └─ Then: Both Reject and Approve buttons hide

3. "Approve" Button (Green)
   └─ Action: Change status to "Approved"
   └─ Path: None (state update)
   └─ Updates: refund.status = "Approved"
   └─ Then: Buttons change to "Close" and "Mark as Processed"
```

##### When Status = "Approved"
```
1. "Close" Button (Gray)
   └─ Action: Navigate
   └─ Path: /refund-management

2. "Mark as Processed" Button (Blue)
   └─ Action: Change status to "Processed"
   └─ Path: None (state update)
   └─ Updates: refund.status = "Processed"
   └─ Then: Button hides (shows only when Approved)
```

---

## Complete Navigation Map

```
Dashboard (/)
    ↓
┌── Sidebar: Fees Management > Refund Management
│     ↓
│   Refund Management (/refund-management)
│     ├─ Button: New Refund Request → /refund-request
│     ├─ View Icon → /refund-details/:id
│     └─ Approve/Reject/Process → State updates
│
├── Refund Request (/refund-request)
│     ├─ Button: Submit → /refund-management
│     └─ Button: Cancel/Back → /refund-management
│
└── Refund Details (/refund-details/:id)
      ├─ Button: Close/Back → /refund-management
      └─ Buttons: Approve/Reject/Process → State updates
```

---

## Path Reference Table

| URL | Component File | Purpose | Import in App.jsx |
|-----|---|---|---|
| `/refund-management` | `RefundManagement.jsx` | Main dashboard | ✓ Done |
| `/refund-request` | `RefundRequest.jsx` | Submit new request | ✓ Done |
| `/refund-details/:id` | `RefundDetails.jsx` | View/edit details | ✓ Done |

---

## Action Types

### Navigation Actions (useNavigate)
- Navigate to new page
- Changes URL in browser
- Loads new component

### State Update Actions (useState)
- Update refund status (Approved/Rejected/Processed)
- Change in UI instantly
- URL doesn't change
- No page navigation

### Download Actions
- Export Report button
- Creates CSV file
- Triggers browser download

---

## Testing All Buttons

### Test Export Report
- Click "Export Report" button
- File "refund-report.csv" downloads
- Contains headers and all refund data

### Test New Refund Request
- Click "New Refund Request" button
- Navigate to `/refund-request`
- URL changes, form loads

### Test View Details (from dashboard)
- Click View icon (👁) on any row
- Navigate to `/refund-details/REF-2024-001` (or respective ID)
- URL changes, details modal loads

### Test Approve/Reject (from dashboard)
- Click Approve (✓) button on pending refund
- Status changes from "Pending" to "Approved" (green badge)
- "Process" button appears

### Test Approve/Reject (from details)
- Click "Approve" button on details page
- Status changes from "Pending" to "Approved"
- Button changes to "Mark as Processed"

### Test Submit Form
- Fill all form fields
- Click "Submit Refund Request"
- Validates required fields
- Redirects to `/refund-management`
- Form clears

### Test Cancel/Back Buttons
- All back/cancel buttons navigate to `/refund-management`
- No form submission
- No validation

---

**All buttons tested and working correctly! ✓**
