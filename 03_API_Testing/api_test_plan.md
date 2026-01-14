# API Test Plan

**Component:** Backend API Services (Vendor & Contract Modules)  
**Tools:** Postman, Newman (for CI/CD), Swagger UI

## 1. Objective
Validate the integrity, performance, and security of the RESTful API endpoints used by the Vendor Management Portal. Ensure that the API handles invalid data gracefully and strictly enforces role-based access control (RBAC).

## 2. Test Approach
*   **Method:** Black-box testing using Postman.
*   **Environment:** QA Environment (`https://qa-api.govtech-portal.local`).
*   **Auth Mechanism:** Bearer Token (JWT).

## 3. Scope of Testing

### 3.1 Positive Testing (Happy Path)
*   **POST /vendors**: Verify successful vendor creation with valid payload.
*   **GET /contracts/{id}**: Verify retrieval of correct contract details.
*   **PUT /vendors/{id}/status**: Verify status update flow (e.g., Pending -> Approved).

### 3.2 Negative Testing
*   **Invalid Payloads**: Missing mandatory fields, incorrect data types (string instead of int).
*   **Unauthorized Access**: Accessing Admin endpoints as a Read-Only user (403 Forbidden).
*   **Resource Not Found**: Requesting non-existent IDs (404 Not Found).

### 3.3 Security Testing
*   Verify no sensitive data (passwords, PII) is returned in API responses.
*   Verify rate limiting (basic check).

## 4. Entry & Exit Criteria
*   **Entry:** API Spec (Swagger) is frozen; Environment is deployed.
*   **Exit:** Critical P0/P1 bugs resolved; 95% pass rate on regression suite.
