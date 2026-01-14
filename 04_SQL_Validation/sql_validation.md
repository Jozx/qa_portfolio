# SQL Validation Scenarios

As a QA Engineer, I frequently use SQL to verify data integrity and validate that frontend actions are correctly reflected in the database. Below are common queries used for the **Vendor Management Portal**.

**Database:** PostgreSQL

---

## Scenario 1: Verify Vendor Status after Registration
**Goal:** Confirm that a newly registered vendor is set to 'PENDING' status and assigned to the correct region.

```sql
SELECT 
    v.vendor_id, 
    v.company_name, 
    v.tax_id, 
    s.status_name, 
    v.created_at
FROM vendors v
JOIN vendor_statuses s ON v.status_id = s.id
WHERE v.tax_id = '999-88-777';
```

**Expected Result:**
| vendor_id | company_name | tax_id | status_name |
| :--- | :--- | :--- | :--- |
| 1024 | Tech Corp LLC | 999-88-777 | PENDING |

---

## Scenario 2: Validate Contract Totals per Vendor
**Goal:** Ensure the "Total Contract Value" displayed on the dashboard matches the sum of individual active contracts in the DB.

```sql
SELECT 
    v.company_name, 
    COUNT(c.id) as active_contracts_count, 
    SUM(c.amount) as total_value
FROM vendors v
LEFT JOIN contracts c ON v.id = c.vendor_id
WHERE c.status = 'ACTIVE'
  AND v.company_name = 'Apex Solutions'
GROUP BY v.company_name;
```

---

## Scenario 3: Check for Orphaned Records (Data Integrity)
**Goal:** Identify any contract records that are linked to non-existent users (e.g. if a user was hard-deleted incorrectly).

```sql
SELECT c.id, c.contract_number, c.created_by_user_id
FROM contracts c
LEFT JOIN users u ON c.created_by_user_id = u.id
WHERE u.id IS NULL;
```
*Note: This query should return 0 rows. If rows are returned, report a high-priority bug regarding Referential Integrity.*
