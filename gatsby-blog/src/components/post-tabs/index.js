import React, { useMemo, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import PostCardColumn from '../post-card-column';
import './style.scss';
function PostTabs({ tabIndex, onChange, tabs, posts, showMoreButton, showCounts = false }) {
  const [order, setOrder] = useState('newest');
  const tabPosts = useMemo(() => {
    const filtered = tabs[tabIndex] === 'All' ? posts : posts.filter(post => post.categories.includes(tabs[tabIndex]));
    return [...filtered].sort((a,b) => {
      const first = Date.parse(a.date), second = Date.parse(b.date);
      if (!Number.isFinite(first)) return Number.isFinite(second) ? 1 : 0;
      if (!Number.isFinite(second)) return -1;
      return order === 'oldest' ? first-second : second-first;
    });
  }, [posts,tabs,tabIndex,order]);
  return <div className="post-tabs-wrapper">
    <div className="post-tabs"><Tabs className="mui-tabs" value={tabIndex} onChange={onChange} variant="scrollable" scrollButtons="auto" aria-label="글 카테고리">
      {tabs.map(title => <Tab key={title} label={showCounts ? `${title} (${title === 'All' ? posts.length : posts.filter(post => post.categories.includes(title)).length})` : title} />)}
    </Tabs></div>
    <div className="post-order"><label htmlFor="post-sort">정렬</label><select id="post-sort" value={order} onChange={event => setOrder(event.target.value)}><option value="newest">최신순</option><option value="oldest">오래된순</option></select></div>
    {tabPosts.length === 0 ? <p className="empty-posts">아직 작성한 글이 없습니다.</p> : <PostCardColumn posts={showMoreButton ? tabPosts.slice(0,4) : tabPosts} showMoreButton={showMoreButton && tabPosts.length > 4} moreUrl="/posts/" />}
  </div>;
}
export default PostTabs;
