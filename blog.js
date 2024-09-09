document.addEventListener('DOMContentLoaded', function() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [
        {
            id: 1,
            title: "The Future of Smart Homes: 2024 Trends and Innovations",
            category: "Smart Home",
            content: "Explore the latest trends in smart home technology, from AI-powered assistants to energy-efficient systems that are reshaping our living spaces.",
            image: "https://miro.medium.com/v2/resize:fit:959/1*h8y67xEHh61OGsKaLlZcLA.jpeg"
        },
        {
            id: 2,
            title: "5 Ways Industrial IoT is Revolutionizing Manufacturing",
            category: "IoT Security",
            content: "Discover how Industrial IoT is transforming factories, improving efficiency, and enabling predictive maintenance in the manufacturing sector.",
            image: "https://iebmedia.com/wp-content/uploads/2022/01/Siemens-IIoT_in_der_Fabrik___Abb1.png"
        },
        {
            id: 3,
            title: "Securing the Internet of Things: Best Practices for IoT Security",
            category: "IoT Security",
            content: "Learn about the critical security challenges facing IoT devices and networks, and explore best practices to protect your connected ecosystem.",
            image: "https://www.laberit.com/wp-content/uploads/2022/04/iot-insight.jpg"
        },
        {
            id: 4,
            title: "The Rise of Connected Cars: What to Expect in 2024",
            category: "Connected Cars",
            content: "Connected cars are becoming more prevalent, offering advanced features like autonomous driving, real-time traffic updates, and enhanced safety measures.",
            image: "https://www.telecomreview.com/images/stories/2020/06/connected-and-autonomous-cars-balancing-morality-and-regulation-article.jpg"
        },
        {
            id: 5,
            title: "Edge Computing: The Future of Data Processing",
            category: "Edge Computing",
            content: "Edge computing is revolutionizing data processing by bringing computation and data storage closer to the location where it is needed, improving response times and saving bandwidth.",
            image: "https://www.networkcablingservices.com/wp-content/uploads/2021/11/edge-computing-graphic.jpg"
        }
    ];

    function displayPosts(category = null) {
        const blogPostsContainer = document.getElementById('blog-posts');
        blogPostsContainer.innerHTML = '';

        const filteredPosts = category ? posts.filter(post => post.category === category) : posts;

        filteredPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}">
                <div class="blog-post-content">
                    <div class="blog-post-category">${post.category}</div>
                    <h3>${post.title}</h3>
                    <p>${post.content.substring(0, 100)}...</p>
                </div>
            `;
            postElement.addEventListener('click', () => openModal(post));
            blogPostsContainer.appendChild(postElement);
        });
    }

    function openModal(post) {
        const modal = document.getElementById('blog-modal');
        document.getElementById('modal-image').src = post.image;
        document.getElementById('modal-title').innerText = post.title;
        document.getElementById('modal-category').innerText = post.category;
        document.getElementById('modal-content').innerText = post.content;
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('blog-modal');
        modal.style.display = 'none';
    }

    document.querySelector('.close-button').addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('blog-modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    function addNewPost(event) {
        event.preventDefault();
        const title = document.getElementById('blog-title').value;
        const category = document.getElementById('blog-category').value;
        const content = document.getElementById('blog-content').value;
        const imageInput = document.getElementById('blog-image');
        const image = URL.createObjectURL(imageInput.files[0]);

        const newPost = {
            id: posts.length + 1,
            title: title,
            category: category,
            content: content,
            image: image
        };

        posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
        document.getElementById('new-blog-form').reset();
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.getAttribute('data-category');
            displayPosts(category);
        });
    });

    displayPosts();

    document.getElementById('new-blog-form').addEventListener('submit', addNewPost);
});