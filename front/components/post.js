let posts;

let postComponentSkip = 0;

let noMorePosts = false;

// Get posts returns always 20 posts if there is ENOUGH posts
async function getPosts(skip){
  try {
    let posts = (await axios.get('/post'+(skip?'?skip='+skip:''))).data.list
    if(posts.length < 20){
      noMorePosts = true;
    }

    /** 
     * sorting by creation date 
     * so array would be compatible 
     * with prepend functionality
     * */ 
    posts = posts.sort((a,b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });

    posts.forEach(post => {
      appendPostComponentToMain(post);
    });

    return posts;
  } catch (error) {
    console.log(error);
  }
}

function appendPostComponentToMain(post){
  const postHTML = /*html*/`
    <div id="${post.id}" class="postComponent">
      <img src="/post/${post.id}" style="${post.filters}"/>
      <p class="creationDateAndUser">
        ${new Date(post.created_at).toLocaleDateString()}
        <b>by</b>
        ${post.user_id}
      </p>
    </div>
  `;
  const postElement = document.createElement('div');
  postElement.innerHTML = postHTML;
  document.getElementById('main').prepend(postElement);
}
