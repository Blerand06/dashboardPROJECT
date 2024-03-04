const getUserList = async () => {
  try {
    const res = await fetch("/userlist/get-userlist");
    const data = await res.json();
    if (data.status === "success") {
      document.querySelector("table tbody").innerHTML=''
      let UserList = data.data;

      for (let index = 0; index < UserList.length; index++) {
        const tr = document.createElement("tr");
        const trContent = `
                            <td>${index+1}</td>
                            <td>${UserList[index].name}</td>
                            <td>${UserList[index].username}</td>
                            <td>${UserList[index].email}</td>
                            <td>${UserList[index].phone}</td>
                            <td>${UserList[index].education}</td>
                            <td>${UserList[index].address}</td>
                              
                              <td class="primary d-flex">
                              <a href="/update-user/${UserList[index]._id}">Edit</a>
                              /
                              <a style="cursor: pointer;" id="${UserList[index]._id}" delete="true">Delete</a>
                              </td>
                              `;
        tr.innerHTML = trContent;
        document.querySelector("table tbody").appendChild(tr);
      } 
    }
  } catch (error) {
    console.log(error);
  }
  const deleteButtons = document.querySelectorAll('[delete="true"]')
  deleteButtons.forEach(element=>{
    element.addEventListener('click',async(event)=>{
 const res = await fetch(`/userlist/users`, {
  method: "DELETE",
  body: JSON.stringify({
    id:event.target.id,
  }),
  headers: {
    "Content-Type": "application/json",
  },
})
const data = await res.json()

if(data.status  === 'success'){
  getUserList();
}
   })
  })
};

getUserList();

