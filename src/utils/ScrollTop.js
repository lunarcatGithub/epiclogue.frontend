import React, {useEffect} from 'react'
import { withRouter } from 'react-router-dom';

const ScrollTop = (props) => {
  
    useEffect(() => {

        if (props.history.action === 'POP') {
            return;
          }
          
          let hash = props.location.hash;

          if (hash) {
            let element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({block: 'start', behavior: 'smooth'});
            }
          } else {
            window.scrollTo(0, 0);
          }
      });

    return <React.Fragment />
}


export default withRouter(ScrollTop);