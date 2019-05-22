export function pathBuilder(
  region: string,
  bucket: string,
  objectKey: string
): string {
  return `https://s3.${region}.amazonaws.com/${bucket}/${objectKey}`;
}
