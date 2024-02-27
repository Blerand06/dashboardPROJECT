const getOrders = async () => {
  try {
    const res = await fetch("/order/get-orders");
    const data = await res.json();
    if (data.status === "success") {
      let Orders = data.data;
      // console.log(data.data[0]);
      for (let index = 0; index < Orders.length; index++) {
        const tr = document.createElement("tr");
        const trContent = `
                                <td>${Orders[index].order_number}</td>
                                <td>${Orders[index].name}</td>
                                <td>${Orders[index].paid}</td>
                                <td>${Orders[index].status}</td>
                                <td class="primary d-flex">
                                <a href="">Edit</a>
                                /
                                <a href="">Delete</a>
                                </td>
                                `;
        tr.innerHTML = trContent;
        document.querySelector("table tbody").appendChild(tr);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

getOrders();
