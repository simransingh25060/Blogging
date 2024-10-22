let blog = [];
let editingBlogId = null;
const mystorage = JSON.parse(localStorage.getItem('mylocal'));
console.log("wdjwgjd",mystorage);
if(mystorage)
blogs.push(mystorage);

displayBlogs();

document.getElementById('blog-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    
    if (editingBlogId === null) {
     
        const newBlog = { id: Date.now(), title: title, content: content };
        blogs.push(newBlog);
        
        (localStorage.setItem('mylocal',JSON.stringify(blogs)));
        
        
    } else {
     
        const blog = blogs.find(b => b.id === editingBlogId);
        blog.title = title;
        blog.content = content;
        editingBlogId = null;
    }

    document.getElementById('blog-form').reset();
    displayBlogs();
});

function displayBlogs() {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = '';

    blogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog');
        blogDiv.innerHTML = `
            <div class="blog-title">${blog.title}</div>
            <div class="blog-content">${blog.content}</div>
            <div class="blog-actions">
                <button onclick="editBlog(${blog.id})">Edit</button>
                <button onclick="deleteBlog(${blog.id})">Delete</button>
            </div>
        `;
        blogList.appendChild(blogDiv);
    });
}

function editBlog(id) {
    const blog = blogs.find(b => b.id === id);
    document.getElementById('blog-title').value = blog.title;
    document.getElementById('blog-content').value = blog.content;
    editingBlogId = id;
}

function deleteBlog(id) {
    blogs = blogs.filter(blog => blog.id !== id);
    displayBlogs();
}
