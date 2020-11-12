function logout() {
  
    fetch("/api/tenant/logout", {
      method: "post",
      headers: { "Content-Type": "application/json" }
    })
      .then(function() {
        document.location.replace("/login");
      })
      .catch(err => console.log(err));
  }
  
  // document.querySelector("#logout-link").addEventListener("click", logout);