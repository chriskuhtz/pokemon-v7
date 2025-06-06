import { useCallback, useContext, useMemo, useState } from 'react';
import { getPlayerId } from '../../../functions/getPlayerId';
import { OPPO_ID } from '../../../functions/makeChallengerPokemon';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../interfaces/Weather';
import { BattleFieldEffect } from '../BattleField';

export const useBattleFieldEffects = (
	onFieldOpponents: BattlePokemon[],
	onFieldTeam: BattlePokemon[],
	battleWeather: WeatherType | undefined
) => {
	const { addMessage } = useContext(MessageQueueContext);
	const [bf, setBattleFieldEffects] = useState<BattleFieldEffect[]>([]);

	const addBattleFieldEffect = (x: BattleFieldEffect) => {
		if (bf.some((b) => b.type === x.type && b.ownerId === x.ownerId)) {
			addMessage({ message: `${x.type} is already in effect for this side` });
			return;
		}
		setBattleFieldEffects([...bf, x]);
	};
	const reduceBattleFieldEffectDurations = useCallback(
		() =>
			setBattleFieldEffects((effects) =>
				effects
					.map((e) => {
						if (e.type === 'aurora-veil' && battleWeather !== 'hail') {
							addMessage({ message: `${e.type} ended` });
							return undefined;
						}
						if (e.duration === 1) {
							addMessage({ message: `${e.type} ended` });
							return undefined;
						} else return { ...e, duration: e.duration - 1 };
					})
					.filter((e) => e !== undefined)
			),
		[addMessage, battleWeather]
	);

	const removeSpikes = useCallback((ownerId: string) => {
		setBattleFieldEffects((bf) =>
			bf.filter((effect) => {
				if (effect.ownerId !== ownerId && effect.type == 'spikes') {
					return false;
				}

				if (effect.ownerId !== ownerId && effect.type == 'toxic-spikes') {
					return false;
				}
				if (effect.ownerId !== ownerId && effect.type == 'sticky-web') {
					return false;
				}
				if (effect.ownerId !== ownerId && effect.type == 'stealth-rock') {
					return false;
				}

				return true;
			})
		);
	}, []);
	const removeScreens = useCallback((ownerId: string) => {
		setBattleFieldEffects((bf) =>
			bf.filter(
				(effect) =>
					effect.ownerId !== ownerId ||
					!['light-screen', 'reflect'].includes(effect.type)
			)
		);
	}, []);

	const battleFieldEffects = useMemo(() => {
		const res = [...bf];
		if (onFieldOpponents.some((p) => p.ability === 'pressure')) {
			res.push({ type: 'pressure', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'pressure')) {
			res.push({ type: 'pressure', ownerId: getPlayerId(), duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'plus')) {
			res.push({ type: 'plus', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'plus')) {
			res.push({ type: 'plus', ownerId: getPlayerId(), duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'minus')) {
			res.push({ type: 'minus', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'minus')) {
			res.push({ type: 'minus', ownerId: getPlayerId(), duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'shadow-tag')) {
			res.push({ type: 'shadow-tag', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'shadow-tag')) {
			res.push({ type: 'shadow-tag', ownerId: getPlayerId(), duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'magnet-pull')) {
			res.push({ type: 'magnet-pull', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'magnet-pull')) {
			res.push({ type: 'magnet-pull', ownerId: getPlayerId(), duration: 9000 });
		}
		if (
			onFieldOpponents.some(
				(p) => p.ability === 'flower-gift' && battleWeather === 'sun'
			)
		) {
			res.push({ type: 'flower-gift', ownerId: OPPO_ID, duration: 9000 });
		}
		if (
			onFieldTeam.some(
				(p) => p.ability === 'flower-gift' && battleWeather === 'sun'
			)
		) {
			res.push({ type: 'flower-gift', ownerId: getPlayerId(), duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'bad-dreams')) {
			res.push({ type: 'bad-dreams', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'bad-dreams')) {
			res.push({ type: 'bad-dreams', ownerId: getPlayerId(), duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'battery')) {
			res.push({ type: 'battery', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'battery')) {
			res.push({ type: 'battery', ownerId: getPlayerId(), duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'unnerve')) {
			res.push({ type: 'unnerve', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'unnerve')) {
			res.push({ type: 'unnerve', ownerId: getPlayerId(), duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'victory-star')) {
			res.push({ type: 'victory-star', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'victory-star')) {
			res.push({
				type: 'victory-star',
				ownerId: getPlayerId(),
				duration: 9000,
			});
		}
		if (onFieldOpponents.some((p) => p.ability === 'aroma-veil')) {
			res.push({ type: 'aroma-veil', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'aroma-veil')) {
			res.push({
				type: 'aroma-veil',
				ownerId: getPlayerId(),
				duration: 9000,
			});
		}
		if (onFieldOpponents.some((p) => p.ability === 'pastel-veil')) {
			res.push({ type: 'pastel-veil', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'pastel-veil')) {
			res.push({
				type: 'pastel-veil',
				ownerId: getPlayerId(),
				duration: 9000,
			});
		}
		if (onFieldOpponents.some((p) => p.ability === 'flower-veil')) {
			res.push({ type: 'flower-veil', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'flower-veil')) {
			res.push({
				type: 'flower-veil',
				ownerId: getPlayerId(),
				duration: 9000,
			});
		}
		if (onFieldOpponents.some((p) => p.ability === 'sweet-veil')) {
			res.push({ type: 'sweet-veil', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'sweet-veil')) {
			res.push({
				type: 'sweet-veil',
				ownerId: getPlayerId(),
				duration: 9000,
			});
		}
		if (onFieldOpponents.some((p) => p.ability === 'steely-spirit')) {
			res.push({ type: 'steely-spirit', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'steely-spirit')) {
			res.push({
				type: 'steely-spirit',
				ownerId: getPlayerId(),
				duration: 9000,
			});
		}
		if (
			[...onFieldTeam, ...onFieldOpponents].some(
				(p) => p.ability === 'dark-aura'
			)
		) {
			res.push({
				type: 'dark-aura',
				ownerId: getPlayerId(),
				duration: 9000,
			});
			res.push({ type: 'dark-aura', ownerId: OPPO_ID, duration: 9000 });
		}
		if (
			[...onFieldTeam, ...onFieldOpponents].some(
				(p) => p.ability === 'fairy-aura'
			)
		) {
			res.push({
				type: 'fairy-aura',
				ownerId: getPlayerId(),
				duration: 9000,
			});
			res.push({ type: 'fairy-aura', ownerId: OPPO_ID, duration: 9000 });
		}
		if (
			[...onFieldTeam, ...onFieldOpponents].some(
				(p) => p.ability === 'aura-break'
			)
		) {
			res.push({
				type: 'aura-break',
				ownerId: getPlayerId(),
				duration: 9000,
			});
			res.push({ type: 'aura-break', ownerId: OPPO_ID, duration: 9000 });
		}
		const friendGuardOppo = onFieldOpponents.find(
			(p) => p.ability === 'friend-guard'
		);
		if (friendGuardOppo) {
			res.push({
				type: 'friend-guard',
				ownerId: OPPO_ID,
				duration: 9000,
				applicatorId: friendGuardOppo.id,
			});
		}
		const friendGuardPlayer = onFieldTeam.find(
			(p) => p.ability === 'friend-guard'
		);
		if (friendGuardPlayer) {
			res.push({
				type: 'friend-guard',
				ownerId: getPlayerId(),
				duration: 9000,
				applicatorId: friendGuardPlayer.id,
			});
		}
		const powerSpotOppo = onFieldOpponents.find(
			(p) => p.ability === 'power-spot'
		);
		if (powerSpotOppo) {
			res.push({
				type: 'power-spot',
				ownerId: OPPO_ID,
				duration: 9000,
				applicatorId: powerSpotOppo.id,
			});
		}
		const powerSpotPlayer = onFieldTeam.find((p) => p.ability === 'power-spot');
		if (powerSpotPlayer) {
			res.push({
				type: 'power-spot',
				ownerId: getPlayerId(),
				duration: 9000,
				applicatorId: powerSpotPlayer.id,
			});
		}

		return res;
	}, [battleWeather, bf, onFieldOpponents, onFieldTeam]);

	return {
		battleFieldEffects,
		setBattleFieldEffects,
		addBattleFieldEffect,
		reduceBattleFieldEffectDurations,
		removeSpikes,
		removeScreens,
	};
};
