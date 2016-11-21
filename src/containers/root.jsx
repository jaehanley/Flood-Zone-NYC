import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import InputForm from '../components/inputForm';
import Map from '../components/map';
import style from './style.css';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div className={style.container}>
          <Map />
          <InputForm />
        </div>
      </Provider>
    );
  }
}
