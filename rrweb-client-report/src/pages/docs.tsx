import { history } from 'umi';
import pic from '../assets/yay.jpg';

const DocsPage = () => {
  const handleBack = () => {
    // @ts-ignore
    const transition = document.createDocumentTransition();
    transition.start(() => {
      history.back();
    });
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <p>This is umi docs.</p>
        <div>
          <button onClick={handleBack}>back</button>
        </div>
        <img src={pic} width="388" />
      </div>
    </div>
  );
};

export default DocsPage;
