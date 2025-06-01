export const badgeNames = ['Boulder_Badge', 'Cascade_Badge'] as const;
export type BadgeName = (typeof badgeNames)[number];
