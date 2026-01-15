# Manual Test Cases (TestRail Export Style)

**Project:** GovTech Vendor Management Portal  
**Test Suite:** Vendor Registration & Contract Search

---

## Section: Smoke Testing (Build Verification)

### [C101] Verify Login Page Loads
**Type:** Smoke | **Priority:** Critical | **Refs:** JIRA-101

**Preconditions:**
1. Browser is open (Chrome/Edge latest).
2. Internet connection is active.
3. No active session (Incognito mode recommended).

**Steps:**
| # | Step Description | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to the Portal URL (`https://qa.govtech-portal.local`). | URL loads successfully. |
| 2 | Observe the Login UI elements. | Company Logo, "Username" field, "Password" field, and "Login" button are visible. SSL Padlock is present. |

---

### [C102] Verify Dashboard Access (Admin)
**Type:** Smoke | **Priority:** Critical | **Refs:** requirements.md#AC1

**Preconditions:**
1. Login page is loaded.
2. Valid Admin credentials are available (`admin_user` / `********`).

**Steps:**
| # | Step Description | Expected Result |
| :--- | :--- | :--- |
| 1 | Enter valid Admin username and password. | Inputs are accepted. |
| 2 | Click the "Login" button. | User is redirected to `/dashboard`. |
| 3 | Verify the Header and Navigation menu. | "Welcome, Admin" is displayed. "Vendor Management" and "User Settings" menus are visible. |

---

## Section: Functional - Vendor Registration

### [C201] Create New Vendor - Happy Path
**Type:** Functional | **Priority:** High | **Refs:** STORY-205

**Preconditions:**
1. Logged in as `Procurement Officer`.
2. Tax ID to be used is NOT currently in the database (e.g., `999-00-NEW`).

**Steps:**
| # | Step Description | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to **Vendor Management > Register New**. | Vendor Registration Form loads. |
| 2 | Enter "Company Name": `Tech Innovations LLC`. | Field accepts text. |
| 3 | Enter "Tax ID": `999-00-NEW`. | Field accepts format. |
| 4 | Enter "Email": `contact@techinnovations.com` and "Phone": `+1-555-0199`. | Valid formats are accepted. |
| 5 | Click "Submit" button. | 1. Page redirects to Success confirmation.<br>2. Message "Vendor Registration Submitted Successfully" appears.<br>3. DB Status is `PENDING`. |

---

### [C202] Validate Duplicate Tax ID
**Type:** Functional | **Priority:** High | **Refs:** STORY-205

**Preconditions:**
1. Logged in as `Procurement Officer`.
2. Existing vendor "Legacy Corp" exists with Tax ID `123-456`.

**Steps:**
| # | Step Description | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to **Vendor Management > Register New**. | Form loads. |
| 2 | Enter "Company Name": `Duplicate Attempt Inc`. | - |
| 3 | Enter "Tax ID": `123-456` (Existing). | - |
| 4 | Fill remaining mandatory fields and Click "Submit". | **System MUST NOT create the record.**<br>Inline error displayed: *"Vendor with this Tax ID is already registered."* |

---

## Section: Functional - Contract Search

### [C305] Search by Vendor Name (Partial Match)
**Type:** Functional | **Priority:** High | **Refs:** STORY-310

**Preconditions:**
1. Logged in as `Contract Manager`.
2. Contracts exist for "Apex Solutions", "Apex Industries", and "Beta Corp".

**Steps:**
| # | Step Description | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to **Contracts > Search**. | Search filters appear. |
| 2 | In "Vendor Name", type `Apex`. | - |
| 3 | Click "Search" button. | 1. Results grid updates.<br>2. "Apex Solutions" and "Apex Industries" are listed.<br>3. "Beta Corp" is **NOT** listed. |
