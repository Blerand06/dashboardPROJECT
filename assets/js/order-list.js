const getOrders = async () => {
  try {
    const res = await fetch("/order/get-orders");
    const data = await res.json();
    if (data.status === "success") {
      document.querySelector("table tbody").innerHTML=''
      let Orders = data.data;
      for (let index = 0; index < Orders.length; index++) {
        const tr = document.createElement("tr");
        const trContent = `
                                <td>${index+1}</td>
                                <td>${Orders[index].name}</td>
                                <td>${Orders[index].paid}</td>
                                <td>${Orders[index].status}</td>

                                <td class="primary d-flex">
                                <a href="/update-order/${Orders[index]._id}">Edit</a>
                                /
                                <a style="cursor: pointer;" id="${Orders[index]._id}" delete="true">Delete</a>
                                </td>
                                `;
        tr.innerHTML = trContent;
        document.querySelector("table tbody").appendChild(tr);
      }
    }
  } catch (e) {
    console.error(e);
  }

  const deleteButtons = document.querySelectorAll('[delete="true"]')
  deleteButtons.forEach(element => {
    element.addEventListener('click', async(event)=>{
      const res = await fetch('/order/delete-orders', {
        method: "DELETE",
        body: JSON.stringify({
          id: event.target.id,
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
      const data = await res.json()

      if(data.status === "success"){
        getOrders()
      }
    })
  })
};

getOrders();
