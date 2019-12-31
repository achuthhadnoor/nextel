import App from 'next/app';
import Page from './../layouts/page'  

const crawlUpDomForAnchorTag = (node, e) => {
    if (!node) {
      return;
    } else if (node.nodeName === "A") {
      const href = node.getAttribute("href");
      if (href && !href.includes("#/") && isElectron()) {
        e.preventDefault();
        window.ipcRenderer.send("open-external-window", href);
      } else {
        return;
      }
    } else {
      // need to pass the click event down through the recursive calls so we can preventDefault if needed
      return crawlUpDomForAnchorTag(node.parentNode, e);
    }
  };
  
  if (isElectron()) {
    document.body.addEventListener("click", e => {
      crawlUpDomForAnchorTag(e.target, e);
    });
  }
  
class Mainapp extends App { 
    render() {
        const { Component } = this.props; 
        return (
            <Page>
                <Component/>
            </Page>
        );
    }
}

export default Mainapp;