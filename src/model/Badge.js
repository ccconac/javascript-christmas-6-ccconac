import { BADGE } from '../constants/constants';

class Badge {
  eventBadge(benefit) {
    if (-benefit < BADGE.starBadgeAmount) return BADGE.noBadge;
    if (-benefit >= BADGE.santaBadgeAmount) return BADGE.santaBadge;
    if (-benefit >= BADGE.treeBadgeAmount) return BADGE.treeBadge;
    if (-benefit >= BADGE.starBadgeAmount) return BADGE.starBadge;
  }
}

export default Badge;
