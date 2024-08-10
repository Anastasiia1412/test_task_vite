# Integration with PipeDrive CRM

This repository contains a project for implementing integration with the PipeDrive CRM system.

### Technologies Used

1. JS/HTML/CSS
2. VITE
3. REST API
4. GitHub CI/CD (cloud pages + deploy)

### Documentation

1. Official REST API documentation: [PipeDrive API Documentation](https://developers.pipedrive.com/docs/api/v1)

### Solution Overview

The solution is built on the official PipeDrive library for JS: [PipeDrive Node.js Client](https://github.com/pipedrive/client-nodejs)

### Key Advantages of the Solution

1. **Data Consistency**: This solution ensures data consistency by retrieving Job Type/Job Source from the CRM (master system). The provided video did not explicitly address this issue, so I preferred to ensure proper data consistency by dynamically loading the list of allowed custom fields.
2. **Deal Creation**: A Deal is created immediately along with the associated Person. This reveals the full potential of using the CRM while maintaining data consistency. The provided task does not clarify whether a person is created as a separate object or not.
3. **Automatic Deployment**: This solution is automatically built and deployed through GitHub pages, providing a convenient way to work with the application without the need to build anything locally. Additionally, secure storage of secret keys is ensured using GitHub secrets and VITE: [Vite Environment and Mode Guide](https://vitejs.dev/guide/env-and-mode)

### Note

For local building and running, you need to create a `.env` file in the root of the project and set the value of your API key using the environment variable:

```
VITE_PIPEDRIVE_API_KEY = "YOUR API KEY"
```

### Issues Identified

1. **Composite Custom Fields**: Due to the specifics of the implementation, additional keys are added for composite fields (such as time and timezone_id). When trying to create a composite key, I receive an error from the server indicating that the key was not created correctly. This prevented further implementation of composite custom fields (such as time, location, etc.).

### Potential Improvements

1. Implement a popup window with a link to the created Deal.
2. Add integration with Google Maps.
3. Implement fetching of Person for the ability to link to an existing object (without the need to create a new one).
