import React, { PureComponent, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import DashboardLayout from "../components/Layout/DashboardLayout"

class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);

class ContactPage extends PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Contact Page</title>
        </Helmet>

        <DashboardLayout>
          <div>
            Hello Contact Page
            <div><x-search>tinnt</x-search></div>
          </div>
        </DashboardLayout>
      </Fragment>
    )
  }
}

export default ContactPage
