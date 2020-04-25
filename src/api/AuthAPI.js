async function userLogin(email, password) {
  const newState = {
    loginFailed: true,
    toDashboard: false,
    error: false
  }
  try {
    let response = await fetch('https://wilderness.42.us.org/auth/sign_in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        uid: email,
      })
    });
    let res = await response.text();
    if (response.status >= 200 && response.status < 300) {
      let accessToken = res;
      console.log(accessToken);
      localStorage.setItem('access_token', accessToken);
      newState.loginFailed = false
      newState.toDashboard = true
      return newState
    } else {
      let error = res;
      newState.loginFailed = true
      console.log(newState)
      throw error;
    }
    
  } catch (error) {
    newState.error = error
    newState.loginFailed = true
    console.log("error: " + error);
    return newState
  }
}

