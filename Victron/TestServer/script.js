async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        await handleToken();
      } else {
        alert('Invalid credentials. Please try again.');
      }
      
  }

  async function handleToken() {
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    // Check if the token is present
    if (storedToken) {
      try {
        // Make a request with the token in the headers
        const response = await fetch('http://localhost:3000/protected-route', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.log('Token not found in localStorage');
    }
  }
