import React, { Component, Suspense } from "react";

function fetchProfileData() {
  const userPromise = fetchUser();
  const postPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postPromise)
  };
}

function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

function fetchUser() {
  console.log("fetch user...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetch get user");
      resolve({
        name: "tim"
      });
    }, 1000);
  });
}

function fetchPosts() {
  console.log("fetch posts...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetch get posts");
      resolve([
        {
          id: 0,
          text: "I get by with a little help from my friends"
        },
        {
          id: 1,
          text: "I'd like to be under the sea in an octupus's garden"
        },
        {
          id: 2,
          text: "You got that sand all over your feet"
        }
      ]);
    }, 2000);
  });
}

const resources = fetchProfileData();

function ProfileDetails() {
  const user = resources.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeLine() {
  const posts = resources.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeLine />
      </Suspense>
    </Suspense>
  );
}
