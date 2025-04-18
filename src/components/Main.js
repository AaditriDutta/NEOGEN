import React from 'react'
import HeaderBanner from './HeaderBanner'
import CreatePosts from './CreatePosts'
import PostsListing from './PostsListing'

export default function Main() {
  return (
    <>
        <HeaderBanner />
        <CreatePosts />
        <PostsListing />
    </>
  )
}
