const courses = [
  {
    id: 1,
    title: "Nodejs Course",
    author: "John Carter",
    topic: "javascript",
    url: "facebook.com",
  },
  {
    id: 2,
    title: "Rust Course",
    author: "John Carter",
    topic: "Rust",
    url: "facebook.com",
  },
  {
    id: 3,
    title: "Redux Course",
    author: "John Carter",
    topic: "React Redux",
    url: "facebook.com",
  },
];

export default {
  Query: {
    course: (p, arg) => {
      return arg.id ? courses.filter((e) => e.id === arg.id) : courses;
    },
  },
  Course: {
    title(parent, arg, context, info) {
      return parent.title;
    },
    url(parent) {
      return parent.url;
    },
    id(parent) {
      return parent.id;
    },
    topic(parent) {
      return parent.topic;
    },
    author(parent) {
      return parent.author;
    },
  },
};
