import React, { useState } from 'react';
import Layout from '../layout';
import Seo from '../components/seo';
import Post from '../models/post';
import CategoryPageHeader from '../components/category-page-header';
import PostTabs from '../components/post-tabs';
function CategoryTemplate({ pageContext }) {
  const { edges, categories, currentCategory } = pageContext;
  const [tabIndex, setTabIndex] = useState(Math.max(0, categories.indexOf(currentCategory)));
  const posts = edges.map(({node}) => new Post(node));
  const visible = categories[tabIndex] === 'All' ? posts : posts.filter(post => post.categories.includes(categories[tabIndex]));
  return <Layout><Seo title="Post" favicon="posts" /><CategoryPageHeader title={categories[tabIndex]} subtitle={`${visible.length} posts`} /><PostTabs tabIndex={tabIndex} onChange={(event,value) => setTabIndex(value)} tabs={categories} posts={posts} /></Layout>;
}
export default CategoryTemplate;
