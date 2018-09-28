document.addEventListener('DOMContentLoaded', function() {

  const yourUUID = `08bb5b1f-01a7-407f-8121-d99af9a5420d`;
  let imageId = 887;

  const imageURL = `https://randopic.herokuapp.com/images/${yourUUID}`;
  
  

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  const image = document.getElementById('image');
  const name = document.getElementById('name');
  const likes = document.getElementById('likes');
  const comments = document.getElementById('comments');
  const likeBtn = document.getElementById('like_button');
  const commentForm = document.getElementById('comment_form');
  const commentInput = document.getElementById('comment_input');

  fetch(`${imageURL}`)
  .then(res => res.json())
  .then(data => {
    image.setAttribute('src', `${data.url}`)
    name.innerHTML = data.name;
    likes.innerText = data.like_count;
    data.comments.forEach(function(ele){
      comments.innerHTML = `<li>${ele.content}</li>`;

    });


  });

  likeBtn.addEventListener('click', function(){
    likes.innerText = parseInt(likes.innerText) +1;
    fetch(`${likeURL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id : `${imageId}`
      })
    })
    .then(res => res.json())
    

  

  });

  commentForm.addEventListener('submit', function(e){
    e.preventDefault();
    fetch(`${commentsURL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: `${imageId}`,
        content: commentInput.value
      })
    })
    .then(res => res.json())
    .then(data => {
     let li = document.createElement('li');
     li.innerText = commentInput.value;
      comments.append(li);
    });
  
  });


});

//commenting
