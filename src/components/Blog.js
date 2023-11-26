import React, {useEffect,useState} from 'react';

import classes from './Blog.module.scss';
import { Dot } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs,setBlogs] = useState([])

  const fetchBlogs = async () => {
    const res = await fetch('https://classy-ads-8216b-default-rtdb.firebaseio.com/blogs.json')
    const data = await res.json()
    setBlogs(Object.values(data)[0])
  }

  useEffect(() => {
    fetchBlogs()
  }, [])
  return (
    <div className={classes.blog}>
      <h1 className={classes.header}>Our Blog</h1>
      <p className={classes.headerp}>See Our Daily News & Updates</p>
      <div className={classes['blog-cards']}>
        {
          blogs.map(blog => {
            return (
              <div key={blogs.indexOf(blog)} className={classes.card}>
                <img src={blog.img} alt="blog" />
                <h1>{blog.title}</h1>
                <div className={classes.info}>
                  <p>by {blog.user}</p>
                  <Dot />
                  <p>{blog.date}</p>
                </div>
                <article>
                  {blog.news}
                </article>
              </div>
            )
          })
        }
      </div>
      <Link>View All Posts</Link>
    </div>
  );
};

export default Blog;
