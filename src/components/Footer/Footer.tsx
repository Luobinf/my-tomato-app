import React from 'react';
import './Footer.scss';

class Footer extends React.Component{
  render() {
    return (
      <footer>
        <div className='content'>
          <span>© 番茄时间</span>
          <span>联系作者</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
