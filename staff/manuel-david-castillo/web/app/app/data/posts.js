/* Post */
const posts = [];
posts.count = 0;

posts.push({
  id: ++posts.count,
  userId: 4,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/0/04/Labrador_Retriever_%281210559%29.jpg",
  text: "Hello, it is my dog Milka",
});

posts.push({
  id: ++posts.count,
  userId: 3,
  image:
    "https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg",
  text: "Hello, here is my beautiful dog Ferd",
});

posts.push({
  id: ++posts.count,
  userId: 2,
  image:
    "https://images.unsplash.com/photo-1582456891925-a53965520520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  text: "Hello, I am Pepa the Peter´s dog",
});

posts.push({
  id: ++posts.count,
  userId: 1,
  image:
    "https://media.istockphoto.com/id/185094249/photo/little-fat-pug-sitting-on-sidewalk-in-summer-park.jpg?s=612x612&w=0&k=20&c=vfvypCBLX7OrPFEM58QLGBd9cuhTEN0SET55z3P31Wo=",
  text: "It is my plump friend Chop",
});