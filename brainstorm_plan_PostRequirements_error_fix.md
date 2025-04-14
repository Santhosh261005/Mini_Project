# Information Gathered

- The frontend (`PostRequirements.js`) sends a POST request to `/api/admin/post` with a body containing `adminName` and `items`.
- The backend (`adminController.js`) expects the body to contain `adminName` and `requirements` (not `items`).
- The backend route `/api/admin/post` is protected by authentication and is correctly set up.
- The JWT token is being sent in the `Authorization` header as required.

# Plan

- [ ] Edit `frontend/src/pages/PostRequirements.js`:
  - Change the property name in the fetch request body from `items` to `requirements` to match the backend expectation.

# Dependent Files to be Edited

- Only `frontend/src/pages/PostRequirements.js` needs to be edited.

# Followup Steps

- Test the form submission to ensure requirements are posted successfully.
- If further errors occur, check for additional backend validation or authentication issues.
