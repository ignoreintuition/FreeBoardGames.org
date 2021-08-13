import { IG, IPlayer, ICard, CardColor } from './types';

export function kittySize(numPlayers: number): number {
  return [6, 6, 3][Math.max(0, numPlayers - 3)];
}

export function handSize(numPlayers: number): number {
  return [24, 18, 15][Math.max(0, numPlayers - 3)];
}

export function pointsRequiredToWin(numBouts: number): number {
  return [56, 51, 41, 36][numBouts];
}

export function isCalledTaker(player: IPlayer, G: IG): boolean {
  if (!G.calledCard) return false;
  if (G.calledTakerId) return player.id == G.calledTakerId;
  return player.hand.some((C) => C.color == G.calledCard.color && C.value == G.calledCard.value);
}

export function isColorCard(card: ICard): boolean {
  return card.color != CardColor.Excuse && card.color != CardColor.Trumps;
}

export function getPlayerById(G: IG, playerId: string): IPlayer {
  return G.players.find((p) => p.id === playerId);
}

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
