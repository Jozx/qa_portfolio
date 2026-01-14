# Bug Reports (Jira Export Style)
Below are examples of defect reports formatted as standard Jira tickets.

---

## [BUG-1043] 500 Error when uploading Vendor Documents > 10MB

**Project:** GovTech Portal (GTP) | **Issue Type:** Bug | **Status:** Open | **Priority:** High
**Assignee:** Unassigned | **Reporter:** QA Engineer | **Affects Version/s:** v2.4.1

### Description
The system throws a generic "Internal Server Error" when a user attempts to upload a PDF file larger than 10MB in the "Compliance Documents" section.
According to the requirements (REQ-DOC-005), the system should support uploads up to **25MB**.

### Environment
*   **URL:** `https://qa.govtech-portal.local`
*   **Browser:** Chrome v119, Edge
*   **OS:** Windows 11 Enterprise
*   **Test Data:** `large_compliance_doc.pdf` (12MB)

### Steps to Reproduce
1. Log in as **Procurement Officer**.
2. Navigate to **Vendor Management > Register New**.
3. Fill in all mandatory text fields (Name, Tax ID, etc.).
4. Scroll to the "Compliance Attachments" section.
5. Upload a PDF file with specific size **12MB**.
6. Observe the UI response and Toast notification.

### Expected Result
*   The progress bar should reach 100%.
*   File should be successfully attached to the form.

### Actual Result
*   Upload fails immediately.
*   Error Toast appears: *"500 Internal Server Error"*.
*   No user-friendly message about size limits is shown.

### Attachments
*   `screenshot_error_toast.png` (Simulated)
*   `server_log_snippet.txt`

### Backend Log Analysis
```text
POST /api/uploads/v1/compliance 500 (Internal Server Error)
...
Java.lang.MaxUploadSizeExceededException: Maximum upload size of 10485760 bytes exceeded.
at org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException
```
*Root Cause Analysis:* The Tomcat server config `max-file-size` seems to be default (10MB) instead of the required 25MB.

---

## [BUG-1089] Contract Search returns "Active" records when filtering by "Expired"

**Project:** GovTech Portal (GTP) | **Issue Type:** Bug | **Status:** In Progress | **Priority:** Medium
**Assignee:** Dev Lead | **Reporter:** QA Engineer | **Fix Version/s:** v2.5.0

### Description
When using the "Status" filter in Contract Search, selecting **"Expired"** incorrectly returns contracts with **"Active"** status as well.

### Environment
*   **URL:** `https://qa.govtech-portal.local`
*   **Browser:** Firefox v115

### Steps to Reproduce
1. Navigate to **Contracts > Search**.
2. Click on "Advanced Filters".
3. In the "Status" dropdown, select **only** `Expired`.
4. Click the "Search" button.
5. Verify the "Status" column in the results grid.

### Expected Result
*   The results grid should ONLY display contracts where Status == 'Expired'.

### Actual Result
*   The results grid displays a mix of 'Expired' and 'Active' contracts.

### Notes
*   Tested with 'Pending' status, and it works correctly.
*   It seems like the 'Expired' value might be mapped incorrectly in the query parameters (`status=EXPIRED` vs `status=active,expired`).
