const getUserList = async () => {
  try {
    const res = await fetch("/userlist/get-userlist");
    const data = await res.json();
    if (data.status === "success") {
      let UserList = data.data;

      for (let index = 0; index < UserList.length; index++) {
        const tr = document.createElement("tr");
        const trContent = `
                            <td>${UserList[index].order_number}</td>
                            <td>${UserList[index].name}</td>
                            <td>${UserList[index].username}</td>
                            <td>${UserList[index].email}</td>
                            <td>${UserList[index].phone}</td>
                            <td>${UserList[index].education}</td>
                            <td>${UserList[index].address}</td>
                              
                              <td class="primary d-flex">
                              <a href="/update-user">Edit</a>
                              /
                              <a href="/users">Delete</a>
                              </td>
                              `;
        tr.innerHTML = trContent;
        document.querySelector("table tbody").appendChild(tr);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getUserList();
