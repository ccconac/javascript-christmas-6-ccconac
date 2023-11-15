class Badge {
  eventBadge(benefit) {
    if (-benefit < 5000) return '없음';
    if (-benefit >= 20000) return '산타';
    if (-benefit >= 10000) return '트리';
    if (-benefit >= 5000) return '별';
  }
}

export default Badge;
