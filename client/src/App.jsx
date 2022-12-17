import React from "react";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import { useEffect } from "react";
import { useState } from "react";

function App() {
    const [posts, setPosts] = useState([]);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data.posts))
            .catch((err) => console.log(`Error: ${err}.`));
    }, []);

    console.log(posts)
    return (
        <div className="App">
            <Navbar />
            <main>
                {posts.map((post) => (
                    <Post
                        key={post._id}
                        title={post.title}
                        text={post.text}
                        date={post.date}
                    />
                ))}
            </main>
        </div>
    );
}

export default App;
