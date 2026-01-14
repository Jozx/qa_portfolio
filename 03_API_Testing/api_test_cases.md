# API Test Cases & Examples

This document details specific API test scenarios included in the Postman Collection.

## Base URL: `https://qa-api.govtech-portal.local/v1`

---

## Endpoint: Create Vendor
**Method:** `POST`  
**URL:** `/vendors`

### Test Case 1: Successful Creation
*   **Description:** Create a valid vendor entry.
*   **Headers:** `Authorization: Bearer <valid_token>`, `Content-Type: application/json`
*   **Request Body:**
    ```json
    {
      "company_name": "Tech Corp LLC",
      "tax_id": "999-88-777",
      "contact_email": "admin@techcorp.com",
      "services": ["IT Consulting", "Cloud Hosting"]
    }
    ```
*   **Expected Response (201 Created):**
    ```json
    {
      "id": 1024,
      "message": "Vendor created successfully",
      "status": "PENDING"
    }
    ```
*   **Postman Assertions:**
    ```javascript
    pm.test("Status code is 201", function () {
        pm.response.to.have.status(201);
    });
    pm.test("Check Vendor ID presence", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData.id).to.not.be.null;
    });
    ```

### Test Case 2: Validation Failure (Missing Tax ID)
*   **Description:** Attempt to create vendor without Tax ID.
*   **Request Body:**
    ```json
    {
      "company_name": "Ghost Company",
      "contact_email": "ghost@company.com"
    }
    ```
*   **Expected Response (400 Bad Request):**
    ```json
    {
      "error": "Bad Request",
      "validation_errors": {
        "tax_id": "Field is required"
      }
    }
    ```

---

## Endpoint: Get Contract Details
**Method:** `GET`  
**URL:** `/contracts/{contract_id}`

### Test Case 3: Unauthorized Access
*   **Description:** Access contract without a valid token.
*   **Headers:** (No or Invalid Authorization header)
*   **Expected Response (401 Unauthorized):**
    ```json
    {
      "error": "Unauthorized",
      "message": "Authentication token is missing or invalid."
    }
    ```
*   **Postman Assertions:**
    ```javascript
    pm.test("Status code is 401", function () {
        pm.response.to.have.status(401);
    });
    ```
