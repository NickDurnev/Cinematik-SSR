export default function stringAvatar(name: string): { children: string } {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
