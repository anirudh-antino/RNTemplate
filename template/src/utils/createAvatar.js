// ----------------------------------------------------------------------

const PRIMARY_NAME = ['A', 'N', 'H', 'L', 'Q', '9', '8'];
const INFO_NAME = ['F', 'G', 'T', 'I', 'J', '1', '2', '3'];
const SUCCESS_NAME = ['K', 'D', 'Y', 'B', 'O', '4', '5'];
const WARNING_NAME = ['P', 'E', 'R', 'S', 'C', 'U', '6', '7'];
const ERROR_NAME = ['V', 'W', 'X', 'M', 'Z'];

function getFirstCharacter(name) {
  return name && name.charAt(0).toUpperCase();
}

function getAvatarColor(name) {
  if (PRIMARY_NAME.includes(getFirstCharacter(name))) return 'pink.500';
  if (INFO_NAME.includes(getFirstCharacter(name))) return 'info.500';
  if (SUCCESS_NAME.includes(getFirstCharacter(name))) return 'success.500';
  if (WARNING_NAME.includes(getFirstCharacter(name))) return 'warning.500';
  if (ERROR_NAME.includes(getFirstCharacter(name))) return 'danger.500';
  return 'default';
}

export default function createAvatar(name) {
  return {
    name: name[0].toUpperCase(),
    color: getAvatarColor(name),
  };
}
