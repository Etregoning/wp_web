// import _ from "lodash";
import ToFormData from "api/ToFormData.js"

const requestData = (pageSize, page, sorted, filtered) => {
  // You can retrieve your data however you want, in this case, we will just use some local data.
  const parkId = JSON.parse(localStorage.park_id)
  console.log(parkId)
  let url = ""
  if (parkId === 0) { url = 'https://wilderness.42.us.org/issues' }
  else { url = `https://wilderness.42.us.org/issues?parks=${parkId}` }
  console.log(url)
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  })
    .then((response) => {
      console.log(JSON.stringify(response))
      if (response.ok) return response.json();
      return Promise.reject(`APIfetchIssues...ok=${response.ok}, response=${JSON.stringify(response)}`);
    })
};

const requestUserList = (pageSize, page, sorted, filtered) => {
  // You can retrieve your data however you want, in this case, we will just use some local data.
  
  return fetch(`https://wilderness.42.us.org/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  })
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`APIfetchIssues...ok=${response.ok}, response=${JSON.stringify(response)}`);
    })
};

const requestArchivedData = (pageSize, page, sorted, filtered) => {
  const parkId = JSON.parse(localStorage.park_id)
  let url = ""
  if (parkId === 10) { url = 'https://wilderness.42.us.org/issues?status=archived' }
  else { url = `https://wilderness.42.us.org/issues?status=archived&issues?parks=${parkId}` }
  // You can retrieve your data however you want, in this case, we will just use some local data.
  return fetch(`https://wilderness.42.us.org/issues?parks=${parkId}?status=archived`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  })
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`APIfetchIssues...ok=${response.ok}, response=${JSON.stringify(response)}`);
    })
};

const requestArchive = (id) => {
  // const formdata = ToFormData.issue(issue);
  // console.log(`APIcreateIssue...newIssue=${JSON.stringify(issue)}`);
  // console.log(`APIcreateIssue...formdata=${JSON.stringify(formdata)}`);

  return fetch(`https://wilderness.42.us.org/issues/${id}`, {
      method: 'PATCH',
      body: "issue[status]=archived",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
  });
}

const requestDelete = (issue) => {
  return fetch(`https://wilderness.42.us.org/issues/${issue}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  })
  
  .then((response) => {
    if (response.ok) {
    
    // requestData()
    } else {
      alert("There  was a problem deleting the issue(s). Please try again.")
      return Promise.reject(`APIfetchIssues...ok=${response.ok}, response=${JSON.stringify(response)}`);
    }
  })    
}

const requestUrgencyUnset = (id) => {
  return fetch(`https://wilderness.42.us.org/issues/${id}`, {
    method: 'PATCH',
    body: "issue[status]=active", 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'   
    },
  })
  
  .then((response) => {
    if (!response.ok) {
    
      alert("There  w as a problem updating the issue(s). Please try again.")
      return Promise.reject(`APIfetchIssues...ok=${response.ok}, response=${JSON.stringify(response)}`);
    }
  })
}
const requestUrgencySet= (id, status) => {
  // status = status === "urgent" ? "normal" : "urgent"  
  return fetch(`https://wilderness.42.us.org/issues/${id}`, {
    method: 'PATCH',
    body: `issue[status]=${status}`, 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'   
    },
  })
  
  .then((response) => {
    if (!response.ok) {
    
      alert("There  w as a problem updating the issue(s). Please try again.")
      return Promise.reject(`APIfetchIssues...ok=${response.ok}, response=${JSON.stringify(response)}`);
    }
  })
}

export {
  requestData,
  requestDelete,
  requestArchive,
  requestUrgencyUnset,
  requestUrgencySet,
  requestArchivedData,
  requestUserList
}