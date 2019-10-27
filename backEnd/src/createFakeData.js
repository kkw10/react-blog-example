import Post from './models/post';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map(i => ({
    title: `포스트 #${i}`,
    body: 
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit ut mi vehicula auctor. Pellentesque eros velit, tristique ut nibh vel, vehicula tincidunt purus. Praesent et interdum sapien. Cras bibendum scelerisque sapien, non placerat mauris porttitor ac. Praesent eget turpis vehicula, ornare tellus at, eleifend magna. Suspendisse pellentesque nulla vitae nisi viverra, fringilla posuere diam pharetra. Nulla non massa a nunc euismod imperdiet. Ut porta viverra finibus. Maecenas pharetra eleifend tellus, quis eleifend sem accumsan vel. Etiam ut eleifend turpis, in vestibulum mauris. Sed velit enim, aliquam et lectus nec, dignissim bibendum leo. Pellentesque ut diam id nibh pretium tempus rhoncus quis neque. Aliquam porttitor augue elit, ut sodales ex vestibulum aliquam. Maecenas magna metus, dignissim non libero nec, bibendum consectetur ante. Etiam placerat tempor purus, a iaculis justo tempor vel. Curabitur vitae lorem dictum, fringilla orci et, faucibus mauris.',
    tags: ['가짜', '데이터']
  }))

  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  })
}