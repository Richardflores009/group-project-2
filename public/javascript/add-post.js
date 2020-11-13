// JAVASCRIPT FOR TENANTS POSTING A MAINTENANCE OR PET REQUEST

// Submit Maintenance Request
async function maintenanceSubmit(landlord_id, tenant_id) {
  
    const title = document.querySelector('#addTitle').value;
    const description = document.querySelector('#addBody').value;
    // const landlord_id = document.querySelector('input[name="landlord-id"]').value;
    // const tenant_id = document.querySelector('input[name="tenant-id"]').value
  
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        landlord_id,
        tenant_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/tenant');
      console.log("maintenance request submitted");
    } else {
      alert(response.statusText);
    }

};

// Submit Pet Request
async function petSubmit(landlord_id, tenant_id) {
  event.preventDefault();
  
    const description = document.querySelector('input[name="pet"]').value;
    const status = document.querySelector('input[name="status"]').value;
    
  
    const response = await fetch(`/api/pet`, {
      method: 'POST',
      body: JSON.stringify({
        status,
        description,
        landlord_id,
        tenant_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/tenant');
      console.log("pet update submitted");

    } else {
      alert(response.statusText);
     
    }

};

async function deletePost(id) {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE'
  });

  document.location.replace('/post');
};

async function deletePet(id) {
  await fetch(`/api/pet/${id}`, {
    method: 'DELETE'
  });

  document.location.replace('/pet');
};



// Event Listener for Pet Update Submit Button
// document.querySelector("#pet-submit-button").addEventListener("click", petSubmit);