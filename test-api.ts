const BASE_URL = "http://localhost:3005/api";

async function runTests() {
  console.log("Starting API Tests...");

  // Helper to print results
  const logResult = (
    name: string,
    status: number,
    data: any,
    expectedStatus: number = 200,
  ) => {
    const success =
      status === expectedStatus || (expectedStatus === 201 && status === 201);
    console.log(`\n[${success ? "PASS" : "FAIL"}] ${name}`);
    console.log(`Status: ${status}`);
    if (!success) {
      console.log("Response:", JSON.stringify(data, null, 2));
    } else {
      // truncate data if too long
      const dataStr = JSON.stringify(data);
      console.log(
        "Response:",
        dataStr.length > 100 ? dataStr.substring(0, 100) + "..." : dataStr,
      );
    }
    return { success, data };
  };

  try {
    // 1. Register
    const randomSuffix = Math.floor(Math.random() * 10000);
    const userPayload = {
      name: `Test User ${randomSuffix}`,
      email: `test${randomSuffix}@example.com`,
      password: "password123",
      role: "admin", // Changed from school_admin to admin based on User model
    };

    console.log("\n--- Auth ---");
    let res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPayload),
    });

    let text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error(
        "Failed to parse JSON. Response text:",
        text.substring(0, 500),
      );
      return; // Abort
    }

    logResult("Register", res.status, data, 201);

    // 2. Login
    res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userPayload.email,
        password: userPayload.password,
      }),
    });
    text = await res.text();
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error(
        "Failed to parse JSON Login. Response text:",
        text.substring(0, 500),
      );
      return;
    }
    const loginResult = logResult("Login", res.status, data, 200);

    const token = loginResult.data.token;
    if (!token) {
      console.error("No token received, aborting authenticated tests.");
      return;
    }
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // 3. Create School
    console.log("\n--- Schools ---");
    const schoolPayload = { name: `School ${randomSuffix}` };
    res = await fetch(`${BASE_URL}/schools`, {
      method: "POST",
      headers: authHeaders, // Now authenticated
      body: JSON.stringify(schoolPayload),
    });
    data = await res.json();
    const schoolResult = logResult("Create School", res.status, data, 201);
    const schoolId = schoolResult.data._id;

    // RE-LOGIN to get updated token with school ID
    console.log("\n--- Re-Login (to get school ID) ---");
    res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userPayload.email,
        password: userPayload.password,
      }),
    });
    text = await res.text();
    data = JSON.parse(text);
    const newToken = data.token;
    const newAuthHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${newToken}`,
    };
    logResult("Re-Login", res.status, data, 200);

    // 4. Get Schools
    res = await fetch(`${BASE_URL}/schools`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    data = await res.json();
    logResult("Get Schools", res.status, data, 200); // Wait, controller uses 201 for getSchool?

    // 5. Create Teacher
    console.log("\n--- Teachers ---");
    // Note: This is expected to fail based on code analysis (missing middleware)
    const teacherPayload = {
      name: `Teacher ${randomSuffix}`,
      email: `teacher${randomSuffix}@example.com`,
      password: "password123",
      subject: "Math",
      // school: schoolId // Code expects school in req.user, not body? But service takes it from object.
      // Controller: schoolId: req.user.school
    };

    res = await fetch(`${BASE_URL}/teacher`, {
      method: "POST",
      headers: newAuthHeaders,
      body: JSON.stringify(teacherPayload),
    });
    // It might return HTML if it crashes, so be careful parsing JSON
    try {
      data = await res.json();
    } catch (e) {
      data = { error: "Could not parse JSON response" };
    }
    logResult("Create Teacher (Expected to PASS)", res.status, data, 201);

    // 6. Get Teachers
    res = await fetch(`${BASE_URL}/teacher`, {
      method: "GET",
      headers: newAuthHeaders,
    });
    try {
      data = await res.json();
    } catch (e) {
      data = { error: "Could not parse JSON response" };
    }
    logResult("Get Teachers (Expected to PASS)", res.status, data, 201);

    // 7. Create Student
    console.log("\n--- Students ---");
    const studentPayload = {
      school: schoolId,
      class: "10A",
      rollNumber: 101 + randomSuffix,
      // user: taken from token
      // Also need name/email/password for the User creation inside student creation?
      // Wait, studentService.createStudent takes { ...req.body, user: req.user.userId }
      // Let's check student.service.ts
    };

    // We need to check student.service.ts to see what it expects.
    // Assuming it needs basic student info.

    res = await fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: newAuthHeaders,
      body: JSON.stringify(studentPayload),
    });
    data = await res.json();
    logResult("Create Student", res.status, data, 201);

    // 8. Get Students
    res = await fetch(`${BASE_URL}/students`, {
      method: "GET",
      headers: authHeaders,
    });
    data = await res.json();
    logResult("Get Students", res.status, data, 200);
  } catch (error) {
    console.error("Test execution failed:", error);
  }
}

// Wait a bit for server to start if we run them together, but we'll run server separately.
runTests();
