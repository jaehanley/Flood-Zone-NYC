import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './style.css';
import { hideAd } from '../../actions/mapStatus';
import closeBtn from '../../assets/img/close-btn.svg';

class adSlot extends Component {
  static propTypes = {
    center: PropTypes.object,
    hideAd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { innerWidth } = window;
    let size = 'mobile';
    if (innerWidth >= 738) {
      size = 'tablet';
    }
    if (innerWidth >= 980) {
      size = 'desktop';
    }
    this.state = {
      size,
    };
  }

  componentDidMount() {
    const { googletag, ga, mixpanel } = window;
    if (googletag) {
      googletag.cmd.push(() => {
        const mapping = googletag.sizeMapping()
        .addSize([0, 0], [])
        .addSize([320, 50], [320, 50])
        .addSize([738, 90], [728, 90])
        .addSize([980, 90], [[970, 90], [728, 90]])
        .build();
        this.slot = googletag.defineSlot(
          '/179285848/floodzone_leaderboard',
          [[970, 90], [728, 90], [320, 50]],
          'div-gpt-ad-1480280944211-0'
        ).addService(
          googletag.pubads()
        ).defineSizeMapping(mapping);
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
        googletag.display('div-gpt-ad-1480280944211-0');
        if (ga) {
          ga('send', 'event', 'ad', 'load', 'ad fetched');
        }
        if (mixpanel) {
          mixpanel.track('ad loaded');
        }
      });
      window.addEventListener('resize', this.resizeAd.bind(this));
    }
  }

  componentWillUnmount() {
    const { googletag, ga, mixpanel } = window;
    if (googletag) {
      googletag.cmd.push(() => {
        googletag.destroySlots([this.slot]);
      });
      window.removeEventListener('resize', this.resizeAd);
    }
    if (ga) {
      ga('send', 'event', 'button', 'click', 'hide ad');
    }
    if (mixpanel) {
      mixpanel.track('closed ad');
    }
  }

  refreshAd() {
    const { googletag, ga, mixpanel } = window;
    const refreshFunc = () => {
      if (googletag) {
        googletag.cmd.push(() => {
          googletag.pubads().refresh([this.slot]);
          if (ga) {
            ga('send', 'event', 'ad', 'refresh', 'ad refreshed');
          }
          if (mixpanel) {
            mixpanel.track('ad refreshed');
          }
        });
      }
    };
    if ('hidden' in document) {
      if (!document.hidden) {
        refreshFunc();
      }
    } else {
      refreshFunc();
    }
  }

  resizeAd() {
    const { googletag, ga, mixpanel } = window;
    const { innerWidth } = window;
    const { size } = this.state;
    let currentSize = 'mobile';
    if (innerWidth >= 738) {
      currentSize = 'tablet';
    }
    if (innerWidth >= 980) {
      currentSize = 'desktop';
    }
    if (size !== currentSize) {
      this.refreshAd();
      if (googletag.pubads) {
        if (ga) {
          ga('send', 'event', 'ad', 'resize', 'ad resized');
        }
        if (mixpanel) {
          mixpanel.track('ad resized');
        }
      }
      this.setState({
        size: currentSize,
      });
    }
  }

  closeAd() {
    this.props.hideAd();
  }

  render() {
    return (
      <div className={style.adContainer} aria-level='1'>
        <div id='div-gpt-ad-1480280944211-0' />
        <div className={style.adLabel}>
          <b>Advertising</b>
          <button
            aria-label='Close Ad'
            style={{
              backgroundImage: `url(${closeBtn})`
            }}
            onClick={this.closeAd.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    center: state.mapStatus.center,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideAd: () => { dispatch(hideAd()); },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(adSlot);
