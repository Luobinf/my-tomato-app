import React from 'react';
import './Footer.scss';
import {GithubOutlined} from '@ant-design/icons/lib';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className='content'>
         <div>
           <span>© 番茄时间</span>
         </div>
          <div>
            <span>联系作者</span>
            <a href="https://github.com/Luobinf" target="_blank">
              <GithubOutlined className="github"/>
            </a>
            <a href="https://juejin.im/user/5cf0beea5188255818782013/posts" target="_blank">
              <svg className="icon juejin" aria-hidden="true">
                <use xlinkHref="#icon-juejin"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
