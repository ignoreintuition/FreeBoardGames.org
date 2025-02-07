import * as React from 'react';
import { useCurrentGameTranslation } from 'infra/i18n';

import css from './PlayerZone.module.css';
import { Contract, Announcement, IPlayer } from '../types';
import * as util from '../util/misc';

export function PlayerZone(props: {
  contract: number;
  biddingEnded: boolean;
  roundEnded: boolean;
  player: IPlayer;
  playerName: string;
  active: boolean;
  leader: boolean;
  takersKnown: boolean;
  announcement: Announcement;
  positionIndex: number;
}) {
  const { translate } = useCurrentGameTranslation();
  const markActive = !props.roundEnded && props.active;

  function renderZoneContent() {
    const P = props.player;
    const bid = P.isTaker ? props.contract : P.bid;
    const playerBidStr = bid >= Contract.Pass ? `«${translate(util.getBidName(bid))}»` : '';
    let announceStr: string = null;
    if (props.announcement !== null && props.announcement >= Announcement.Win) {
      announceStr = translate(util.getAnnounceName(props.announcement, P.isTaker));
    }
    return (
      <div>
        <div className={css.bidStatus}>
          {announceStr !== null ? <div className={css.announce}>{announceStr}</div> : null}
          <div className={bid == Contract.Pass ? css.pass : ''}>{playerBidStr}</div>
        </div>
        <div className={css.statuses}>
          <div className={css.playerName}>{props.playerName}</div>
          {renderStatuses()}
        </div>
      </div>
    );
  }

  function renderStatuses() {
    let statuses = [
      <span key="score" className={css.score} title={translate('status_score')}>
        &#x1F4B0; {props.player.score}
      </span>,
    ];
    if (!props.roundEnded && props.player.isDealer) {
      statuses.push(
        <span key="dealer" title={translate('status_dealer')}>
          &#x25B6;&#xFE0F;
        </span>,
      );
    }
    if (props.player.bid == 0) {
      statuses.push(
        <span key="passing" title={translate('status_passing')}>
          &#x1F44E;
        </span>,
      );
    }
    if (props.player.bid > 0) {
      statuses.push(
        <span key="bidding" title={translate('status_bidding')}>
          &#x1F44D;
        </span>,
      );
    }
    if (props.biddingEnded) {
      if (props.player.isTaker) {
        statuses.push(
          <span key="taker" title={translate('status_taker')}>
            &#x2694;&#xFE0F;
          </span>,
        );
      } else if (props.takersKnown) {
        statuses.push(
          <span key="opponent" title={translate('status_opponent')}>
            &#x1F6E1;&#xFE0F;
          </span>,
        );
      }
      if (!props.roundEnded && props.leader) {
        statuses.push(
          <span key="leader" title={translate('status_leader')}>
            &#x1F6A9;
          </span>,
        );
      }
    }
    if (props.active) {
      statuses.push(
        <span key="active" title={translate('status_active')} className={css.active}>
          &#x1F4A1;
        </span>,
      );
    }
    return statuses;
  }

  return (
    <div
      className={[
        css.playerZone,
        markActive ? css.active : '',
        props.positionIndex == 0 ? css.thisPlayer : '',
        css.p4,
        css[`i${props.positionIndex + 1}`],
      ].join(' ')}
    >
      {renderZoneContent()}
    </div>
  );
}
