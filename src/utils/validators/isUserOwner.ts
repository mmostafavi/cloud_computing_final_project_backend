export default function (collectionName: string, userData: any) {
  return userData.dbs.includes(collectionName);
}
