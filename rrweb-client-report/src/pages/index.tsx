import { history } from 'umi';
import pic from '../assets/yay.jpg';

const list = new Array(20).fill(1).map((_, index) => {
  return { src: pic, id: index }
});


export default function HomePage() {
  const handleClick = (item: any) => {
    // @ts-ignore
    const transition = document.createDocumentTransition();
    transition.start(() => {
      history.push(`/docs?id=${item.id}`)
    });
  };

  return (
    <div>
      {list.map((item: any) => {
        return (
          <div key={item.id} onClick={() => handleClick(item)}>
            <h2>Yay! Welcome to umi! {item.id}</h2>
            <p>
              <img src={item.src} width="388" />
            </p>
          </div>
        )
      })}
    </div>
  );
}
