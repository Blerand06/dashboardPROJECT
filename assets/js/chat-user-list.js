const getChatUserList = async () => {
  try {
    const res = await fetch('/userlist/get-userlist');
    const data = await res.json();
    if (data.status === 'success') {
      document.querySelector('.chat-list').innerHTML = '';
      let userList = data.data;

      for (let index = 0; index < userList.length; index++) {
        const div = document.createElement('div');
        div.className = 'first-body-1';

        const divContent = `
          <div class="profile-photo" style= "margin-top: 10px;">
            <img src="/img/avatar-1.jpeg" alt="Profile Photo" />
          </div>
          <div class="text">
            <div class="first-line">
              <h3>${userList[index].name}</h3>
              <span style= "opacity: 0.4;">${userList[index].email}</span>
            </div>
          </div>
        `;

        div.innerHTML = divContent;
        document.querySelector('.chat-list').appendChild(div);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

getChatUserList();
