import React, { Component, PropTypes } from 'react';

export default class PrivacyOption extends Component {
  static propTypes = {
    tilte: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultChecked: true;
  }

  render() {
    const {
      title,
      copy,
      defaultChecked,
    }
    return (
      <div>
        <label>
          <h3>{copy}</h3>
          <span>
            <input
              type='checkbox'
            />
          </span>
        </label>
        <p>{copy}</p>
      </div>
    );
  }
}