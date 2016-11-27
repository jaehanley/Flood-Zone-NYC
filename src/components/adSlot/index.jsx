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
        this.refreshAd();
        if (ga) {
          ga('send', 'event', 'ad', 'load', 'ad fetched');
        }
        if (mixpanel) {
          mixpanel.track('ad loaded');
        }
      });
    }
  }

  componentWillUnmount() {
    const { googletag, ga, mixpanel } = window;
    if (googletag) {
      googletag.cmd.push(() => {
        googletag.destroySlots([this.slot]);
      });
      clearInterval(this.refreshAd);
    }
    if (ga) {
      ga('send', 'event', 'button', 'click', 'hide ad');
    }
    if (mixpanel) {
      mixpanel.track('closed ad');
    }
  }

  refreshAd() {
    setInterval(() => {
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
    }, 60000);
  }

  closeAd() {
    this.props.hideAd();
  }

  render() {
    return (
      <div className={style.adContainer}>
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
