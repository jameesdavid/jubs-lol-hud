import React from 'react';
import cx from 'classnames';
import Pick from './Pick';

import css from './style/index.module.scss';
import Ban from './Ban';

import blueTeamLogo from '../assets/logos/blue.png';
import redTeamLogo from '../assets/logos/red.png';

export default class Overlay extends React.Component {
	state = {
		currentAnimationState: css.TheAbsoluteVoid,
		openingAnimationPlayed: false,
	};

	playOpeningAnimation() {
		this.setState({ openingAnimationPlayed: true });
		setTimeout(() => {
			this.setState({ currentAnimationState: css.AnimationHidden });

			setTimeout(() => {
				this.setState({
					currentAnimationState:
						css.AnimationTimer + ' ' + css.AnimationBansPick,
				});

				setTimeout(() => {
					this.setState({
						currentAnimationState:
							css.AnimationBansPick + ' ' + css.AnimationBansPickOnly,
					});

					setTimeout(() => {
						this.setState({ currentAnimationState: css.AnimationPigs });
					}, 1000);
				}, 1450);
			}, 700);
		}, 500);
	}

	render() {
		const { state, config } = this.props;

		if (state.champSelectActive && !this.state.openingAnimationPlayed) {
			this.playOpeningAnimation();
		}

		if (!state.champSelectActive && this.state.openingAnimationPlayed) {
			this.setState({ openingAnimationPlayed: false });
			this.setState({ currentAnimationState: css.TheAbsoluteVoid });
		}

		// console.log('state', state);

		const renderBans = (teamState, side) => {
			// console.log(teamState);
			const list = teamState.bans.map((ban, idx) => (
				<Ban key={`ban-${idx}`} {...ban} side={side} />
			));
			// list.splice(3, 0, <div key="ban-spacer" className={css.Spacing} />);
			return <div className={cx(css.BansBox)}>{list}</div>;
		};

		const renderBansBar = (teamName, teamConfig, teamState) => {
			return (
				<div className={css.BansWrapper}>
					<div
						className={cx(css.Bans, {
							[css.WithScore]: config.frontend.scoreEnabled,
						})}
					>
						<div>{teamName === css.TeamRed && renderBans(teamState)}</div>
						<div>{teamName === css.TeamBlue && renderBans(teamState)}</div>
					</div>
				</div>
			);
		};

		const renderTeam = (teamName, teamConfig, teamState) => (
			<div className={cx(css.Team, teamName)}>
				<div className={cx(css.Picks)}>
					{teamState.picks.map((pick, idx) => (
						<Pick key={`pick-${idx}`} config={this.props.config} {...pick} />
					))}
				</div>
			</div>
		);

		return (
			<div
				className={cx(
					css.Overlay,
					css.Europe,
					this.state.currentAnimationState
				)}
				style={{
					'--color-red': config.frontend.redTeam.color,
					'--color-blue': config.frontend.blueTeam.color,
				}}
			>
				{Object.keys(state).length === 0 && (
					<div className={cx(css.infoBox)}>
						Not connected to backend service!
					</div>
				)}
				{Object.keys(state).length !== 0 && (
					<>
						<div className={cx(css.ChampSelect)}>
							{!state.leagueConnected && (
								<div></div>
								// <div className={cx(css.infoBox)}>Not connected to client!</div>
							)}
							<div className={cx(css.TopBar)}>
								<div className={cx(css.Bans, css.BansBlue)}>
									{renderBans(state.blueTeam, 'blue')}
								</div>
								<div className={cx(css.MiddleImage)}>
									<div className={cx(css.TeamContainerBlue)}>
										<div className={cx(css.TeamNameTop, css.TeamBlue)}>
											<span className={cx(css.TeamNameShort)}>{config.frontend.blueTeam.tag}</span>
											<span className={cx(css.TeamNameLong)}>{config.frontend.blueTeam.name}</span>
										</div>
										<div className={cx(css.BorderTop)}></div>
										<div className={cx(css.TeamLogoTop)}>
											<img src={blueTeamLogo} alt="" />
										</div>
										<div className={cx(css.TeamScoreTop)}>{config.frontend.blueTeam.score}</div>
									</div>

									<div className={cx(css.DetailMidTop)}></div>

									<div className={cx(css.TeamContainerRed)}>
										<div className={cx(css.TeamScoreTop)}>{config.frontend.redTeam.score}</div>
										<div className={cx(css.TeamLogoTop)}>
											<img src={redTeamLogo} alt="" />
										</div>
										<div className={cx(css.BorderTop)}></div>
										<div className={cx(css.TeamNameTop, css.TeamRed)}>
											<span className={cx(css.TeamNameShort)}>{config.frontend.redTeam.tag}</span>
											<span className={cx(css.TeamNameLong)}>{config.frontend.redTeam.name}</span>
										</div>
									</div>
								</div>
								<div className={cx(css.Bans, css.BansRed)}>
									{renderBans(state.redTeam, 'red')}
								</div>
							</div>
							<div className={cx(css.MiddleBox)}>
								{/* <div className={cx(css.Logo)}>
									<img src={logo} alt="" />
								</div> */}
								{/* <div className={cx(css.Patch)}>{state.state}</div> */}
								<div
									className={cx(css.Timer, {
										[`${css.Red} ${css.Blue}`]:
											!state.blueTeam.isActive && !state.redTeam.isActive,
										[css.Blue]: state.blueTeam.isActive,
										[css.Red]: state.redTeam.isActive,
									})}
								>
									<div className={cx(css.Background, css.Blue)} />
									<div className={cx(css.Background, css.Red)} />
									{state.timer < 100 && (
										<div className={cx(css.TimerChars)}>
											{state.timer
												.toString()
												.split('')
												.map((char, idx) => (
													<div key={`div-${idx}`} className={cx(css.TimerChar)}>
														{char}
													</div>
												))}
										</div>
									)}
									{state.timer >= 100 && (
										<div className={cx(css.TimerChars)}>{state.timer}</div>
									)}
								</div>
							</div>
							{renderTeam(css.TeamBlue, config.frontend.blueTeam, state.blueTeam)}
							{renderTeam(css.TeamRed, config.frontend.redTeam, state.redTeam)}
						</div>
					</>
				)}
			</div>
		);
	}
}
