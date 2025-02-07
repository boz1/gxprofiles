export const publicProfileViewTooltip = (claim): string | Boolean => {
  switch (claim.type) {
    case 'discord':
      return claim.draft.handle;
    case 'dns':
      return claim.draft.address;
    case 'email':
        return claim.draft.email;
    default:
      return false;
  }
};

export const selectIconCopyText = (claim): string => {
  switch (claim.type) {
    case 'discord':
      return claim.draft.handle;
    case 'dns':
      return claim.draft.address;
    case 'email':
        return claim.draft.email;
    default:
      return '';
  }
};
